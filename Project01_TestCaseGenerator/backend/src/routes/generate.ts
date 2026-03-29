import { Router, type Request, type Response } from 'express';
import { buildTestCasePrompt } from '../prompts/testcase.js';
import { generateWithOllama } from '../providers/ollama.js';
import { generateWithGroq } from '../providers/groq.js';
import { generateWithOpenAI } from '../providers/openai.js';

export const generateRouter = Router();

interface GenerateBody {
  provider: 'ollama' | 'groq' | 'openai';
  model: string;
  requirement: string;
  apiKey?: string;
  ollamaUrl?: string;
}

generateRouter.post('/', async (req: Request, res: Response): Promise<void> => {
  const { provider, model, requirement, apiKey, ollamaUrl }: GenerateBody = req.body;

  if (!provider || !model || !requirement) {
    res.status(400).json({ error: 'provider, model, and requirement are required' });
    return;
  }

  const prompt = buildTestCasePrompt(requirement);

  try {
    let result: string;

    switch (provider) {
      case 'ollama':
        result = await generateWithOllama({
          url: ollamaUrl ?? 'http://localhost:11434',
          model,
          prompt,
        });
        break;
      case 'groq':
        if (!apiKey) { res.status(400).json({ error: 'apiKey is required for Groq' }); return; }
        result = await generateWithGroq({ apiKey, model, prompt });
        break;
      case 'openai':
        if (!apiKey) { res.status(400).json({ error: 'apiKey is required for OpenAI' }); return; }
        result = await generateWithOpenAI({ apiKey, model, prompt });
        break;
      default:
        res.status(400).json({ error: `Unknown provider: ${provider}` });
        return;
    }

    res.json({ result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[generate] Error:', message);
    res.status(500).json({ error: message });
  }
});
