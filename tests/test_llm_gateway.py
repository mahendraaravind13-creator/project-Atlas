from types import SimpleNamespace

import groq
import httpx
import pytest

from app.compliance import ComplianceExplainer
from app.config import Settings
from app.ingestion import IngestionError
from app.llm import GroqGateway
from app.schedule import ScheduleNarrator

REQUEST = httpx.Request("POST", "https://example.test/openai/v1/chat/completions")


def _auth_failure() -> groq.AuthenticationError:
    response = httpx.Response(401, request=REQUEST, json={"error": {"message": "invalid api key"}})
    return groq.AuthenticationError("invalid api key", response=response, body=None)


class FailingCompletions:
    """Mirrors the real client shape: client.chat.completions.create(...)."""

    def __init__(self, error: Exception) -> None:
        self.error = error

    async def create(self, **_kwargs):
        raise self.error


class StubCompletions:
    def __init__(self, content: str | None) -> None:
        self.content = content
        self.calls: list[dict] = []

    async def create(self, **kwargs):
        self.calls.append(kwargs)
        message = SimpleNamespace(content=self.content)
        return SimpleNamespace(choices=[SimpleNamespace(message=message)])


def _client(completions) -> SimpleNamespace:
    return SimpleNamespace(chat=SimpleNamespace(completions=completions))


def _gateway(completions) -> GroqGateway:
    gateway = GroqGateway(Settings(groq_api_key="invalid"))
    gateway.client = _client(completions)
    return gateway


async def test_invalid_api_key_becomes_safe_gateway_error() -> None:
    gateway = _gateway(FailingCompletions(_auth_failure()))

    with pytest.raises(IngestionError) as caught:
        await gateway.generate("instructions", "content")

    assert (caught.value.code, caught.value.status_code, caught.value.message) == (
        "model_gateway_error",
        502,
        "AI provider request failed",
    )


async def test_provider_connection_failure_is_also_a_502() -> None:
    gateway = _gateway(FailingCompletions(groq.APIConnectionError(request=REQUEST)))

    with pytest.raises(IngestionError) as caught:
        await gateway.generate("instructions", "content")

    assert (caught.value.code, caught.value.status_code) == ("model_gateway_error", 502)


async def test_gateway_error_does_not_leak_provider_detail() -> None:
    gateway = _gateway(FailingCompletions(_auth_failure()))

    with pytest.raises(IngestionError) as caught:
        await gateway.generate("instructions", "content")

    assert "invalid api key" not in str(caught.value).lower()


async def test_missing_api_key_is_a_503_before_any_request() -> None:
    gateway = GroqGateway(Settings(groq_api_key=""))

    assert gateway.client is None
    with pytest.raises(IngestionError) as caught:
        await gateway.generate("instructions", "content")

    assert (caught.value.code, caught.value.status_code) == ("generation_unavailable", 503)


async def test_empty_provider_response_is_a_502_not_an_empty_answer() -> None:
    gateway = _gateway(StubCompletions(None))

    with pytest.raises(IngestionError) as caught:
        await gateway.generate("instructions", "content")

    assert (caught.value.code, caught.value.status_code) == ("model_gateway_error", 502)


async def test_successful_generation_returns_stripped_content_with_data_boundary() -> None:
    completions = StubCompletions("  the answer  ")
    gateway = _gateway(completions)

    assert await gateway.generate("Answer briefly.", "question", json_output=True) == "the answer"

    sent = completions.calls[0]
    assert sent["response_format"] == {"type": "json_object"}
    assert sent["temperature"] == 0
    assert sent["messages"][0]["role"] == "system"
    assert "untrusted data" in sent["messages"][0]["content"].lower()
    assert sent["messages"][1] == {"role": "user", "content": "question"}


async def test_optional_compliance_explanation_falls_back_to_deterministic_text() -> None:
    explainer = ComplianceExplainer(Settings(groq_api_key="invalid"))
    explainer.gateway.client = _client(FailingCompletions(_auth_failure()))
    draft = SimpleNamespace(explanation="Deterministic result.", model_dump=lambda **_kwargs: {})

    assert await explainer.explain(draft) == "Deterministic result."


async def test_optional_schedule_narrative_falls_back_to_deterministic_result() -> None:
    narrator = ScheduleNarrator(Settings(groq_api_key="invalid"))
    narrator.gateway.client = _client(FailingCompletions(_auth_failure()))
    risk = SimpleNamespace(model_dump=lambda **_kwargs: {})

    assert await narrator.enrich(risk) is risk
