import React from 'react';
import { TrendingUp, Clock, Target, Calendar, Sparkles, MapPin } from 'lucide-react';
import { formatDate } from '../utils/date';

const DashboardView = ({ jobs }) => {
  const recentJobs = [...jobs].sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied)).slice(0, 3);

  const total = jobs.length;
  const activeInterviews = jobs.filter(j => j.status === 'interviews').length;
  const responded = jobs.filter(j => ['screening', 'interviews', 'offer'].includes(j.status)).length;
  const applied = jobs.filter(j => j.status !== 'wishlist' && j.status !== 'closed').length;
  const responseRate = applied > 0 ? Math.round((responded / applied) * 100) : 0;
  const stageWeights = { wishlist: 10, applied: 30, screening: 50, interviews: 70, offer: 95, closed: 0 };
  const aiMatchScore = total > 0 ? Math.round(jobs.reduce((sum, j) => sum + (stageWeights[j.status] || 0), 0) / total) : 0;

  return (
    <div className="flex flex-col h-full bg-jobflow-bg/30 animate-fade-in overflow-hidden">
      <div className="px-5 py-3 border-b border-jobflow-border/50 shrink-0 bg-jobflow-bg/80 backdrop-blur-sm z-10">
        <h2 className="text-xl font-bold text-jobflow-text tracking-tight">Main Dashboard</h2>
      </div>

      <div className="p-5 space-y-4 overflow-hidden flex-1">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
          <MetricCard label="Total Applications" value={total} change={total > 0 ? `${total}` : '0'} icon={Target} />
          <MetricCard label="Active Interviews" value={activeInterviews} change={activeInterviews > 0 ? `+${activeInterviews}` : '0'} color="text-jobflow-accent" icon={Calendar} />
          <MetricCard label="Response Rate" value={`${responseRate}%`} change={responseRate > 0 ? `+${responseRate}%` : '0%'} icon={TrendingUp} />
          <MetricCard label="AI Match Score" value={aiMatchScore} change={aiMatchScore > 0 ? `+${aiMatchScore}` : '0'} icon={Sparkles} />
        </div>

        <div className="flex-1 min-h-0 flex flex-col gap-3">
          <h3 className="font-bold text-jobflow-text uppercase text-xs tracking-widest flex items-center gap-2 shrink-0">
            <Clock size={14} className="text-jobflow-accent" /> Recent Activity
          </h3>
          <div className="grid gap-2 flex-1 min-h-0">
            {recentJobs.map(job => (
              <div key={job.id} className="bg-jobflow-card border border-jobflow-border p-3 rounded-2xl flex items-center justify-between group hover:border-jobflow-accent/40 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-jobflow-bg border border-jobflow-border rounded-lg flex items-center justify-center text-jobflow-text font-bold text-sm">
                    {job.company[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-jobflow-text group-hover:text-jobflow-accent transition-all">{job.company}</h4>
                    <p className="text-[11px] text-jobflow-text-dim flex items-center gap-1"><MapPin size={10}/> {job.location || 'Remote'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <span className="text-[11px] font-medium text-jobflow-text-dim uppercase tracking-wider">{formatDate(job.dateApplied)}</span>
                   <div className="px-2 py-0.5 bg-jobflow-bg border border-jobflow-border rounded-md text-[10px] font-semibold uppercase text-jobflow-text tracking-wider transition-all group-hover:bg-jobflow-accent group-hover:text-white">Applied</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-2.5 border border-dashed border-jobflow-border rounded-xl text-[11px] font-semibold text-jobflow-text-dim uppercase tracking-wider hover:border-jobflow-accent hover:text-jobflow-accent transition-all shrink-0">
            View Application History
          </button>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, change, icon: Icon, color = "text-jobflow-text" }) => (
  <div className="bg-jobflow-card border border-jobflow-border p-4 rounded-2xl hover:border-jobflow-accent/30 transition-all group shadow-sm">
    <div className="flex justify-between items-start mb-2">
      <div className="p-2 bg-jobflow-bg border border-jobflow-border rounded-lg text-jobflow-text-dim group-hover:text-jobflow-accent transition-all">
        <Icon size={16} />
      </div>
      <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">{change}</span>
    </div>
    <div className="space-y-0.5">
       <span className={`text-2xl font-bold ${color} tracking-tight`}>{value}</span>
       <p className="text-[11px] font-medium text-jobflow-text-dim uppercase tracking-[0.05em]">{label}</p>
    </div>
  </div>
);

export default DashboardView;
