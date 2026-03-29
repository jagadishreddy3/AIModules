// Groq provider — uses Groq Chat Completions REST API
export interface GroqOptions {
  apiKey: string;
  model: string;
  prompt: string;
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function generateWithGroq({ apiKey, model, prompt }: GroqOptions): Promise<string> {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'You are a QA engineer that generates structured Jira test cases.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Groq error (${response.status}): ${text}`);
  }

  const data = await response.json() as { choices: Array<{ message: { content: string } }> };
  return data.choices[0]?.message?.content ?? '';
}

export async function testGroqConnection(apiKey: string, model: string): Promise<void> {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: 'ping' }],
      max_tokens: 5,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Groq connection failed (${response.status}): ${text}`);
  }
}
