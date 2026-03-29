import React from 'react';
import { TrendingUp, Users, Target, Zap, ArrowRight, Star, Clock } from 'lucide-react';
import { COLUMNS } from '../constants/columns';

const DashboardView = ({ jobs }) => {
  const metrics = [
    { label: 'Total Applied', value: jobs.length, trend: '+12%', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Interviews', value: jobs.filter(j => j.status === 'interviews').length, trend: '+3', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { label: 'Offers', value: jobs.filter(j => j.status === 'offer').length, trend: '+1', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Avg Match', value: '88%', trend: '+5%', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  const recentJobs = [...jobs].sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied)).slice(0, 4);

  return (
    <div className="p-10 animate-fade-in h-full overflow-y-auto custom-scrollbar">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-jobflow-text mb-2 tracking-tight">Welcome back, Rohit!</h2>
        <p className="text-sm text-jobflow-text-dim font-medium tracking-wide">You have <span className="text-jobflow-accent">3 new matches</span> and 2 upcoming interviews this week.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {metrics.map((m, i) => (
          <div key={i} className="bg-jobflow-card p-6 rounded-3xl border border-jobflow-border hover:border-jobflow-accent/30 transition-all group overflow-hidden relative">
            <span className="text-[10px] font-black text-jobflow-text-dim uppercase tracking-[0.2em] block mb-4">{m.label}</span>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-black text-jobflow-text">{m.value}</span>
              <div className={`flex items-center gap-1 text-[11px] font-bold ${m.color} py-1 px-2 rounded-lg bg-jobflow-bg border border-jobflow-border`}>
                <TrendingUp size={12} /> {m.trend}
              </div>
            </div>
            {/* Abstract Background Curve */}
            <div className={`absolute bottom-[-10px] right-[-10px] w-24 h-24 ${m.bg} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all`}></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-black text-jobflow-text flex items-center gap-2">
              <Clock size={20} className="text-jobflow-accent" /> Recent Activity
            </h3>
            <button className="text-[10px] font-black text-jobflow-accent border border-jobflow-accent/20 px-3 py-1.5 rounded-lg hover:bg-jobflow-accent hover:text-white transition-all">VIEW STATUS</button>
          </div>
          
          <div className="space-y-4">
            {recentJobs.length > 0 ? recentJobs.map((job) => (
              <div key={job.id} className="bg-jobflow-card/50 backdrop-blur-sm border border-jobflow-border p-5 rounded-3xl hover:bg-jobflow-card transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-jobflow-bg rounded-2xl flex items-center justify-center border border-jobflow-border text-jobflow-accent font-bold group-hover:bg-jobflow-accent group-hover:text-white transition-all shadow-sm">
                    {job.company[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-jobflow-text text-sm mb-0.5">{job.role}</h4>
                    <p className="text-[11px] text-jobflow-text-dim font-bold uppercase tracking-wider">{job.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="hidden sm:block">
                    <span className="text-[10px] font-bold text-jobflow-text-dim uppercase tracking-widest block mb-1">Status</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${COLUMNS.find(c => c.id === job.status)?.bg || 'bg-slate-500/10'} ${COLUMNS.find(c => c.id === job.status)?.text || 'text-slate-500'}`}>
                      {job.status}
                    </span>
                  </div>
                  <button className="p-2.5 bg-jobflow-bg rounded-xl border border-jobflow-border text-jobflow-text-dim hover:text-jobflow-accent hover:border-jobflow-accent transition-all">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )) : <p className="text-sm text-jobflow-text-dim px-2 italic">No recent applications.</p>}
          </div>
        </div>

        {/* AI Matches */}
        <div className="space-y-6">
          <h3 className="text-lg font-black text-jobflow-text px-2 flex items-center gap-2">
            <Star size={20} className="text-amber-400" /> AI Matches
          </h3>
          <div className="bg-jobflow-card border border-jobflow-border p-6 rounded-3xl relative overflow-hidden group">
             <div className="relative z-10">
               <div className="flex items-center justify-between mb-6">
                 <div className="p-2 bg-amber-400/10 rounded-xl text-amber-400">
                    <Target size={20} />
                 </div>
                 <span className="text-xl font-black text-amber-400">94%</span>
               </div>
               <h4 className="font-black text-jobflow-text mb-2">Staff Engineer - Anthropic</h4>
               <p className="text-xs text-jobflow-text-dim leading-relaxed font-medium mb-6">
                 Your background in <strong>Rust</strong> and <strong>distributed systems</strong> is a 94% match for this role.
               </p>
               <button className="w-full py-3 bg-jobflow-bg border border-jobflow-border hover:border-amber-400/50 text-jobflow-text text-[10px] font-black uppercase tracking-[0.1em] rounded-2xl transition-all">
                 Tailor Resume
               </button>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
