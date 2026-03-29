import React from 'react';
import { Search, Bell, User, Moon, Sun, ChevronDown } from 'lucide-react';
import { VIEWS } from '../../constants/columns';

const TopNav = ({ currentView, onViewChange, theme, onThemeToggle }) => {
  const categories = [
    { id: VIEWS.DASHBOARD, label: 'Dashboard' },
    { id: VIEWS.APPLICATIONS, label: 'Applications' },
    { id: VIEWS.ANALYTICS, label: 'Analytics' },
    { id: VIEWS.RESUMES, label: 'Resumes' },
    { id: VIEWS.INTERVIEWS, label: 'Interviews' },
  ];

  return (
    <header className="h-20 bg-jobflow-bg border-b border-jobflow-border flex items-center justify-between px-8 z-40">
      <div className="flex items-center gap-12">
        <h1 className="text-xl font-black tracking-tight text-jobflow-text flex items-center gap-2">
          <span>JobFlow</span>
          <span className="text-jobflow-accent">AI</span>
        </h1>

        <nav className="flex items-center gap-2 bg-jobflow-card/50 p-1 rounded-xl border border-jobflow-border backdrop-blur-sm">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onViewChange(cat.id)}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                currentView === cat.id 
                  ? 'bg-jobflow-accent text-white shadow-md' 
                  : 'text-jobflow-text-dim hover:text-jobflow-text hover:bg-jobflow-card'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-3 bg-jobflow-card px-4 py-2 rounded-xl border border-jobflow-border group focus-within:border-jobflow-accent transition-all min-w-[300px]">
          <Search size={18} className="text-jobflow-text-dim group-focus-within:text-jobflow-accent" />
          <input 
            type="text" 
            placeholder="Search jobs, resumes..." 
            className="bg-transparent border-none outline-none text-sm w-full text-jobflow-text placeholder:text-jobflow-text-dim"
          />
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onThemeToggle} className="p-2.5 bg-jobflow-card rounded-xl border border-jobflow-border text-jobflow-text-dim hover:text-jobflow-accent transition-all relative">
            {theme === 'dark' ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
          </button>
          <button className="p-2.5 bg-jobflow-card rounded-xl border border-jobflow-border text-jobflow-text-dim hover:text-jobflow-accent transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-jobflow-card"></span>
          </button>
        </div>

        <div className="h-10 w-px bg-jobflow-border mx-2"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-jobflow-accent/20 rounded-xl flex items-center justify-center border border-jobflow-accent/30 text-jobflow-accent font-bold">
            RK
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-jobflow-text">Rohit Kumar</p>
            <p className="text-[10px] text-jobflow-text-dim flex items-center gap-1 group-hover:text-jobflow-accent transition-all font-bold uppercase tracking-widest">
              Standard Plan <ChevronDown size={10} />
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
