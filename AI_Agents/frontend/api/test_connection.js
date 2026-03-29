export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  
  try {
    const payload = await req.json();
    const conn_type = payload.type;
    const config = payload.config || {};
    
    if (conn_type === 'llm') {
      const provider = (config.provider || '').toLowerCase();
      const apiKey = config.api_key || '';
      const apiUrl = config.api_url || '';
      
      if (provider === 'openai' || provider === 'groq') {
        const url = apiUrl || (provider === 'groq' ? 'https://api.groq.com/openai/v1/models' : 'https://api.openai.com/v1/models');
        const resp = await fetch(url, { headers: { 'Authorization': `Bearer ${apiKey}` } });
        if (resp.ok) return Response.json({ status: 'success', message: `${provider.toUpperCase()} API connected!` });
        else {
           let err = await resp.text();
           return Response.json({ status: 'error', message: `HTTP ${resp.status}: ${err}` });
        }
      }
      return Response.json({ status: 'error', message: 'Unsupported provider for Edge' });
    }
    else if (conn_type === 'source') {
      const provider = (config.provider || '').toLowerCase();
      if (provider === 'jira') {
        let domain = (config.domain_url || '').replace(/\/+$/, "");
        if (!domain.startsWith('http')) domain = `https://${domain}`;
        const email = config.email || '';
        const token = config.api_token || '';
        
        const url = `${domain}/rest/api/3/myself`;
        const auth = btoa(`${email}:${token}`);
        const resp = await fetch(url, { headers: { 'Authorization': `Basic ${auth}`, 'Accept': 'application/json' }});
        if (resp.ok) return Response.json({ status: 'success', message: 'Jira Cloud connected successfully' });
        else {
           let errText = await resp.text();
           try { const j = JSON.parse(errText); if (j.errorMessages) errText = j.errorMessages[0]; } catch(e){}
           if (resp.status === 401) errText = "Invalid API Token or Email. Ensure you use an Atlassian API Token generated from id.atlassian.com, NOT your login password.";
           return Response.json({ status: 'error', message: `HTTP ${resp.status}: ${errText}` });
        }
      }
    }
    return Response.json({ status: 'error', message: 'Unknown connection request' });
  } catch (e) {
    return Response.json({ status: 'error', message: e.message });
  }
}
