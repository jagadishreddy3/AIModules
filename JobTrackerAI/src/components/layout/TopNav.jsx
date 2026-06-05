import React from 'react';
import { Bell, Moon, Sun, User, PanelLeft } from 'lucide-react';
import { VIEWS } from '../../constants/columns';

const TopNav = ({ currentView, onViewChange, theme, onThemeToggle, onToggleSidebar }) => {
  const tabs = [
    { id: VIEWS.DASHBOARD, label: 'Overview' },
    { id: VIEWS.APPLICATIONS, label: 'Pipeline' },
    { id: VIEWS.RESUMES, label: 'Resumes' },
    { id: VIEWS.ANALYTICS, label: 'Analytics' },
    { id: VIEWS.INTERVIEWS, label: 'Interviews' },
  ];

  return (
    <header className="h-14 bg-jobflow-bg border-b border-jobflow-border flex items-center justify-between px-4 z-40 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onToggleSidebar} className="p-1.5 text-jobflow-text-dim hover:text-jobflow-accent rounded-lg transition-all shrink-0" title="Toggle sidebar">
          <PanelLeft size={16} />
        </button>
        <h1 className="text-base font-bold text-jobflow-text tracking-tight uppercase shrink-0">JobFlow <span className="text-jobflow-accent italic font-bold">AI</span></h1>
        
        <nav className="flex items-center gap-1 h-14">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onViewChange(tab.id)}
              className={`h-full px-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-all relative group ${
                currentView === tab.id ? 'text-jobflow-accent' : 'text-jobflow-text-dim hover:text-jobflow-text'
              }`}
            >
              {tab.label}
              {currentView === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-jobflow-accent"></div>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button onClick={onThemeToggle} className="p-2 text-jobflow-text-dim hover:text-jobflow-accent bg-jobflow-card border border-jobflow-border rounded-lg transition-all">
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <button className="p-2 text-jobflow-text-dim hover:text-jobflow-accent bg-jobflow-card border border-jobflow-border rounded-lg transition-all relative">
          <Bell size={15} />
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full border-2 border-jobflow-card"></div>
        </button>

        <div className="flex items-center gap-1.5 pl-3 border-l border-jobflow-border/50">
          <div className="w-7 h-7 bg-jobflow-accent/10 rounded-lg border border-jobflow-accent/20 flex items-center justify-center text-jobflow-accent">
            <User size={14} />
          </div>
          <span className="text-[11px] font-semibold text-jobflow-text">Jagadishwar Reddy</span>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
