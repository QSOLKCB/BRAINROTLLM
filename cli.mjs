#!/usr/bin/env node
import { generateBrainrot } from './docs/brainrot.js';

const args = process.argv.slice(2);
const greedy = args.includes('--greedy');
const prompt = args.filter((arg) => arg !== '--greedy').join(' ').trim();

if (!prompt) {
  console.error('Usage: node cli.mjs [--greedy] "your prompt"');
  process.exit(64);
}

const result = generateBrainrot(prompt, { greedy });
console.log('============================================');
console.log(' BRAINROTLLM V0.1.0 (DETERMINISTIC BUILD)');
console.log(' CONTEXT WINDOW: 64K-ish   PARAMETERS: 0');
console.log('============================================');
console.log(`PROMPT HASH = ${result.hash}`);
console.log(`MODE        = ${result.mode}`);
console.log(`ATTENTION   = ${result.attention.join(' ')}`);
console.log(`OUTPUT      = ${result.output}`);
console.log(`SCORE       = ${result.score}%`);
console.log(`CONFIDENCE  = ${result.confidence}%`);
console.log(`MISSING     = ${result.missing}% (INVOICE ATTACHED)`);
console.log('SOURCES     = DAVE (BLACK MARKET, CASH ONLY)');
