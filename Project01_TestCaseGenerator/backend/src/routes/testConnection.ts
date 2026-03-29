import { Router, type Request, type Response } from 'express';
import { testOllamaConnection } from '../providers/ollama.js';
import { testGroqConnection } from '../providers/groq.js';
import { testOpenAIConnection } from '../providers/openai.js';

export const testConnectionRouter = Router();

interface TestBody {
  provider: 'ollama' | 'groq' | 'openai';
  model: string;
  apiKey?: string;
  ollamaUrl?: string;
}

testConnectionRouter.post('/', async (req: Request, res: Response): Promise<void> => {
  const { provider, model, apiKey, ollamaUrl }: TestBody = req.body;

  if (!provider || !model) {
    res.status(400).json({ ok: false, message: 'provider and model are required' });
    return;
  }

  try {
    switch (provider) {
      case 'ollama':
        await testOllamaConnection(ollamaUrl ?? 'http://localhost:11434', model);
        break;
      case 'groq':
        if (!apiKey) { res.status(400).json({ ok: false, message: 'apiKey required for Groq' }); return; }
        await testGroqConnection(apiKey, model);
        break;
      case 'openai':
        if (!apiKey) { res.status(400).json({ ok: false, message: 'apiKey required for OpenAI' }); return; }
        await testOpenAIConnection(apiKey, model);
        break;
      default:
        res.status(400).json({ ok: false, message: `Unknown provider: ${provider}` });
        return;
    }

    res.json({ ok: true, message: `Connected to ${provider} (${model}) successfully` });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[test-connection] Error:', message);
    res.status(500).json({ ok: false, message });
  }
});
