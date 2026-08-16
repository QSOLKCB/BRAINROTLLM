import test from 'node:test';
import assert from 'node:assert/strict';
import {
  VOCAB,
  generateBrainrot,
  normalizePrompt,
  promptHash
} from '../docs/brainrot.js';
import {
  decodePromptFragment,
  encodePromptFragment
} from '../docs/url.js';

test('same prompt produces byte-identical result', () => {
  const a = generateBrainrot('why you no study?');
  const b = generateBrainrot('why you no study?');
  assert.deepEqual(a, b);
});

test('seeded mode is prompt-sensitive', () => {
  const a = generateBrainrot('why you no study?');
  const b = generateBrainrot('where did other 7% go?');
  assert.notEqual(a.hash, b.hash);
  assert.notEqual(a.output, b.output);
});

test('greedy mode always selects slot zero vocabulary', () => {
  const a = generateBrainrot('anything', { greedy: true });
  assert.match(a.output, /^THE LOBSTER QUEEN DELIVERED THE AGENDA\./);
  assert.equal(a.hallucination, false);
});

test('hash is stable and non-zero', () => {
  assert.equal(promptHash(''), 1);
  assert.equal(promptHash('abc'), promptHash('abc'));
  assert.notEqual(promptHash('abc'), promptHash('abd'));
});

test('prompt normalization trims before hashing and echoing', () => {
  assert.equal(normalizePrompt('  hello  '), 'hello');
  assert.equal(generateBrainrot('  hello  ').hash, generateBrainrot('hello').hash);
  assert.equal(generateBrainrot('  hello  ').prompt, 'hello');
});

test('80-character limit counts Unicode code points without splitting emoji', () => {
  const eightyEmoji = '😀'.repeat(80);
  const result = generateBrainrot(eightyEmoji);
  assert.equal(Array.from(result.prompt).length, 80);
  assert.equal(result.prompt, eightyEmoji);
  assert.doesNotThrow(() => encodePromptFragment(result.prompt));

  const boundary = `${'a'.repeat(79)}😀tail`;
  const normalized = normalizePrompt(boundary);
  assert.equal(Array.from(normalized).length, 80);
  assert.equal(normalized, `${'a'.repeat(79)}😀`);
  assert.doesNotThrow(() => encodePromptFragment(normalized));
});

test('malformed URL fragments do not crash decoding', () => {
  assert.equal(decodePromptFragment('#score=93%'), 'score=93%');
  assert.equal(decodePromptFragment('#hello%20world'), 'hello world');
});

test('nested vocabulary tables are immutable', () => {
  assert.equal(Object.isFrozen(VOCAB), true);
  assert.equal(Object.isFrozen(VOCAB.subjects), true);
  assert.throws(() => VOCAB.subjects.push('BLACK MARKET TOKEN DEALER'), TypeError);
  assert.throws(() => { VOCAB.subjects[0] = 'MUTATED'; }, TypeError);
  assert.equal(VOCAB.subjects[0], 'THE LOBSTER QUEEN');
});
