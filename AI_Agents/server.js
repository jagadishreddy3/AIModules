import express, { json } from 'express';
import cors from 'cors';
import { fetch } from 'undici'; // Node 18+ has native fetch, but adding for fallback
const app = express();

app.use(cors());
app.use(json());

// 1. Connection Testing Endpoint
app.post('/api/test_connection', async (req, res) => {
    try {
        const payload = req.body;
        const conn_type = payload.type;
        const config = payload.config || {};

        if (conn_type === 'llm') {
            const provider = (config.provider || '').toLowerCase();
            const apiKey = config.api_key || '';
            const apiUrl = config.api_url || '';

            if (provider === 'openai' || provider === 'groq') {
                const url = apiUrl || (provider === 'groq' ? 'https://api.groq.com/openai/v1/models' : 'https://api.openai.com/v1/models');
                const resp = await fetch(url, { headers: { 'Authorization': `Bearer ${apiKey}` } });
                if (resp.ok) return res.json({ status: 'success', message: `${provider.toUpperCase()} API connected!` });
                else return res.json({ status: 'error', message: `HTTP ${resp.status}: ${await resp.text()}` });
            }
            return res.json({ status: 'error', message: 'Unsupported provider' });
        }
        else if (conn_type === 'source') {
            const provider = (config.provider || '').toLowerCase();
            if (provider === 'jira') {
                let domain = (config.domain_url || '').replace(/\/+$/, "");
                if (!domain.startsWith('http')) domain = `https://${domain}`;

                const url = `${domain}/rest/api/3/myself`;
                const auth = Buffer.from(`${config.email || ''}:${config.api_token || ''}`).toString('base64');
                const resp = await fetch(url, { headers: { 'Authorization': `Basic ${auth}`, 'Accept': 'application/json' } });

                if (resp.ok) return res.json({ status: 'success', message: 'Jira Cloud connected successfully' });
                else return res.json({ status: 'error', message: `Jira Login Failed HTTP ${resp.status}` });
            }
        }
        res.json({ status: 'error', message: 'Unknown connection request' });
    } catch (e) {
        res.json({ status: 'error', message: e.message });
    }
});

// 2. Fetch Ticket Endpoint
app.post('/api/fetch_ticket', async (req, res) => {
    try {
        const payload = req.body;
        const config = payload.source_config || {};
        const requestData = payload.request_data || {};

        let ticketId = requestData.ticket_id || '';
        if (ticketId && ticketId.includes('/')) ticketId = ticketId.split('/').pop().split('?')[0].trim();

        const provider = (config.provider || '').toLowerCase();

        if (provider === 'jira') {
            let domain = (config.domain_url || '').replace(/\/+$/, "");
            if (!domain.startsWith('http')) domain = `https://${domain}`;

            const url = `${domain}/rest/api/3/issue/${ticketId}?fields=summary,description,issuetype,status`;
            const auth = Buffer.from(`${config.email || ''}:${config.api_token || ''}`).toString('base64');

            const resp = await fetch(url, { headers: { 'Authorization': `Basic ${auth}`, 'Accept': 'application/json' } });

            if (resp.ok) {
                const data = await resp.json();
                const fields = data.fields || {};

                let context = `--- JIRA TICKET FETCHED [${ticketId}] ---\n\n`;
                context += `Subject: ${fields.summary || ''}\n`;
                context += `Type: ${fields.issuetype?.name || ''} | Status: ${fields.status?.name || ''}\n\n`;

                let descText = "Description:\n";
                const desc = fields.description;
                if (typeof desc === 'object' && desc !== null) {
                    const extractText = (node) => {
                        let text = "";
                        if (node.type === "text") return node.text || "";
                        if (node.content) node.content.forEach(child => text += extractText(child) + " ");
                        if (node.type === "paragraph") text += "\n";
                        return text;
                    };
                    descText += extractText(desc);
                } else {
                    descText += String(desc || "");
                }

                context += descText;
                return res.json({ status: "success", ticket_id: ticketId, ticket_context: context });
            } else {
                return res.json({ status: "error", message: `HTTP ${resp.status} - Verification Failed` });
            }
        }
        res.json({ status: "error", message: "Unsupported provider" });
    } catch (e) {
        res.json({ status: "error", message: e.message });
    }
});

// 3. Generate Plan Endpoint (Server Sent Events Streaming)
app.post('/api/generate_plan', async (req, res) => {
    try {
        const payload = req.body;
        const llmConfig = payload.llm_config || {};
        const requestData = payload.request_data || {};

        const provider = (llmConfig.provider || process.env.LLM_PROVIDER || '').toLowerCase();
        const apiKey = llmConfig.api_key || process.env.LLM_API_KEY || '';
        const apiUrl = llmConfig.api_url || process.env.LLM_API_URL || '';
        const model = llmConfig.model_name || process.env.LLM_MODEL || '';

        if (provider === 'openai' || provider === 'groq') {
            const url = apiUrl || (provider === 'groq' ? 'https://api.groq.com/openai/v1/chat/completions' : 'https://api.openai.com/v1/chat/completions');
            const defaultModel = provider === 'groq' ? 'llama3-8b-8192' : 'gpt-4-turbo';

            const systemPrompt = `You are an intelligent QA Test Planner Agent. Output ONLY a markdown Test Plan based on the context. Strictly adhere to standard markdown headers.`;
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
                headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(openaiPayload)
            });

            if (!resp.ok) return res.json({ status: "error", message: `LLM HTTP ${resp.status}: ${await resp.text()}` });

            // Set headers for Server-Sent Events
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            // Pipe response cleanly in native Node environment
            for await (const chunk of resp.body) {
                res.write(chunk);
            }
            res.end();
            return;
        }
        res.json({ status: "error", message: "Provider stream not implemented in Node backend" });
    } catch (e) {
        res.json({ status: "error", message: e.message });
    }
});

// 4. Generate Test Cases Endpoint (Strict Anti-Hallucination)
app.post('/api/generate_cases', async (req, res) => {
    try {
        const payload = req.body;
        const llmConfig = payload.llm_config || {};
        const requestData = payload.request_data || {};

        const provider = (llmConfig.provider || '').toLowerCase();
        const apiKey = llmConfig.api_key || '';
        const apiUrl = llmConfig.api_url || '';
        const model = llmConfig.model_name || '';

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
                temperature: 0.1,
                stream: true
            };

            const resp = await fetch(url, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(openaiPayload)
            });

            if (!resp.ok) return res.json({ status: "error", message: `LLM HTTP ${resp.status}` });

            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            for await (const chunk of resp.body) {
                res.write(chunk);
            }
            res.end();
            return;
        }
        res.json({ status: "error", message: "Provider stream not implemented in Node backend" });
    } catch (e) {
        res.json({ status: "error", message: e.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Node.js Backend API Server natively active on http://127.0.0.1:${PORT}`));
