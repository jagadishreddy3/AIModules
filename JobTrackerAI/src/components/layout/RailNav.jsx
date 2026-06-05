import React from 'react';
import { LayoutDashboard, Briefcase, FileText, BarChart2, Calendar, Settings, MessageSquare } from 'lucide-react';
import { VIEWS } from '../../constants/columns';

const RailNav = ({ currentView, onViewChange, onOpenSettings, onOpenChat }) => {
  const items = [
    { id: VIEWS.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
    { id: VIEWS.APPLICATIONS, icon: Briefcase, label: 'Applications' },
    { id: VIEWS.RESUMES, icon: FileText, label: 'Resumes' },
    { id: VIEWS.ANALYTICS, icon: BarChart2, label: 'Analytics' },
    { id: VIEWS.INTERVIEWS, icon: Calendar, label: 'Interviews' },
  ];

  return (
    <nav className="w-16 bg-jobflow-sidebar border-r border-jobflow-border flex flex-col items-center py-6 gap-8 z-50 shrink-0 h-full min-h-screen">
      <div className="w-9 h-9 bg-jobflow-accent rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-jobflow-accent/20 cursor-pointer hover:rotate-12 transition-all">
        J
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`group relative p-3 rounded-2xl transition-all duration-300 ${
              currentView === item.id 
                ? 'bg-jobflow-accent text-white shadow-lg shadow-jobflow-accent/30' 
                : 'text-jobflow-text-dim hover:text-jobflow-text hover:bg-jobflow-card'
            }`}
            title={item.label}
          >
            <item.icon size={20} className={currentView === item.id ? 'animate-pulse' : ''} />
            {currentView === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-2">
                 <div className="w-1 h-4 bg-jobflow-accent rounded-r-full"></div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 pt-6 border-t border-jobflow-border/50">
        <button
          onClick={onOpenSettings}
          className="p-3 text-jobflow-text-dim hover:text-jobflow-text hover:bg-jobflow-card rounded-2xl transition-all"
          title="LLM Settings"
        >
          <Settings size={20} />
        </button>
        <button
          onClick={onOpenChat}
          className="p-3 text-jobflow-text-dim hover:text-jobflow-text hover:bg-jobflow-card rounded-2xl transition-all"
          title="AI Chat"
        >
          <MessageSquare size={20} />
        </button>
      </div>
    </nav>
  );
};

export default RailNav;
