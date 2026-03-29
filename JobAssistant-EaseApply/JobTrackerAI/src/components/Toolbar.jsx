import React from 'react';
import { Plus, Download, Upload, Briefcase } from 'lucide-react';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

const Toolbar = ({ onAdd, onExport, onImport, searchValue, onSearchChange }) => {
  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Briefcase size={24} />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-none">
            JobTracker<span className="text-blue-600 italic">AI</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Local-First Kanban</p>
        </div>
      </div>

      <div className="flex-1 max-w-xl px-12">
        <SearchBar value={searchValue} onChange={onSearchChange} />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onExport}
          className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          title="Export JSON Backup"
        >
          <Download size={20} />
        </button>
        
        <label className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer" title="Import JSON Backup">
          <Upload size={20} />
          <input type="file" accept=".json" onChange={handleImport} className="hidden" />
        </label>

        <ThemeToggle />

        <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-1"></div>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all text-sm"
        >
          <Plus size={18} />
          Add Job
        </button>
      </div>
    </header>
  );
};

export default Toolbar;
