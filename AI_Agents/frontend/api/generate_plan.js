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
            
            const systemPrompt = `You are an intelligent QA Test Planner Agent. Your job is to output ONLY a markdown Test Plan based on the context.
Strictly adhere to standard markdown headers.`;
            const contextText = requestData.additional_context || "No context provided.";
            
            const openaiPayload = {
                model: model || defaultModel,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: `Context:\n${contextText}` }
                ],
                temperature: 0.3,
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
            
            // Forward the SSE directly to the React frontend
            return new Response(resp.body, {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache, no-transform',
                    'Connection': 'keep-alive'
                }
            });
        }
        
        return Response.json({ status: "error", message: "Provider stream not implemented in Edge function yet" });
    } catch (e) {
        return Response.json({ status: "error", message: e.message });
    }
}
