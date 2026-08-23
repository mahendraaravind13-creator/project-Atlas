from functools import lru_cache
from typing import Literal

from pydantic import AliasChoices, Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="ATLAS_",
        extra="ignore",
        populate_by_name=True,
    )

    environment: str = "local"
    log_level: str = "INFO"

    cors_origins: str = Field(
        default="http://localhost:3000",
        validation_alias=AliasChoices(
            "FRONTEND_URL",
            "ATLAS_CORS_ORIGINS",
        ),
    )

    database_url: str = Field(
        default="postgresql+asyncpg://atlas:atlas@localhost:5433/atlas",
        validation_alias=AliasChoices(
            "DATABASE_URL",
            "ATLAS_DATABASE_URL",
        ),
    )

    supabase_url: str | None = Field(
        default=None,
        validation_alias=AliasChoices(
            "SUPABASE_URL",
            "ATLAS_SUPABASE_URL",
        ),
    )

    supabase_service_role_key: str | None = Field(
        default=None,
        repr=False,
        validation_alias=AliasChoices(
            "SUPABASE_SERVICE_ROLE_KEY",
            "ATLAS_SUPABASE_SERVICE_ROLE_KEY",
        ),
    )

    qdrant_url: str = Field(
        default="http://localhost:6333",
        validation_alias=AliasChoices(
            "QDRANT_URL",
            "ATLAS_QDRANT_URL",
        ),
    )

    qdrant_api_key: str | None = Field(
        default=None,
        repr=False,
        validation_alias=AliasChoices(
            "QDRANT_API_KEY",
            "ATLAS_QDRANT_API_KEY",
        ),
    )

    groq_api_key: str | None = Field(
        default=None,
        repr=False,
        validation_alias=AliasChoices(
            "GROQ_API_KEY",
            "ATLAS_GROQ_API_KEY",
        ),
    )

    jwt_secret_key: str | None = Field(
        default=None,
        repr=False,
        validation_alias=AliasChoices(
            "JWT_SECRET_KEY",
            "ATLAS_JWT_SECRET_KEY",
        ),
    )

    # "sentence_transformer" gives semantic retrieval. "local_hash" is a
    # deterministic, offline, non-semantic fallback used by the evaluation
    # harness and tests; it will not match paraphrases.
    embedding_backend: Literal["sentence_transformer", "local_hash"] = "sentence_transformer"
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"

    # Must equal the chosen model's output width (all-MiniLM-L6-v2 -> 384).
    # A mismatch is rejected at index time rather than silently stored.
    embedding_dimensions: int = 384

    qdrant_collection: str = "atlas_chunks"

    # Bumped to 3 when embeddings moved from hashed bag-of-words to a real
    # sentence-transformer model; vectors from index_version <= 2 are not
    # comparable and must be rebuilt with `python -m scripts.reindex --force`.
    index_version: str = "3"

    dense_retrieval_limit: int = 20
    bm25_retrieval_limit: int = 20
    hybrid_retrieval_limit: int = 12

    rrf_dense_weight: float = Field(default=1.0, gt=0)
    rrf_bm25_weight: float = Field(default=1.0, gt=0)

    rerank_candidate_limit: int = Field(default=12, ge=1, le=50)

    reranker_model: str = "cross-encoder/ms-marco-MiniLM-L-6-v2"

    reranker_score_threshold: float = 0.001

    context_min_chunks: int = 5
    context_max_chunks: int = 8

    context_diversity_threshold: float = 0.82

    max_context_tokens: int = 4000

    upload_dir: str = "./uploads"

    max_upload_bytes: int = 50 * 1024 * 1024

    min_pdf_text_chars: int = 80

    # Ingestion runs synchronously inside the upload request (there is no
    # worker). This bounds how long parsing/OCR may hold the connection
    # before the request fails with 504 instead of hanging.
    ingestion_timeout_seconds: float = Field(default=300.0, gt=0)

    auto_create_schema: bool = False

    groq_model: str = Field(
        default="openai/gpt-oss-120b",
        validation_alias=AliasChoices(
            "GROQ_MODEL",
            "ATLAS_GROQ_MODEL",
        ),
    )

    # Ordered provider preference. Every entry must name a key in
    # app.llm.PROVIDERS; one without an API key present is skipped, so a shared
    # list works across machines holding different keys. Listing more than one
    # is what stops a single provider's daily cap from taking generation down.
    llm_providers: str = "groq,llm7"

    # Optional single override applied to whichever provider serves a request,
    # for pinning one model across providers. Per-provider *_MODEL wins over it.
    llm_model: str | None = None

    llm_timeout_seconds: float = Field(default=30.0, gt=0)

    @property
    def llm_provider_order(self) -> list[str]:
        return [name.strip().lower() for name in self.llm_providers.split(",") if name.strip()]

    def provider_api_key(self, provider) -> str | None:
        """
        Key for one provider, from its documented variable name.

        Reads os.environ directly rather than declaring a field per provider:
        the registry is data, and a new provider should not require a schema
        change. Groq keeps its typed field so existing setups keep working.
        """
        import os

        if provider.name == "groq" and self.groq_api_key:
            return self.groq_api_key
        return os.environ.get(provider.key_env) or os.environ.get(f"ATLAS_{provider.key_env}") or None

    def provider_model(self, provider) -> str:
        """Per-provider override, then the global override, then the registry default."""
        import os

        if provider.name == "groq":
            return self.groq_model
        specific = os.environ.get(f"{provider.name.upper()}_MODEL") or os.environ.get(
            f"ATLAS_{provider.name.upper()}_MODEL"
        )
        return specific or self.llm_model or provider.default_model

    rfi_similarity_threshold: float = 0.75

    graph_dir: str = "./graphs"

    @property
    def allowed_cors_origins(self) -> list[str]:
        return [
            origin.strip().rstrip("/")
            for origin in self.cors_origins.split(",")
            if origin.strip()
        ]

    @field_validator("qdrant_api_key", "groq_api_key", mode="before")
    @classmethod
    def blank_secret_is_unset(cls, value):
        return value or None


@lru_cache
def get_settings() -> Settings:
    return Settings()