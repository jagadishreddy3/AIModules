import fetch from 'node-fetch';

// Ollama provider — calls local Ollama API
export interface OllamaOptions {
  url: string;
  model: string;
  prompt: string;
}

export async function generateWithOllama({ url, model, prompt }: OllamaOptions): Promise<string> {
  try {
    const response = await fetch(`${url}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, prompt, stream: false }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Ollama error (${response.status}): ${text}`);
    }

    const data = await response.json() as { response: string };
    return data.response;
  } catch (err: any) {
    if (err.name === 'FetchError' || err.code === 'ECONNREFUSED') {
      throw new Error(`Cannot reach Ollama at ${url}. Make sure it is running.`);
    }
    throw err;
  }
}

export async function testOllamaConnection(url: string, model: string): Promise<void> {
  try {
    const response = await fetch(`${url}/api/tags`);
    if (!response.ok) {
      throw new Error(`Cannot reach Ollama at ${url} (${response.status})`);
    }
  } catch (err: any) {
    if (err.name === 'FetchError' || err.code === 'ECONNREFUSED') {
      throw new Error(`Cannot reach Ollama at ${url}. Make sure it is running.`);
    }
    throw err;
  }
}
