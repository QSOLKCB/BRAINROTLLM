# BRAINROTLLM

> **You only get 93% on performance test. Where did other 7% go? Can't you count?**

BRAINROTLLM is a deterministic parody “LLM” implemented as an inspectable prompt hash + integer PRNG + fixed vocabulary. It has **0 learned parameters**, **0 training epochs**, and an inexplicably stable **95% confidence** in its **93% performance score**.

The joke is the architecture. The useful bit is reproducibility.

## Live demo

### 👉 [OPEN BRAINROTLLM ON GITHUB PAGES](https://qsolkcb.github.io/BRAINROTLLM/)

The `docs/` directory contains the zero-backend browser version. It runs locally in the page: no inference API, no server, no tokens, no account required.

## Quick start

### Browser/Node runtime

```bash
npm test
node cli.mjs "why you no study?"
node cli.mjs --greedy "where did other 7% go?"
```

### COBOL

With GnuCOBOL installed:

```bash
make cobol
./bin/brainrot-llm
```

The CI workflow installs GnuCOBOL and compiles `src/brainrot_llm.cob` on every push and pull request.

## Architecture

```text
prompt (max 80 chars)
        |
        v
 deterministic hash
        |
        v
 fixed integer PRNG
        |
        v
 vocabulary index selection
        |
        v
 reproducible brainrot
```

The canonical algorithm is documented in [DETERMINISM.md](DETERMINISM.md). `README4AI.md` provides machine-facing interpretation rules.

## Two modes

**Seeded deterministic** is the default. The prompt hash seeds the PRNG, so the same prompt produces the same output while different prompts generally take different vocabulary paths.

**Greedy brain death** always takes vocabulary slot zero and suppresses the deliberately labeled hallucination gag. It is what happens when temperature reaches absolute corporate zero.

## v0.2 response expansion

The vocabulary now has **16 choices in each of six response categories**, giving **16,777,216 base combinations** before the prompt echo and optional hallucination gag are counted. Same prompt + same version still gives the same nonsense.

New material includes the Token Accountant, C64 Headmaster, Math Book Open, black-market token audits, Atari rematches, confidence-score disciplinary hearings, and the 7% Recovery Team.

## Example

```text
BRAINROTLLM V0.2.0
PROMPT > why you no study? you only get 93%

HASH        = deterministic
SCORE       = 93%
CONFIDENCE  = 95%
MISSING     = 7% (INVOICE ATTACHED)
SOURCES     = DAVE (BLACK MARKET, CASH ONLY)
```

## What this is not

This is not a trained language model, benchmark result, factual QA engine, or evidence source. The numeric confidence/performance values and “sources” are part of the satire.

## License

Apache-2.0.
