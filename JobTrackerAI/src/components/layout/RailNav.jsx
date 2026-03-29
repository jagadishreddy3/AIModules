import React from 'react';
import { LayoutGrid, Briefcase, BarChart3, FileText, Calendar, Settings, HelpCircle, Bot } from 'lucide-react';
import { VIEWS } from '../../constants/columns';

const RailNav = ({ currentView, onViewChange }) => {
  const items = [
    { id: VIEWS.DASHBOARD, icon: LayoutGrid, label: 'Dashboard' },
    { id: VIEWS.APPLICATIONS, icon: Briefcase, label: 'Applications' },
    { id: VIEWS.ANALYTICS, icon: BarChart3, label: 'Analytics' },
    { id: VIEWS.RESUMES, icon: FileText, label: 'Resumes' },
    { id: VIEWS.INTERVIEWS, icon: Calendar, label: 'Interviews' },
  ];

  return (
    <nav className="w-20 flex flex-col items-center py-8 bg-jobflow-sidebar border-r border-jobflow-border h-full z-50">
      <div className="mb-10 text-jobflow-accent">
        <div className="w-10 h-10 bg-jobflow-accent/20 rounded-xl flex items-center justify-center border border-jobflow-accent/30 scale-110">
          <div className="w-5 h-5 bg-jobflow-accent rounded-sm rotate-45"></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`p-3.5 rounded-2xl transition-all duration-300 group relative ${
              currentView === item.id 
                ? 'bg-jobflow-accent text-white shadow-lg shadow-jobflow-accent/20' 
                : 'text-jobflow-text-dim hover:text-jobflow-text hover:bg-jobflow-card'
            }`}
            title={item.label}
          >
            <item.icon size={22} strokeWidth={2.5} />
            {currentView === item.id && (
              <span className="absolute left-[-4px] top-1/4 bottom-1/4 w-1 bg-white rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-6">
        <button className="p-3.5 rounded-2xl text-jobflow-text-dim hover:text-jobflow-accent transition-all">
          <Bot size={22} strokeWidth={2} />
        </button>
        <button className="p-3.5 rounded-2xl text-jobflow-text-dim hover:text-jobflow-text transition-all">
          <Settings size={22} strokeWidth={2} />
        </button>
      </div>
    </nav>
  );
};

export default RailNav;
