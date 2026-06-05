import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Cpu, Key, Link, Zap } from 'lucide-react';
import { getConfig, saveConfig, getDefaults, LLM_ENGINES, testConnection } from '../utils/llm';

const SettingsModal = ({ isOpen, onClose }) => {
  const [engine, setEngine] = useState('openai');
  const [model, setModel] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const cfg = getConfig();
      setEngine(cfg.engine || 'openai');
      setModel(cfg.model || getDefaults(cfg.engine || 'openai').model);
      setApiKey(cfg.apiKey || '');
      setApiUrl(cfg.apiUrl || getDefaults(cfg.engine || 'openai').apiUrl);
      setResult(null);
    }
  }, [isOpen]);

  const handleEngineChange = (e) => {
    const eng = e.target.value;
    setEngine(eng);
    const def = getDefaults(eng);
    setModel(def.model);
    setApiKey('');
    setApiUrl(def.apiUrl);
    setResult(null);
  };

  const handleSave = () => {
    saveConfig({ engine, model, apiKey, apiUrl });
    setResult({ success: true, message: 'Settings saved!' });
  };

  const handleTest = async () => {
    setTesting(true);
    setResult(null);
    const res = await testConnection({ engine, model, apiKey, apiUrl });
    setResult(res);
    setTesting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-jobflow-card border border-jobflow-border rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-jobflow-accent/10 rounded-xl">
              <Cpu size={18} className="text-jobflow-accent" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-jobflow-text">LLM Settings</h2>
              <p className="text-[11px] font-medium text-jobflow-text-dim">Configure AI engine</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-jobflow-text-dim hover:text-jobflow-text hover:bg-jobflow-bg rounded-lg transition-all">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-jobflow-text-dim mb-1.5">
              <Zap size={12} className="text-jobflow-accent" /> LLM Engine
            </label>
            <select
              value={engine}
              onChange={handleEngineChange}
              className="w-full bg-jobflow-bg border border-jobflow-border rounded-xl px-3 py-2.5 text-sm text-jobflow-text outline-none focus:border-jobflow-accent transition-all"
            >
              {LLM_ENGINES.map(e => (
                <option key={e.id} value={e.id}>{e.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-jobflow-text-dim mb-1.5">
              <Cpu size={12} className="text-jobflow-accent" /> Model Name
            </label>
            <input
              type="text"
              value={model}
              onChange={e => setModel(e.target.value)}
              placeholder="e.g. gpt-4o-mini"
              className="w-full bg-jobflow-bg border border-jobflow-border rounded-xl px-3 py-2.5 text-sm text-jobflow-text outline-none focus:border-jobflow-accent transition-all"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-jobflow-text-dim mb-1.5">
              <Key size={12} className="text-jobflow-accent" /> API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder={engine === 'ollama' ? 'Not required for local' : 'sk-...'}
              className="w-full bg-jobflow-bg border border-jobflow-border rounded-xl px-3 py-2.5 text-sm text-jobflow-text outline-none focus:border-jobflow-accent transition-all"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-jobflow-text-dim mb-1.5">
              <Link size={12} className="text-jobflow-accent" /> API URL
            </label>
            <input
              type="text"
              value={apiUrl}
              onChange={e => setApiUrl(e.target.value)}
              placeholder="https://api.openai.com/v1/chat/completions"
              className="w-full bg-jobflow-bg border border-jobflow-border rounded-xl px-3 py-2.5 text-sm text-jobflow-text outline-none focus:border-jobflow-accent transition-all"
            />
          </div>

          {result && (
            <div className={`flex items-center gap-2 p-3 rounded-xl text-sm ${
              result.success ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
            }`}>
              {result.success ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              <span className="text-xs font-medium">{result.message}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleTest}
            disabled={testing}
            className="flex-1 py-2.5 rounded-xl border border-jobflow-border text-jobflow-text font-semibold text-xs uppercase tracking-wider hover:bg-jobflow-bg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {testing ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
            Test Connection
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl bg-jobflow-accent text-white font-semibold text-xs uppercase tracking-wider hover:bg-jobflow-accent/80 transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
