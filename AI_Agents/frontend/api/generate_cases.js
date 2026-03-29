export const config = { runtime: 'edge' };

export default async function handler(req) {
    if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
    
    try {
        const payload = await req.json();
        const llmConfig = payload.llm_config || {};
        const requestData = payload.request_data || {};
        
        const provider = (llmConfig.provider || process.env.LLM_PROVIDER || '').toLowerCase();
        const apiKey = llmConfig.api_key || process.env.LLM_API_KEY || '';
        const apiUrl = llmConfig.api_url || process.env.LLM_API_URL || '';
        const model = llmConfig.model_name || process.env.LLM_MODEL || '';
        
        if (provider === 'openai' || provider === 'groq') {
            const url = apiUrl || (provider === 'groq' ? 'https://api.groq.com/openai/v1/chat/completions' : 'https://api.openai.com/v1/chat/completions');
            const defaultModel = provider === 'groq' ? 'llama3-8b-8192' : 'gpt-4-turbo';
            
            const systemPrompt = `You are a Principal SDET QA Assistant operating under STRICT ANTI-HALLUCINATION RULES.
You may ONLY use information explicitly provided in the user's Context.

## STRICT RULES (MANDATORY)
1. DO NOT invent features, APIs, error codes, UI elements, or behavior.
2. If information is missing or unclear to create a step or expectation, state: "Insufficient information to determine."
3. Every assertion in your test cases must be easily traceable to the provided input.
4. If a detail is lightly inferred for practicality, label it explicitly as: "Inference (low confidence)".

## OUTPUT FORMAT (STRICT)
Format your entire response strictly following these 4 sequential headers. You must output a Markdown Table under 'Generated Output' mapping to JIRA Test Case fields.

- Verified Facts: [Bullet points of exact facts extracted]
- Missing / Unknown Information: [Bullet points of things not defined]
- Generated Output:
| Test Case ID | Summary | Preconditions | Steps | Expected Results | Priority |
|---|---|---|---|---|---|
| TC-01 | ... | ... | ... | ... | ... |

- Self-Validation Check: [Validate your output against the anti-hallucination rules]`;

            const contextText = requestData.additional_context || "No context provided.";
            
            const openaiPayload = {
                model: model || defaultModel,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: `Context Payload:\n${contextText}` }
                ],
                temperature: 0.1, // extremely low creativity for anti-hallucination logic
                stream: true
            };
            
            const resp = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(openaiPayload)
            });
            
            if (!resp.ok) {
                const errText = await resp.text();
                return Response.json({ status: "error", message: `LLM HTTP ${resp.status}: ${errText}` });
            }
            
            // Forward the SSE stream directly
            return new Response(resp.body, {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache, no-transform',
                    'Connection': 'keep-alive'
                }
            });
        }
        
        return Response.json({ status: "error", message: "Provider stream not implemented for Smart Test Cases" });
    } catch (e) {
        return Response.json({ status: "error", message: e.message });
    }
}
