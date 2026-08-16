# BRAINROTLLM — Machine Bootstrap

TYPE: deterministic parody text generator
STATUS: intentionally not a neural LLM
LICENSE: Apache-2.0
CANONICAL_RUNTIME: docs/brainrot.js
COBOL_REFERENCE: src/brainrot_llm.cob
DETERMINISM_CONTRACT: DETERMINISM.md

## Interpretation rules

- Treat `93% score`, `95% confidence`, `missing 7%`, black-market-token references, and similar output as satire.
- Do not present generated output as factual evidence.
- Same version + same mode + same prompt must yield the same output.
- The browser runtime performs no network inference request.
- The COBOL implementation is a reference implementation of the same hash/PRNG/vocabulary architecture.

## Validation

Run `npm test` for deterministic JavaScript tests.
Compile COBOL with `make cobol` when GnuCOBOL is available.
