const STORAGE_KEY = 'jobflow_llm_config';

export const LLM_ENGINES = [
  { id: 'openai', label: 'OpenAI' },
  { id: 'groq', label: 'Groq' },
  { id: 'ollama', label: 'Ollama' },
];

const DEFAULTS = {
  openai: { model: 'gpt-4o-mini', apiUrl: 'https://api.openai.com/v1/chat/completions', apiKey: '' },
  groq: { model: 'llama-3.3-70b-versatile', apiUrl: 'https://api.groq.com/openai/v1/chat/completions', apiKey: '' },
  ollama: { model: 'llama3.2', apiUrl: 'http://localhost:11434/api/chat', apiKey: '' },
};

export function getConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { engine: 'openai', ...DEFAULTS.openai, ...DEFAULTS };
}

export function saveConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function getDefaults(engine) {
  return DEFAULTS[engine] || DEFAULTS.openai;
}

export async function testConnection(config) {
  const { engine, model, apiUrl, apiKey } = config;
  const headers = { 'Content-Type': 'application/json' };
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

  const body = {
    model,
    messages: [{ role: 'user', content: 'Hi' }],
    max_tokens: 5,
  };

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`HTTP ${res.status}: ${err.slice(0, 200)}`);
    }
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || data.message?.content || '';
    if (content) return { success: true, message: `Connected! Response: "${content.trim()}"` };
    return { success: true, message: 'Connected successfully!' };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function sendChatMessage(config, messages) {
  const { engine, model, apiUrl, apiKey } = config;
  const headers = { 'Content-Type': 'application/json' };
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

  const body = { model, messages };

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HTTP ${res.status}: ${err.slice(0, 300)}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || data.message?.content || 'No response';
}
