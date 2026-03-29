import React, { useState, useEffect } from 'react';

// Use environment variable in production, fallback to local Flask server for dev
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // Connection settings states
  const [llmConfig, setLlmConfig] = useState({ provider: 'openai', apiUrl: '', apiKey: '', modelName: '' });
  const [sourceConfig, setSourceConfig] = useState({ provider: 'jira', domainUrl: '', email: '', apiToken: '' });

  // Input states
  const [sourceMode, setSourceMode] = useState('text'); // text or jira
  const [jiraKey, setJiraKey] = useState('');
  const [inputText, setInputText] = useState('');
  
  // UI Feedback states
  const [jiraFetchStatus, setJiraFetchStatus] = useState(false);
  const [ticketContext, setTicketContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState(null);

  const [llmTestStatus, setLlmTestStatus] = useState('');
  const [jiraTestStatus, setJiraTestStatus] = useState('');

  // History State
  const [history, setHistory] = useState([]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const testConnection = async (uiType) => {
    const setStatus = uiType === 'llm' ? setLlmTestStatus : setJiraTestStatus;
    setStatus('checking');
    
    try {
      const backendType = uiType === 'jira' ? 'source' : uiType;
      const payload = {
        type: backendType, 
        config: uiType === 'llm' ? 
          { provider: llmConfig.provider, api_url: llmConfig.apiUrl, api_key: llmConfig.apiKey, model_name: llmConfig.modelName } :
          { provider: sourceConfig.provider, domain_url: sourceConfig.domainUrl, email: sourceConfig.email, api_token: sourceConfig.apiToken }
      };

      const res = await fetch(`${API_BASE}/test_connection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      setStatus(data.status === 'success' ? 'success' : 'error');
      if (data.status === 'error') {
         alert(data.message);
      } else {
         setTimeout(() => setStatus(''), 3000);
      }
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  const fetchJiraTicket = async () => {
    if (!jiraKey.trim()) return;
    setJiraFetchStatus(true);
    setTicketContext('');
    
    try {
      const payload = {
        source_config: { provider: sourceConfig.provider, domain_url: sourceConfig.domainUrl, email: sourceConfig.email, api_token: sourceConfig.apiToken },
        request_data: { ticket_id: jiraKey }
      };

      const res = await fetch(`${API_BASE}/fetch_ticket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (data.status === 'success') {
         setTicketContext(data.ticket_context);
      } else {
         setTicketContext(`Error: ${data.message}\nMake sure your Jira credentials in settings are correct.`);
      }
    } catch (e) {
      setTicketContext("Network error fetching ticket.");
    } finally {
      setJiraFetchStatus(false);
    }
  };

  const generatePlan = async () => {
    setIsGenerating(true);
    setGeneratedOutput('');
    
    const payload = {
      llm_config: { provider: llmConfig.provider, api_url: llmConfig.apiUrl, api_key: llmConfig.apiKey, model_name: llmConfig.modelName },
      source_config: { provider: sourceConfig.provider, domain_url: sourceConfig.domainUrl, email: sourceConfig.email, api_token: sourceConfig.apiToken },
      request_data: { ticket_id: sourceMode === 'jira' ? jiraKey : '', additional_context: ticketContext + "\\n\\n" + inputText, attachments: [] }
    };

    try {
      const res = await fetch(`${API_BASE}/generate_plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
         const data = await res.json();
         if (data.status === 'success') {
             setGeneratedOutput(data.data?.generated_plan_text || data.data);
         } else {
             setGeneratedOutput(`Generation Error: ${data.message}`);
         }
      } else {
         // It's a stream!
         const reader = res.body.getReader();
         const decoder = new TextDecoder('utf-8');
         let finalOutput = '';
         
         while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            
            for (let line of lines) {
                line = line.trim();
                if (line.startsWith('data: ')) {
                    const dataStr = line.replace('data: ', '').trim();
                    if (dataStr === '[DONE]') continue;
                    try {
                        const parsed = JSON.parse(dataStr);
                        const token = parsed.choices?.[0]?.delta?.content || "";
                        if (token) {
                            finalOutput += token;
                            setGeneratedOutput(finalOutput);
                        }
                    } catch (e) {}
                }
            }
         }
         
         // Format a clean Title for History
         let rawTitle = sourceMode === 'jira' && jiraKey ? `Jira Context: ${jiraKey}` : (inputText ? inputText : 'Blank Context');
         let cleanTitle = rawTitle.length > 25 ? rawTitle.substring(0, 25) + "..." : rawTitle;

         const newEntry = {
            id: Date.now(),
            title: `Plan | ${cleanTitle}`,
            timestamp: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
            sourceMode,
            jiraKey,
            inputText,
            ticketContext,
            generatedOutput: finalOutput
         };
         setHistory(prev => [newEntry, ...prev]);
      }
    } catch (e) {
      setGeneratedOutput("Network error while communicating with the backend API.");
    } finally {
      setIsGenerating(false);
    }
  };

  const loadHistoryItem = (entry) => {
     setSourceMode(entry.sourceMode);
     setJiraKey(entry.jiraKey);
     setInputText(entry.inputText);
     setTicketContext(entry.ticketContext);
     setGeneratedOutput(entry.generatedOutput);
  };

  const downloadPlan = (contentToDownload = null) => {
    const textToSave = contentToDownload || generatedOutput;
    if (!textToSave) return alert("Nothing to download!");
    const blob = new Blob([textToSave], {type: 'text/markdown'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `TestPlan_${Date.now()}.md`;
    a.click();
  };

  return (
    <div className={`h-screen flex transition-colors duration-300 overflow-hidden font-sans ${isDark ? 'dark bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <aside className={`w-72 border-r flex flex-col shrink-0 ${isDark ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-slate-200'}`}>
        <div className={`p-4 border-b flex items-center gap-3 shrink-0 ${isDark ? 'border-[#334155]' : 'border-slate-200'}`}>
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M4 17h16a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <span className="text-lg font-bold tracking-tight">GenTools <span className="text-blue-500">AI</span></span>
        </div>
        
        <nav className="p-4 space-y-2 shrink-0">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Modules</p>
          <button onClick={() => { setGeneratedOutput(null); setInputText(''); setTicketContext(''); setJiraKey(''); setSourceMode('text'); }} className="w-full flex items-center gap-3 p-3 bg-blue-600/10 text-blue-500 rounded-xl border border-blue-600/20 text-sm font-semibold">
             Test Plan Generator
          </button>
        </nav>

        {/* History Section */}
        <div className={`flex-1 overflow-y-auto flex flex-col mt-2 border-t ${isDark ? 'border-[#334155]' : 'border-slate-200'}`}>
          <div className="sticky top-0 p-4 pb-2 z-10 flex justify-between items-center bg-inherit">
             <p className="px-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">History</p>
             {history.length > 0 && <button onClick={() => setHistory([])} className="text-[10px] text-red-500 font-bold hover:underline">Clear All</button>}
          </div>
          <div className="px-2 pb-4 space-y-2">
            {history.length === 0 ? (
              <p className="text-xs text-center text-slate-500 italic mt-4">No recent test plans.</p>
            ) : (
              history.map(entry => (
                <div key={entry.id} className={`group flex flex-col p-3 rounded-xl border text-left cursor-pointer transition-all ${isDark ? 'bg-[#1e293b]/50 border-transparent hover:border-blue-500/30 hover:bg-slate-800' : 'bg-white border-transparent hover:border-blue-200 hover:shadow-sm'}`}>
                  <button onClick={() => loadHistoryItem(entry)} className="flex-1 text-left w-full">
                    <div className="font-bold text-xs truncate max-w-full text-slate-700 dark:text-slate-300">{entry.title}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{entry.timestamp}</div>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className={`h-14 shrink-0 border-b flex items-center justify-between px-6 z-10 ${isDark ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Dashboard /</span>
            <span className="text-sm font-semibold">Test Plan Generator</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} text-slate-500`}>
              {isDark ? '🌞' : '🌙'}
            </button>
            <button onClick={() => setShowSettings(true)} className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} text-slate-500 flex items-center gap-2`} title="Settings">
               ⚙️
            </button>
          </div>
        </header>

        <div className="p-4 flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
            {/* Input Column */}
            <div className="flex flex-col gap-3 min-h-0 h-full">
              <div className="flex flex-col flex-1 gap-3 min-h-0">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">Requirement Source</label>
                  <div className="flex gap-3">
                    <button onClick={() => setSourceMode('text')} className={`flex-1 p-2 text-center border-2 rounded-lg text-xs font-bold transition-all ${sourceMode === 'text' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : (isDark ? 'border-[#334155] hover:border-slate-500' : 'border-slate-200 hover:border-slate-300')}`}>
                      Manual Requirements
                    </button>
                    <button onClick={() => setSourceMode('jira')} className={`flex-1 p-2 text-center border-2 rounded-lg text-xs font-bold transition-all ${sourceMode === 'jira' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : (isDark ? 'border-[#334155] hover:border-slate-500' : 'border-slate-200 hover:border-slate-300')}`}>
                      Jira Ticket (Hybrid)
                    </button>
                  </div>
                </div>

                {sourceMode === 'jira' && (
                  <div className="animate-in fade-in duration-300 shrink-0">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                      Jira Issue Key
                      {jiraFetchStatus && <span className="text-[10px] text-blue-500 animate-pulse">Fetching Issue...</span>}
                    </label>
                    <div className="relative">
                      <input type="text" value={jiraKey} onChange={e => setJiraKey(e.target.value)} onBlur={fetchJiraTicket} className={`w-full p-2.5 pl-9 border rounded-lg shadow-sm text-xs focus:ring-2 focus:ring-blue-500 outline-none ${isDark ? 'bg-slate-800 border-[#334155]' : 'bg-white border-slate-200'}`} placeholder="e.g., QA-123" />
                      <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔗</span>
                    </div>
                  </div>
                )}

                <div className="flex-1 flex flex-col gap-2 min-h-0 relative">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
                    {sourceMode === 'jira' ? 'Additional Notes / User Stories' : 'Requirements Details'}
                  </label>
                  <textarea value={inputText} onChange={e => setInputText(e.target.value)} className={`flex-1 p-4 border rounded-xl shadow-sm text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none overflow-y-auto leading-relaxed ${isDark ? 'bg-slate-800/50 border-[#334155]' : 'bg-white border-slate-200'}`} placeholder="Type manual instructions/user stories here..."></textarea>
                </div>
              </div>
            </div>

            {/* Output Column */}
            <div className="flex flex-col gap-2 min-h-0 h-full">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between shrink-0">
                 {sourceMode === 'jira' && !generatedOutput && ticketContext ? 'Live Ticket Preview' : 'Generated Output'}
                {isGenerating && (
                  <div className="flex items-center gap-2 text-[10px] text-blue-500 font-bold animate-pulse">
                    <span className="w-1 h-1 rounded-full bg-blue-500"></span> AI PROCESSING
                  </div>
                )}
              </label>
              <div className={`flex-1 border rounded-xl p-6 text-sm overflow-y-auto whitespace-pre-wrap shadow-inner relative ${isDark ? 'bg-slate-800/30 border-[#334155]' : 'bg-white border-slate-200'}`}>
                {!generatedOutput && !ticketContext && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 opacity-50 space-y-2">
                    <span className="text-3xl">✨</span>
                    <p className="italic text-xs">Ready for generation...</p>
                  </div>
                )}
                <div className="relative z-10 leading-7 text-slate-700 dark:text-slate-300">
                  {generatedOutput || ticketContext}
                </div>
              </div>
            </div>
          </div>

          <div className={`py-3 px-5 shrink-0 flex justify-between items-center rounded-xl border shadow-sm ${isDark ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-slate-200'}`}>
             <div className="flex gap-3 text-[10px] font-bold uppercase tracking-tighter text-slate-400">
                <div className="flex items-center gap-1.5 px-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> LLM READY</div>
                <div className="flex items-center gap-1.5 px-2 border-l border-slate-600/30"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> SOURCE: {sourceMode === 'jira' ? 'JIRA READY' : 'MANUAL'}</div>
             </div>
             <div className="flex gap-2">
                <button onClick={generatePlan} disabled={isGenerating} className="px-6 py-2 bg-blue-600 text-white text-xs rounded-lg font-bold hover:bg-blue-700 active:scale-95 transition-all outline-none flex items-center gap-2 disabled:opacity-50">
                  Generate Plan
                </button>
                <button onClick={() => downloadPlan(null)} className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${isDark ? 'border-[#334155] hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-50'}`}>
                  Download
                </button>
             </div>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl p-6 w-full max-w-lg shadow-2xl border max-h-[85vh] overflow-y-auto ${isDark ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Settings</h2>
              <button onClick={() => setShowSettings(false)} className={`p-1.5 rounded-full ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>✕</button>
            </div>

            <div className={`p-5 rounded-xl mb-5 space-y-3 border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
              <h3 className="font-bold text-xs uppercase text-blue-500">LLM Engine</h3>
              <select value={llmConfig.provider} onChange={e => setLlmConfig({...llmConfig, provider: e.target.value})} className={`w-full p-2.5 rounded-lg text-sm border ${isDark ? 'bg-slate-800 border-[#334155]' : 'bg-white border-slate-200'}`}>
                <option value="openai">OpenAI</option>
                <option value="groq">GROQ</option>
                <option value="ollama">Ollama (Local)</option>
                <option value="grok">Grok</option>
              </select>
              <div className="grid grid-cols-2 gap-3">
                 <input type="text" placeholder="Model Name" value={llmConfig.modelName} onChange={e => setLlmConfig({...llmConfig, modelName: e.target.value})} className={`w-full p-2.5 rounded-lg text-sm border ${isDark ? 'bg-slate-800 border-[#334155]' : 'bg-white border-slate-200'}`} />
                 <input type="text" placeholder="API URL (optional)" value={llmConfig.apiUrl} onChange={e => setLlmConfig({...llmConfig, apiUrl: e.target.value})} className={`w-full p-2.5 rounded-lg text-sm border ${isDark ? 'bg-slate-800 border-[#334155]' : 'bg-white border-slate-200'}`} />
              </div>
              <input type="password" placeholder="API Key" value={llmConfig.apiKey} onChange={e => setLlmConfig({...llmConfig, apiKey: e.target.value})} className={`w-full p-2.5 rounded-lg text-sm border ${isDark ? 'bg-slate-800 border-[#334155]' : 'bg-white border-slate-200'}`} />
              <button onClick={() => testConnection('llm')} className={`w-full py-2.5 text-xs font-bold rounded-lg border transition-all ${isDark ? 'bg-slate-800 border-[#334155] hover:border-blue-500' : 'bg-white border-slate-200 hover:border-blue-500'}`}>
                {llmTestStatus === 'checking' ? 'Checking...' : llmTestStatus === 'success' ? 'Connected ✓' : llmTestStatus === 'error' ? 'Connection Failed' : 'Test LLM Connection'}
              </button>
            </div>

            <div className={`p-5 rounded-xl space-y-3 border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
              <h3 className="font-bold text-xs uppercase text-indigo-500">Jira/ADO Source</h3>
              <select value={sourceConfig.provider} onChange={e => setSourceConfig({...sourceConfig, provider: e.target.value})} className={`w-full p-2.5 rounded-lg text-sm border ${isDark ? 'bg-slate-800 border-[#334155]' : 'bg-white border-slate-200'}`}>
                <option value="jira">Jira Cloud</option>
                <option value="ado">Azure DevOps (ADO)</option>
              </select>
              <input type="text" placeholder="Instance URL (e.g. dev.atlassian.net)" value={sourceConfig.domainUrl} onChange={e => setSourceConfig({...sourceConfig, domainUrl: e.target.value})} className={`w-full p-2.5 rounded-lg text-sm border ${isDark ? 'bg-slate-800 border-[#334155]' : 'bg-white border-slate-200'}`} />
              <div className="grid grid-cols-2 gap-3">
                 <input type="text" placeholder="Email Account" value={sourceConfig.email} onChange={e => setSourceConfig({...sourceConfig, email: e.target.value})} className={`w-full p-2.5 rounded-lg text-sm border ${isDark ? 'bg-slate-800 border-[#334155]' : 'bg-white border-slate-200'}`} />
                 <input type="password" placeholder="API Token/PAT" value={sourceConfig.apiToken} onChange={e => setSourceConfig({...sourceConfig, apiToken: e.target.value})} className={`w-full p-2.5 rounded-lg text-sm border ${isDark ? 'bg-slate-800 border-[#334155]' : 'bg-white border-slate-200'}`} />
              </div>
              <button onClick={() => testConnection('jira')} className={`w-full py-2.5 text-xs font-bold rounded-lg border transition-all ${isDark ? 'bg-slate-800 border-[#334155] hover:border-indigo-500' : 'bg-white border-slate-200 hover:border-indigo-500'}`}>
                {jiraTestStatus === 'checking' ? 'Checking...' : jiraTestStatus === 'success' ? 'Connected ✓' : jiraTestStatus === 'error' ? 'Connection Failed' : 'Test Source Connection'}
              </button>
            </div>

            <button onClick={() => setShowSettings(false)} className="w-full mt-5 py-3 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-md hover:bg-blue-700">Close Options</button>
          </div>
        </div>
      )}
    </div>
  );
}
