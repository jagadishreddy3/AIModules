import React from 'react';
import { TrendingUp, Clock, Target, Calendar, Sparkles, ChevronRight, MapPin } from 'lucide-react';
import { formatDate } from '../utils/date';

const DashboardView = ({ jobs }) => {
  const recentJobs = [...jobs].sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied)).slice(0, 4);

  return (
    <div className="flex flex-col h-full bg-jobflow-bg/30 animate-fade-in overflow-y-auto custom-scrollbar">
      <div className="px-10 py-8 border-b border-jobflow-border/50 sticky top-0 bg-jobflow-bg/80 backdrop-blur-sm z-10">
        <h2 className="text-3xl font-black text-jobflow-text tracking-tight">Main Dashboard</h2>
        <p className="text-[10px] font-black text-jobflow-text-dim uppercase tracking-[0.3em] mt-2 border border-jobflow-border px-2 py-1 rounded-md inline-block">
          AI Pulse: Optimized
        </p>
      </div>

      <div className="p-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <MetricCard label="Total Applications" value={jobs.length} change="+12%" icon={Target} />
          <MetricCard label="Active Interviews" value={jobs.filter(j => j.status === 'interviews').length} change="+2" color="text-jobflow-accent" icon={Calendar} />
          <MetricCard label="Response Rate" value="24%" change="+4.1%" icon={TrendingUp} />
          <MetricCard label="AI Match Score" value="91" change="+2%" icon={Sparkles} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          <div className="xl:col-span-2 space-y-6">
            <h3 className="font-black text-jobflow-text uppercase text-xs tracking-widest flex items-center gap-3">
              <Clock size={16} className="text-jobflow-accent" /> Recent Activity
            </h3>
            <div className="grid gap-4">
              {recentJobs.map(job => (
                <div key={job.id} className="bg-jobflow-card border border-jobflow-border p-5 rounded-[24px] flex items-center justify-between group hover:border-jobflow-accent/40 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-jobflow-bg border border-jobflow-border rounded-xl flex items-center justify-center text-jobflow-text font-black">
                      {job.company[0]}
                    </div>
                    <div>
                      <h4 className="font-black text-xs text-jobflow-text group-hover:text-jobflow-accent transition-all">{job.company}</h4>
                      <p className="text-[10px] text-jobflow-text-dim flex items-center gap-1 mt-0.5"><MapPin size={10}/> {job.location || 'Remote'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                     <span className="text-[10px] font-bold text-jobflow-text-dim uppercase tracking-widest">{formatDate(job.dateApplied)}</span>
                     <div className="px-3 py-1 bg-jobflow-bg border border-jobflow-border rounded-lg text-[9px] font-black uppercase text-jobflow-text tracking-widest transition-all group-hover:bg-jobflow-accent group-hover:text-white">Applied</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 border border-dashed border-jobflow-border rounded-2xl text-[10px] font-black text-jobflow-text-dim uppercase tracking-widest hover:border-jobflow-accent hover:text-jobflow-accent transition-all">
              View Application History
            </button>
          </div>

          <div className="bg-jobflow-card border border-jobflow-border rounded-[32px] p-8 flex flex-col justify-between overflow-hidden relative group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                <Sparkles size={128} />
             </div>
             <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-jobflow-accent rounded-xl text-white">
                    <Target size={16} />
                  </div>
                  <span className="text-[10px] font-black text-jobflow-text-dim uppercase tracking-widest">JobFlow AI Match</span>
                </div>
                <h4 className="text-xl font-black text-jobflow-text mb-4">Recommended for you:</h4>
                <div className="space-y-4 mb-8">
                   {[
                     { name: 'Anthropic', role: 'Staff SDE', match: '98%' },
                     { name: 'Linear', role: 'Frontend Lead', match: '94%' },
                     { name: 'Vercel', role: 'DX Engineer', match: '92%' },
                   ].map((m, i) => (
                     <div key={i} className="flex items-center justify-between p-3 bg-jobflow-bg/50 border border-jobflow-border/50 rounded-xl hover:border-jobflow-accent/40 transition-all cursor-pointer">
                        <div>
                           <p className="text-xs font-black text-jobflow-text leading-none mb-1">{m.name}</p>
                           <p className="text-[9px] font-bold text-jobflow-text-dim uppercase tracking-widest">{m.role}</p>
                        </div>
                        <span className="text-[10px] font-black text-jobflow-accent">{m.match}</span>
                     </div>
                   ))}
                </div>
             </div>
             <button className="w-full py-4 bg-jobflow-accent hover:bg-jobflow-accent/80 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-jobflow-accent/20 transition-all flex items-center justify-center gap-2">
                Analyze Matches <ChevronRight size={14} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, change, icon: Icon, color = "text-jobflow-text" }) => (
  <div className="bg-jobflow-card border border-jobflow-border p-6 rounded-[32px] hover:border-jobflow-accent/30 transition-all group shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2.5 bg-jobflow-bg border border-jobflow-border rounded-xl text-jobflow-text-dim group-hover:text-jobflow-accent transition-all">
        <Icon size={18} />
      </div>
      <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">{change}</span>
    </div>
    <div className="space-y-1">
       <span className={`text-4xl font-black ${color} tracking-tighter`}>{value}</span>
       <p className="text-[10px] font-bold text-jobflow-text-dim uppercase tracking-[0.1em]">{label}</p>
    </div>
  </div>
);

export default DashboardView;
