# Determinism Contract

BRAINROTLLM is a deterministic text generator, not a trained neural language model.

For a given implementation version, mode, and prompt (UTF-8 text truncated to 80 characters), the output MUST be byte-stable.

## Seed derivation

1. Start with `hash = 0`.
2. For each input character, use its 1-based collating-sequence ordinal (`ASCII code + 1` for the supported browser/CLI profile).
3. Update `hash = (hash * 31 + ordinal) mod 2147483647`.
4. Replace zero with one.

## PRNG

`next = (state * 110351 + 12345) mod 2147483647`

Each vocabulary choice consumes exactly one PRNG step. A final step determines whether the deliberately labeled hallucination gag is emitted.

## Modes

- `seeded-deterministic`: prompt hash seeds the PRNG; different prompts generally choose different vocabulary.
- `greedy-brain-death`: always selects vocabulary index zero and suppresses the hallucination gag. The prompt echo still differs because the prompt is shown verbatim.

## Non-goals

There is no training, stochastic sampling, remote inference, embeddings, hidden state, semantic understanding, or claim that confidence values measure truth.
