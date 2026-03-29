import React from 'react';
import { TrendingUp, Users, Target, Zap, ChevronRight, Sparkles } from 'lucide-react';
import { COLUMNS, VIEWS } from '../../constants/columns';

const Sidebar = ({ jobs, currentView }) => {
  const stats = COLUMNS.map(col => ({
    ...col,
    count: jobs.filter(j => j.status === col.id).length
  }));

  const companiesList = [...new Set(jobs.map(j => j.company))].slice(0, 6).map(name => ({
    name,
    count: jobs.filter(j => j.company === name).length
  }));

  return (
    <aside className="w-80 bg-jobflow-sidebar border-r border-jobflow-border flex flex-col h-full overflow-y-auto custom-scrollbar p-6 transition-all duration-300">
      <div className="space-y-8 animate-fade-in">
        {/* OVERVIEW SECTION */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-jobflow-text-dim mb-6 flex items-center justify-between">
            <span>Overview</span>
            <span className="text-jobflow-accent cursor-pointer hover:underline lowercase tracking-normal font-bold">View all</span>
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-jobflow-card p-4 rounded-2xl border border-jobflow-border hover:border-jobflow-accent/30 transition-all group">
              <span className="text-3xl font-black block mb-1">{jobs.length}</span>
              <span className="text-[9px] font-bold text-jobflow-text-dim uppercase tracking-widest block mb-2">Applied</span>
              <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                <TrendingUp size={10} /> <span>+3 this week</span>
              </div>
            </div>
            <div className="bg-jobflow-card p-4 rounded-2xl border border-jobflow-border hover:border-jobflow-accent/30 transition-all">
              <span className="text-3xl font-black block mb-1">{jobs.filter(j => j.status === 'interviews').length}</span>
              <span className="text-[9px] font-bold text-jobflow-text-dim uppercase tracking-widest block mb-2">Interviews</span>
              <div className="flex items-center gap-1 text-[10px] text-blue-500 font-bold">
                <TrendingUp size={10} /> <span>+2 scheduled</span>
              </div>
            </div>
            <div className="bg-jobflow-card p-4 rounded-2xl border border-jobflow-border hover:border-jobflow-accent/30 transition-all">
              <span className="text-3xl font-black block mb-1">{jobs.filter(j => j.status === 'offer').length}</span>
              <span className="text-[9px] font-bold text-jobflow-text-dim uppercase tracking-widest block mb-2">Offers</span>
              <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                <TrendingUp size={10} /> <span>+1 new</span>
              </div>
            </div>
            <div className="bg-jobflow-card p-4 rounded-2xl border border-jobflow-border hover:border-jobflow-accent/30 transition-all">
              <span className="text-3xl font-black block mb-1">91%</span>
              <span className="text-[9px] font-bold text-jobflow-text-dim uppercase tracking-widest block mb-2">Avg Match</span>
              <div className="flex items-center gap-1 text-[10px] text-blue-500 font-bold">
                <TrendingUp size={10} /> <span>+4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* COMPANIES LIST */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-jobflow-text-dim mb-4">Companies</h3>
          <div className="space-y-1">
            {companiesList.length > 0 ? companiesList.map((company, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-xl hover:bg-jobflow-card transition-all cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${COLUMNS[index % COLUMNS.length].color}`}></div>
                  <span className="text-xs font-bold text-jobflow-text group-hover:text-jobflow-accent transition-all">{company.name}</span>
                </div>
                <span className="text-[10px] font-bold text-jobflow-text-dim">{company.count}</span>
              </div>
            )) : <p className="text-[10px] text-jobflow-text-dim italic px-2">No companies yet</p>}
          </div>
        </div>

        {/* AI INSIGHTS */}
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-jobflow-accent/20 rounded-2xl p-5 relative overflow-hidden group hover:from-blue-600/30 hover:to-purple-600/30 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 translate-x-1 translate-y--1 transition-all">
            <Sparkles size={64} />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-jobflow-accent rounded-lg text-white">
              <Target size={14} />
            </div>
            <span className="text-xs font-black text-white tracking-wide">AI Recommendation</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed font-medium mb-4">
            Analysis of <strong>Stripe</strong> role shows a strong profile match. Suggesting tailored resume adjustments.
          </p>
          <button className="w-full py-2 bg-jobflow-accent hover:bg-jobflow-accent/80 text-white rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-jobflow-accent/20">
            View Analytics <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
