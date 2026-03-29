import React from 'react';
import { BarChart3, PieChart, Target, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { COLUMNS } from '../constants/columns';

const AnalyticsView = ({ jobs }) => {
  const stats = COLUMNS.map(col => ({
    ...col,
    count: jobs.filter(j => j.status === col.id).length,
    percentage: jobs.length > 0 ? (jobs.filter(j => j.status === col.id).length / jobs.length) * 100 : 0
  }));

  const interviewRate = (jobs.filter(j => ['interviews', 'offer'].includes(j.status)).length / jobs.length * 100) || 0;
  const offerSuccess = (jobs.filter(j => j.status === 'offer').length / jobs.length * 100) || 0;

  return (
    <div className="p-10 animate-fade-in h-full overflow-y-auto custom-scrollbar">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-jobflow-text mb-2 tracking-tight">Analytics Deep-Dive</h2>
          <p className="text-sm text-jobflow-text-dim font-medium tracking-wide">Data-driven performance tracking of your job hunt.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-jobflow-card px-4 py-3 rounded-2xl border border-jobflow-border flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><TrendingUp size={16}/></div>
              <div>
                <p className="text-[9px] font-bold text-jobflow-text-dim uppercase tracking-wider">Success Rate</p>
                <p className="text-sm font-black text-emerald-500">+12% vs last mo</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Status Distribution */}
        <div className="bg-jobflow-card border border-jobflow-border p-8 rounded-[40px] relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-jobflow-text flex items-center gap-3">
              <PieChart size={24} className="text-jobflow-accent" /> Pipeline Distribution
            </h3>
            <span className="text-[10px] font-black text-jobflow-text-dim uppercase tracking-widest bg-jobflow-bg px-3 py-1.5 rounded-xl border border-jobflow-border">Real-time</span>
          </div>
          
          <div className="space-y-5">
            {stats.map((stat) => (
              <div key={stat.id} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${stat.color} shadow-lg shadow-current/20`}></div>
                    <span className="text-xs font-black text-jobflow-text tracking-tight">{stat.label}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-black text-jobflow-text">{stat.count}</span>
                    <span className="text-[10px] font-bold text-jobflow-text-dim uppercase">{stat.percentage.toFixed(0)}%</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-jobflow-bg rounded-full overflow-hidden border border-jobflow-border p-0.5">
                  <div 
                    className={`h-full ${stat.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${stat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="space-y-8">
           <div className="bg-jobflow-card border border-jobflow-border p-8 rounded-[40px] flex items-center justify-between group hover:border-jobflow-accent/30 transition-all">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-jobflow-text-dim uppercase tracking-[0.2em] block">Interview Conversion</span>
                <span className="text-5xl font-black text-jobflow-text tracking-tighter">{interviewRate.toFixed(0)}%</span>
                <p className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
                   <TrendingUp size={12} /> Positive growth this month
                </p>
              </div>
              <div className="w-24 h-24 bg-jobflow-accent/10 rounded-full flex items-center justify-center border-4 border-jobflow-accent shadow-xl shadow-jobflow-accent/10">
                 <Target size={40} className="text-jobflow-accent" />
              </div>
           </div>

           <div className="bg-jobflow-card border border-jobflow-border p-8 rounded-[40px] flex items-center justify-between group hover:border-emerald-500/30 transition-all">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-jobflow-text-dim uppercase tracking-[0.2em] block">Offer Success Rate</span>
                <span className="text-5xl font-black text-jobflow-text tracking-tighter">{offerSuccess.toFixed(0)}%</span>
                <p className="text-[11px] text-jobflow-text-dim font-bold flex items-center gap-1 italic">
                   Based on {jobs.length} total apps
                </p>
              </div>
              <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center border-4 border-emerald-500 shadow-xl shadow-emerald-500/10">
                 <Zap size={40} className="text-emerald-500" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
