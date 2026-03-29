import React from 'react';
import { Search, Bell, Moon, Sun, User, ChevronDown } from 'lucide-react';
import { VIEWS } from '../../constants/columns';

const TopNav = ({ currentView, onViewChange, theme, onThemeToggle }) => {
  const tabs = [
    { id: VIEWS.DASHBOARD, label: 'Overview' },
    { id: VIEWS.APPLICATIONS, label: 'Pipeline' },
    { id: VIEWS.RESUMES, label: 'Resumes' },
    { id: VIEWS.ANALYTICS, label: 'Analytics' },
    { id: VIEWS.INTERVIEWS, label: 'Interviews' },
  ];

  return (
    <header className="h-20 bg-jobflow-bg border-b border-jobflow-border flex items-center justify-between px-10 z-40 shrink-0">
      <div className="flex items-center gap-12 min-w-0">
        <h1 className="text-xl font-black text-jobflow-text tracking-tight uppercase shrink-0">JobFlow <span className="text-jobflow-accent italic font-black">AI</span></h1>
        
        <nav className="flex items-center gap-8 h-20 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onViewChange(tab.id)}
              className={`h-full px-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group ${
                currentView === tab.id ? 'text-jobflow-accent' : 'text-jobflow-text-dim hover:text-jobflow-text'
              }`}
            >
              {tab.label}
              {currentView === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-jobflow-accent shadow-[0_-4px_10px_rgba(6,182,212,0.5)]"></div>
              )}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-jobflow-accent group-hover:w-full transition-all duration-300"></div>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-jobflow-text-dim group-focus-within:text-jobflow-accent transition-all" size={16} />
          <input
            type="text"
            placeholder="Search Applications..."
            className="bg-jobflow-card border border-jobflow-border rounded-xl pl-11 pr-4 py-2.5 text-xs text-jobflow-text-dim focus:text-jobflow-text focus:border-jobflow-accent focus:w-64 w-48 transition-all outline-none"
          />
        </div>

        <button onClick={onThemeToggle} className="p-2.5 text-jobflow-text-dim hover:text-jobflow-accent bg-jobflow-card border border-jobflow-border rounded-xl transition-all">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="p-2.5 text-jobflow-text-dim hover:text-jobflow-accent bg-jobflow-card border border-jobflow-border rounded-xl transition-all relative">
          <Bell size={18} />
          <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-jobflow-card"></div>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-jobflow-border/50 cursor-pointer group">
          <div className="w-10 h-10 bg-jobflow-accent/10 rounded-xl border border-jobflow-accent/20 flex items-center justify-center text-jobflow-accent">
            <User size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-jobflow-text group-hover:text-jobflow-accent transition-all">John Doe</span>
            <span className="text-[9px] font-bold text-jobflow-text-dim">Pro Member</span>
          </div>
          <ChevronDown size={14} className="text-jobflow-text-dim group-hover:text-jobflow-text" />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
