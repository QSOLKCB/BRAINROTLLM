export const DEFAULT_PROMPT = 'why you no study? you only get 93%';

export function decodePromptFragment(hash) {
  const raw = String(hash ?? '').replace(/^#/, '');
  if (!raw) return DEFAULT_PROMPT;

  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export function encodePromptFragment(value) {
  const text = String(value ?? '');

  try {
    return encodeURIComponent(text);
  } catch {
    const wellFormedFallback = text.replace(/[\uD800-\uDFFF]/g, '\uFFFD');
    return encodeURIComponent(wellFormedFallback);
  }
}
