import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, MessageSquare, User, Bot } from 'lucide-react';
import { getConfig, sendChatMessage } from '../utils/llm';

const ChatPanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const config = getConfig();
      if (!config.apiKey && config.engine !== 'ollama') {
        throw new Error('Please configure LLM settings first. Click the Settings icon.');
      }
      const reply = await sendChatMessage(config, [...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-96 bg-jobflow-sidebar border-l border-jobflow-border shadow-2xl flex flex-col animate-fade-in">
      <div className="flex items-center justify-between px-5 py-4 border-b border-jobflow-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-jobflow-accent/10 rounded-lg">
            <MessageSquare size={16} className="text-jobflow-accent" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-jobflow-text">AI Assistant</h2>
            <p className="text-[10px] font-medium text-jobflow-text-dim">
              {getConfig().engine} &mdash; {getConfig().model}
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 text-jobflow-text-dim hover:text-jobflow-text hover:bg-jobflow-card rounded-lg transition-all">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-40 gap-3">
            <Bot size={40} className="text-jobflow-text-dim" />
            <p className="text-xs font-medium text-jobflow-text-dim max-w-[200px]">
              Ask me anything about job searching, resume tips, or interview prep.
            </p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-jobflow-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={14} className="text-jobflow-accent" />
              </div>
            )}
            <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
              msg.role === 'user'
                ? 'bg-jobflow-accent text-white rounded-br-md'
                : 'bg-jobflow-card border border-jobflow-border text-jobflow-text rounded-bl-md'
            }`}>
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-jobflow-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <User size={14} className="text-jobflow-accent" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 justify-start">
            <div className="w-7 h-7 rounded-lg bg-jobflow-accent/10 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-jobflow-accent" />
            </div>
            <div className="bg-jobflow-card border border-jobflow-border rounded-2xl rounded-bl-md px-4 py-3">
              <Loader2 size={16} className="animate-spin text-jobflow-accent" />
            </div>
          </div>
        )}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded-xl">
            {error}
          </div>
        )}
        <div ref={messagesEnd} />
      </div>

      <div className="p-4 border-t border-jobflow-border shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={loading}
            className="flex-1 bg-jobflow-bg border border-jobflow-border rounded-xl px-3.5 py-2.5 text-sm text-jobflow-text outline-none focus:border-jobflow-accent transition-all placeholder:text-jobflow-text-dim/50"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="p-2.5 bg-jobflow-accent text-white rounded-xl hover:bg-jobflow-accent/80 transition-all disabled:opacity-40 shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[9px] text-jobflow-text-dim/50 mt-2 text-center">
          Responses are AI-generated. Verify critical information.
        </p>
      </div>
    </div>
  );
};

export default ChatPanel;
