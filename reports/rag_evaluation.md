# Atlas RAG Evaluation

Synthetic test split; tuning used the development split only. Generation and scoring are deterministic/extractive, not LLM-judged.

| Metric | Baseline | Advanced |
| --- | ---: | ---: |
| recall at 5 | 1.0 | 1.0 |
| recall at 12 | 1.0 | 1.0 |
| mrr | 1.0 | 1.0 |
| correct document rate | 1.0 | 0.0 |
| correct page rate | 1.0 | 0.0 |
| citation precision | 1.0 | 0.0 |
| citation completeness | 1.0 | 0.0 |
| unsupported claim rate | 0.0 | 0.0 |
| insufficient evidence accuracy | 0.6667 | 0.3333 |
| average latency ms | 23.91 | 138.15 |
| average input tokens | 439.0 | 122.0 |
| average output tokens | 250.0 | 10.0 |
| corrective retry rate | 0.0 | 1.0 |

## Contextual retrieval ablation

Dense retrieval over the held-out test split; the only changed input is original versus contextual chunk text.

| Retrieval metric | Original text | Contextual text |
| --- | ---: | ---: |
| recall at 5 | 1.0 | 1.0 |
| recall at 12 | 1.0 | 1.0 |
| mrr | 1.0 | 1.0 |

Result: No improvement claim: advanced RAG did not beat the baseline on the guarded primary metrics.

Selected parameters: `{"bm25_retrieval_limit": 10, "context_max_chunks": 5, "dense_retrieval_limit": 10, "rerank_candidate_limit": 8, "reranker_score_threshold": 0.3, "rrf_bm25_weight": 1.0, "rrf_dense_weight": 1.5}`

Fusion: local_weighted_rrf — BM25 is a local lexical ranking and the collection has no sparse-vector index.
