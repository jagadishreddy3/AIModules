import { useState } from "react";
import { Save, KeyRound, Server, CheckCircle2, AlertCircle } from "lucide-react";
import { useSettings, type Provider } from "../context/SettingsContext";

export function Settings() {
  const { settings, updateSettings, saveSettings } = useSettings();
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSave = () => {
    setSaving(true);
    saveSettings();
    setFeedback({ type: 'success', message: 'Settings saved successfully' });
    setTimeout(() => {
      setSaving(false);
      setFeedback(null);
    }, 2000);
  };

  const handleTestConnection = async (provider: Provider) => {
    setTesting(provider);
    setFeedback(null);
    
    const body: any = {
      provider,
      model: provider === 'ollama' ? settings.ollamaModel : (provider === 'groq' ? settings.groqModel : settings.openaiModel),
      apiKey: provider === 'ollama' ? undefined : (provider === 'groq' ? settings.groqApiKey : settings.openaiApiKey),
      ollamaUrl: provider === 'ollama' ? settings.ollamaUrl : undefined,
    };

    try {
      const response = await fetch('/api/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.ok) {
        setFeedback({ type: 'success', message: data.message });
      } else {
        setFeedback({ type: 'error', message: data.message });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Failed to reach backend server' });
    } finally {
      setTesting(null);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="px-8 py-6 border-b border-slate-200/50 bg-white/40 sticky top-0 backdrop-blur-md z-20 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 tracking-tight">API Settings</h2>
          <p className="text-sm text-slate-500 mt-1">Configure your LLM providers and models</p>
        </div>
        {feedback && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${
            feedback.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
          }`}>
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {feedback.message}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-8 pb-12">
          
          {/* Active Provider Selection */}
          <section className="bg-white/60 p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Default Provider</h3>
            <div className="grid grid-cols-3 gap-3">
              {(['ollama', 'groq', 'openai'] as Provider[]).map((p) => (
                <button
                  key={p}
                  onClick={() => updateSettings({ activeProvider: p })}
                  className={`py-3 px-4 rounded-xl border-2 transition-all font-medium text-sm capitalize ${
                    settings.activeProvider === p 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                    : 'border-slate-100 bg-white/50 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </section>

          {/* Ollama Section */}
          <section className="bg-white/60 p-6 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-400" />
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Ollama Settings</h3>
              </div>
              <button 
                onClick={() => handleTestConnection('ollama')}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors"
                disabled={testing === 'ollama'}
              >
                {testing === 'ollama' ? 'Testing...' : 'Test Connection'}
              </button>
            </div>
            
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Endpoint URL</label>
                <input 
                  type="text"
                  value={settings.ollamaUrl}
                  onChange={(e) => updateSettings({ ollamaUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all text-sm text-slate-800 placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Model Name</label>
                <input 
                  type="text"
                  value={settings.ollamaModel}
                  onChange={(e) => updateSettings({ ollamaModel: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all text-sm text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>
          </section>

          {/* Groq Section */}
          <section className="bg-white/60 p-6 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Groq Settings</h3>
              </div>
              <button 
                onClick={() => handleTestConnection('groq')}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                disabled={testing === 'groq'}
              >
                {testing === 'groq' ? 'Testing...' : 'Test Connection'}
              </button>
            </div>
            
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">API Key</label>
                <input 
                  type="password"
                  value={settings.groqApiKey}
                  onChange={(e) => updateSettings({ groqApiKey: e.target.value })}
                  placeholder="gsk_..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500/50 transition-all text-sm text-slate-800 placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Model ID</label>
                <input 
                  type="text"
                  value={settings.groqModel}
                  onChange={(e) => updateSettings({ groqModel: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500/50 transition-all text-sm text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>
          </section>

          {/* OpenAI Section */}
          <section className="bg-white/60 p-6 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">OpenAI Settings</h3>
              </div>
              <button 
                onClick={() => handleTestConnection('openai')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
                disabled={testing === 'openai'}
              >
                {testing === 'openai' ? 'Testing...' : 'Test Connection'}
              </button>
            </div>
            
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">API Key</label>
                <input 
                  type="password"
                  value={settings.openaiApiKey}
                  onChange={(e) => updateSettings({ openaiApiKey: e.target.value })}
                  placeholder="sk-..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all text-sm text-slate-800 placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Model ID</label>
                <select 
                  value={settings.openaiModel}
                  onChange={(e) => updateSettings({ openaiModel: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all text-sm text-slate-800"
                >
                  <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
                  <option value="gpt-4o">GPT-4o</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>
              </div>
            </div>
          </section>
          
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 bg-white/40 border-t border-slate-200/50 backdrop-blur-md flex items-center justify-end gap-3 z-10">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/30 font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 active:scale-95 disabled:opacity-70 flex items-center gap-2"
        >
          {saving ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? 'Settings Saved' : 'Save Configuration'}
        </button>
      </div>
    </div>
  );
}
