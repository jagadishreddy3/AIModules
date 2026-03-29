import React from 'react';
import { TrendingUp, Target, Sparkles, ChevronRight } from 'lucide-react';
import { COLUMNS, VIEWS } from '../../constants/columns';

const Sidebar = ({ jobs, currentView }) => {
  const companiesList = [...new Set(jobs.map(j => j.company))].slice(0, 6).map(name => ({
    name,
    count: jobs.filter(j => j.company === name).length
  }));

  const renderContent = () => {
    switch(currentView) {
      case VIEWS.INTERVIEWS:
        return (
          <div className="space-y-6">
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-jobflow-text-dim mb-4">Preparation Checklist</h3>
             {['Review Technical Specs', 'Behavioral Practice', 'Portfolio Walkthrough'].map((item, i) => (
               <div key={i} className="bg-jobflow-card p-4 rounded-xl border border-jobflow-border flex items-center justify-between group cursor-pointer hover:border-jobflow-accent transition-all">
                  <span className="text-[10px] font-bold text-jobflow-text">{item}</span>
                  <div className="w-4 h-4 rounded border border-jobflow-border group-hover:border-jobflow-accent"></div>
               </div>
             ))}
          </div>
        );
      default:
        return (
          <>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-jobflow-text-dim mb-6">Overview</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-jobflow-card p-4 rounded-2xl border border-jobflow-border">
                  <span className="text-3xl font-black block mb-1">{jobs.length}</span>
                  <span className="text-[9px] font-bold text-jobflow-text-dim uppercase tracking-widest block">Jobs</span>
                </div>
                <div className="bg-jobflow-card p-4 rounded-2xl border border-jobflow-border">
                  <span className="text-3xl font-black block mb-1">{jobs.filter(j => j.status === 'interviews').length}</span>
                  <span className="text-[9px] font-bold text-jobflow-text-dim uppercase tracking-widest block">Interviews</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-jobflow-text-dim mb-4">Top Companies</h3>
              <div className="space-y-1">
                {companiesList.map((company, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-xl hover:bg-jobflow-card transition-all cursor-pointer group">
                    <span className="text-xs font-bold text-jobflow-text group-hover:text-jobflow-accent transition-all">{company.name}</span>
                    <span className="text-[10px] font-bold text-jobflow-text-dim">{company.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <aside className="w-80 bg-jobflow-sidebar border-r border-jobflow-border flex flex-col h-full overflow-y-auto custom-scrollbar p-6 shrink-0 transition-all duration-300">
      <div className="space-y-8 animate-fade-in">
        {renderContent()}

        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-jobflow-accent/20 rounded-2xl p-5 relative overflow-hidden group hover:from-blue-600/30 hover:to-purple-600/30 transition-all mt-auto">
          <div className="flex items-center gap-2 mb-3">
             <div className="p-1.5 bg-jobflow-accent rounded-lg text-white"><Target size={14} /></div>
             <span className="text-xs font-black text-white uppercase tracking-widest">AI Hub</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed font-medium mb-4">
             Unlock insights with **JobFlow Pro**. Tailor resumes and track conversion rates.
          </p>
          <button className="w-full py-2 bg-jobflow-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
             Go Pro <Sparkles size={12} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
