// OpenAI provider — uses the official openai SDK
import OpenAI from 'openai';

export interface OpenAIOptions {
  apiKey: string;
  model: string;
  prompt: string;
}

export async function generateWithOpenAI({ apiKey, model, prompt }: OpenAIOptions): Promise<string> {
  const client = new OpenAI({ apiKey });

  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: 'You are a QA engineer that generates structured Jira test cases.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.3,
  });

  return completion.choices[0]?.message?.content ?? '';
}

export async function testOpenAIConnection(apiKey: string, model: string): Promise<void> {
  const client = new OpenAI({ apiKey });
  await client.chat.completions.create({
    model,
    messages: [{ role: 'user', content: 'ping' }],
    max_tokens: 5,
  });
}
