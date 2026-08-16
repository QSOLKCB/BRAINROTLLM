import test from 'node:test';
import assert from 'node:assert/strict';
import { generateBrainrot, promptHash } from '../docs/brainrot.js';

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
