# Project Atlas Evaluation

All metrics are deterministic or directly measured by this command. Synthetic scenarios are not historical predictions.

## Rag

| Metric | Baseline | Advanced |
| --- | ---: | ---: |
| recall at 5 | 1.0 | 1.0 |
| recall at 12 | 1.0 | 1.0 |
| mrr | 1.0 | 1.0 |
| correct document rate | 1.0 | 1.0 |
| correct page rate | 1.0 | 1.0 |
| citation precision | 1.0 | 0.6667 |
| unsupported claim rate | 0.0 | 0.0 |
| average input tokens | 439.0 | 130.67 |
| average output tokens | 250.0 | 96.0 |
| average latency ms | 30.68 | 177.92 |

## Compliance

| Metric | Value |
| --- | ---: |
| true positive | 6 |
| false positive | 0 |
| false negative | 0 |
| true negative | 6 |
| precision | 1.0 |
| recall | 1.0 |
| f1 | 1.0 |

## Schedule

| Metric | Value |
| --- | ---: |
| mean lead time days | 35.0 |
| mean predicted delay days | 35.0 |
| mean actual or simulated delay days | 35.0 |
| mean prediction error days | 0.0 |
| mean absolute prediction error days | 0.0 |

## Supply Chain

| Metric | Value |
| --- | ---: |
| shipments represented | 5 |
| expected shipments | 5 |
| representation rate | 1.0 |
| supplier tiers total | 15 |
| mean supplier tiers per shipment | 3.0 |
| risk events with alert latency | 2 |
| mean alert latency minutes | 55.0 |
| risky shipments | 3 |
| alternatives generated | 3 |
| alternative generation success | 1.0 |

## Commissioning

| Metric | Value |
| --- | ---: |
| total steps | 21 |
| automatically evaluated steps | 21 |
| automation coverage | 1.0 |
| completion coverage | 1.0 |
| expected ncrs | 1 |
| actual ncrs | 1 |
| ncr correctness | True |

## Manual Effort

| Metric | Value |
| --- | ---: |
| status | NOT_MEASURED |
| measurement count | 0 |
| manual hours | NOT MEASURED |
| atlas hours | NOT MEASURED |
| hours saved | NOT MEASURED |
| note | Add measured manual_hours, atlas_hours, and sample_count values before claiming hours saved. |

## Provenance

| Metric | Value |
| --- | ---: |
| llm calls | none |
| generation | deterministic extractive responder |
| embedding backend | sentence_transformer |
| embedding model | sentence-transformers/all-MiniLM-L6-v2 |
