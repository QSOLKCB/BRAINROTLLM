import { generateBrainrot } from './brainrot.js';

const form = document.querySelector('#prompt-form');
const prompt = document.querySelector('#prompt');
const output = document.querySelector('#output');
const metadata = document.querySelector('#metadata');
const greedy = document.querySelector('#greedy');
const examples = document.querySelectorAll('[data-prompt]');

function run() {
  const result = generateBrainrot(prompt.value, { greedy: greedy.checked });
  output.textContent = result.output;
  metadata.textContent = [
    `HASH ${result.hash}`,
    `MODE ${result.mode}`,
    `SCORE ${result.score}%`,
    `CONFIDENCE ${result.confidence}%`,
    `MISSING ${result.missing}%`,
    `ATTENTION ${result.attention.join('')}`
  ].join('  |  ');
  history.replaceState(null, '', `#${encodeURIComponent(result.prompt)}`);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  run();
});

greedy.addEventListener('change', run);

for (const button of examples) {
  button.addEventListener('click', () => {
    prompt.value = button.dataset.prompt;
    run();
  });
}

const initial = decodeURIComponent(location.hash.slice(1) || 'why you no study? you only get 93%');
prompt.value = initial;
run();
