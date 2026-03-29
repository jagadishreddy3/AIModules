export const config = { runtime: 'edge' };

function parseJiraIssue(issueData) {
    const fields = issueData.fields || {};
    return {
        summary: fields.summary || "",
        description: fields.description || "",
        issuetype: fields.issuetype?.name || "",
        status: fields.status?.name || ""
    };
}

export default async function handler(req) {
    if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
    
    try {
        const payload = await req.json();
        const config = payload.source_config || {};
        const requestData = payload.request_data || {};
        
        let ticketId = requestData.ticket_id || '';
        if (ticketId && ticketId.includes('/')) ticketId = ticketId.split('/').pop().split('?')[0].trim();
        
        const provider = (config.provider || '').toLowerCase();
        
        if (provider === 'jira') {
            let domain = (config.domain_url || '').replace(/\/+$/, "");
            if (!domain.startsWith('http')) domain = `https://${domain}`;
            
            const email = config.email || '';
            const token = config.api_token || '';
            
            if (!domain || !email || !token || !ticketId) {
                return Response.json({ status: "error", message: "Missing required Jira fields" });
            }
            
            const url = `${domain}/rest/api/3/issue/${ticketId}?fields=summary,description,issuetype,status`;
            const auth = btoa(`${email}:${token}`);
            
            const resp = await fetch(url, {
                headers: { 'Authorization': `Basic ${auth}`, 'Accept': 'application/json' }
            });
            
            if (resp.ok) {
                const data = await resp.json();
                const parsed = parseJiraIssue(data);
                
                let context = `--- JIRA TICKET FETCHED [${ticketId}] ---\n\n`;
                context += `Subject: ${parsed.summary}\n`;
                context += `Type: ${parsed.issuetype} | Status: ${parsed.status}\n\n`;
                
                let descText = "Description:\n";
                const desc = parsed.description;
                
                if (typeof desc === 'object' && desc !== null) {
                    const extractText = (node) => {
                        let text = "";
                        if (node.type === "text") return node.text || "";
                        if (node.content) {
                            node.content.forEach(child => text += extractText(child) + " ");
                        }
                        if (node.type === "paragraph") text += "\n";
                        return text;
                    };
                    descText += extractText(desc);
                } else {
                    descText += String(desc || "");
                }
                
                context += descText;
                return Response.json({ status: "success", ticket_id: ticketId, ticket_context: context });
            } else {
                 let errText = await resp.text();
                 try { const j = JSON.parse(errText); if (j.errorMessages) errText = j.errorMessages[0]; } catch(e){}
                 if (resp.status === 401) errText = "Invalid API Token or Email. Ensure you use an API Token, NOT your password.";
                 return Response.json({ status: "error", message: `HTTP ${resp.status}: ${errText}` });
            }
        }
        return Response.json({ status: "error", message: "Unsupported provider" });
    } catch (e) {
        return Response.json({ status: "error", message: e.message });
    }
}
