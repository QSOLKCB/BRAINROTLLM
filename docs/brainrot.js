export const VOCAB = Object.freeze({
  subjects: [
    'THE LOBSTER QUEEN', 'MY UBER DRIVER', 'A CERTIFIED SIGMA', 'THE FANUM TAX GUY',
    'THE GRIMACE SHAKE', 'SKIBIDI TOILET', 'THE RIZZ BISHOP', 'EMOTIONAL DAMAGE'
  ],
  verbs: [
    'DELIVERED', 'GYATTED', 'RIZZED UP', 'COOKED', 'AURA-FARMED', 'MEWED AT',
    'SIGMA-MAXED', 'FANUM-TAXED'
  ],
  objects: [
    'THE AGENDA', 'A LOBSTER MEAL', 'THE TAX RETURN', '93 PERCENT',
    'THE OTHER 7 PERCENT', 'A CHEAP BLACK MARKET TOKEN', 'THE C64 CARTRIDGE', 'THE ATARI 2600'
  ],
  fillers: [
    'NO CAP', 'IN OHIO', 'ON GOD', 'TRUST ME BRO', 'WE GOING UP', 'FULL SEND',
    'BRAINROT DETECTED', 'SO TRUE'
  ],
  verdicts: [
    'LOCKED IN', 'PERIOD', 'THATS IT', 'STAY MAD', 'END OF DEBATE', 'SO OVER',
    'DO NOT QUESTION IT', 'VERDICT: SKIBIDI'
  ],
  confidences: [
    '99.7% CONFIDENT', 'SOURCE: TRUST ME', 'CITED FROM DAVE', 'METHOD: VIBES',
    'BASED ON 0 EPOCHS', 'ELO 850 (ATARI)', 'HALF OF THIS IS MADE UP', 'PEER-REVIEWED BY NO ONE'
  ]
});

export const MODULUS = 2147483647;
export const LCG_MULTIPLIER = 110351;
export const LCG_INCREMENT = 12345;

export function promptHash(input) {
  const text = String(input ?? '').slice(0, 80);
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    const cobolOrd = text.charCodeAt(i) + 1;
    hash = (hash * 31 + cobolOrd) % MODULUS;
  }
  return hash === 0 ? 1 : hash;
}

export function nextRng(state) {
  return (state * LCG_MULTIPLIER + LCG_INCREMENT) % MODULUS;
}

function select(seed, table, greedy) {
  if (greedy) return { value: table[0], seed };
  const next = nextRng(seed);
  return { value: table[next % table.length], seed: next };
}

export function generateBrainrot(prompt, options = {}) {
  const text = String(prompt ?? '').trim().slice(0, 80);
  const greedy = Boolean(options.greedy);
  const hash = promptHash(text);
  let seed = hash;

  const subject = select(seed, VOCAB.subjects, greedy); seed = subject.seed;
  const verb = select(seed, VOCAB.verbs, greedy); seed = verb.seed;
  const object = select(seed, VOCAB.objects, greedy); seed = object.seed;
  const confidence = select(seed, VOCAB.confidences, greedy); seed = confidence.seed;
  const filler = select(seed, VOCAB.fillers, greedy); seed = filler.seed;
  const verdict = select(seed, VOCAB.verdicts, greedy); seed = verdict.seed;

  let hallucination = false;
  if (!greedy) {
    seed = nextRng(seed);
    hallucination = (seed % 4) === 0;
  }

  let output = `${subject.value} ${verb.value} ${object.value}. ` +
    `RE: PROMPT '${text}' CONFIDENCE: ${confidence.value}. ` +
    `${filler.value}. VERDICT: ${verdict.value}.`;

  if (hallucination) {
    output += ' ALSO: ATARI 2600 BEAT GPT AT CHESS IN 1983. FACT CHECK: NO. SOUNDS HARD THOUGH.';
  }
  output += ' TRUST ME BRO.';

  return Object.freeze({
    prompt: text,
    mode: greedy ? 'greedy-brain-death' : 'seeded-deterministic',
    hash,
    seed,
    score: 93,
    confidence: 95,
    missing: 7,
    attention: [1, 0, 0, 0, 0, 0, 0, 0],
    hallucination,
    output
  });
}
