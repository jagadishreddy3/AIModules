import React from 'react';
import { BarChart, PieChart, Activity, TrendingUp, Target, Briefcase, ChevronRight } from 'lucide-react';

const AnalyticsView = ({ jobs }) => {
  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const total = jobs.length;
  const appliedCount = jobs.filter(j => j.status !== 'wishlist').length;
  const successApps = jobs.filter(j => ['screening', 'interviews', 'offer'].includes(j.status)).length;
  const appSuccess = appliedCount > 0 ? Math.round((successApps / appliedCount) * 100) : 0;
  const interviewCount = jobs.filter(j => j.status === 'interviews' || j.status === 'offer').length;
  const offerCount = statusCounts.offer || 0;
  const interviewPass = interviewCount > 0 ? Math.round((offerCount / interviewCount) * 100) : 0;
  const stageMap = { wishlist: 0, applied: 1, screening: 2, interviews: 3, offer: 4, closed: 0 };
  const avgRounds = total > 0 ? (jobs.reduce((sum, j) => sum + (stageMap[j.status] || 0), 0) / total).toFixed(1) : '0.0';
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const monthlyApps = jobs.filter(j => new Date(j.dateApplied) >= thirtyDaysAgo).length;

  const stats = [
    { label: 'Wishlist', count: statusCounts.wishlist || 0, color: 'bg-purple-500' },
    { label: 'Applied', count: statusCounts.applied || 0, color: 'bg-blue-500' },
    { label: 'Screening', count: statusCounts.screening || 0, color: 'bg-amber-500' },
    { label: 'Interviews', count: statusCounts.interviews || 0, color: 'bg-cyan-500' },
    { label: 'Offer', count: statusCounts.offer || 0, color: 'bg-emerald-500' },
  ];

  const maxCount = Math.max(...stats.map(s => s.count), 1);

  return (
    <div className="flex flex-col h-full bg-jobflow-bg/30 animate-fade-in overflow-hidden">
      <div className="px-5 py-3 border-b border-jobflow-border/50 shrink-0 bg-jobflow-bg/80 backdrop-blur-sm z-10">
        <h2 className="text-xl font-bold text-jobflow-text tracking-tight">Performance Analytics</h2>
        <p className="text-[11px] font-semibold text-jobflow-text-dim uppercase tracking-[0.15em] mt-1 border border-jobflow-border px-2 py-0.5 rounded-md inline-block">
          Pipeline Evolution
        </p>
      </div>

      <div className="p-5 space-y-4 overflow-hidden flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
           <div className="bg-jobflow-card border border-jobflow-border rounded-2xl p-5 flex flex-col">
             <div className="flex items-center justify-between mb-4 shrink-0">
               <div>
                  <h3 className="font-bold text-jobflow-text text-base mb-0.5">Pipeline Distribution</h3>
                  <p className="text-[11px] font-medium text-jobflow-text-dim uppercase tracking-wider">Real-time Stage Analysis</p>
               </div>
               <BarChart className="text-jobflow-accent" size={20} />
            </div>
            
            <div className="space-y-3 flex-1">
              {stats.map(stat => (
                <div key={stat.label} className="space-y-1.5 group">
                   <div className="flex justify-between items-end">
                      <span className="text-[11px] font-semibold text-jobflow-text uppercase tracking-[0.1em] group-hover:text-jobflow-accent transition-all">{stat.label}</span>
                      <span className="text-xs font-semibold text-jobflow-text">{stat.count} <span className="text-[10px] text-jobflow-text-dim font-medium ml-0.5">({Math.round(stat.count/jobs.length*100 || 0)}%)</span></span>
                   </div>
                   <div className="h-2 bg-jobflow-bg rounded-full overflow-hidden border border-jobflow-border/50">
                      <div 
                        className={`h-full ${stat.color} rounded-full shadow-sm transition-all duration-700 ease-out`} 
                        style={{ width: `${(stat.count / maxCount) * 100}%` }}
                      ></div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 content-start">
             <MetricBox title="App Success" value={`${appSuccess}%`} sub="To Screen" icon={Activity} />
             <MetricBox title="Interview Pass" value={`${interviewPass}%`} sub="To Offer" icon={Target} color="text-emerald-500" />
             <MetricBox title="Avg Rounds" value={avgRounds} sub="Per App" icon={TrendingUp} color="text-purple-500" />
             <MetricBox title="Monthly" value={`+${monthlyApps}`} sub="New Apps" icon={Briefcase} color="text-blue-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-jobflow-card to-jobflow-bg border border-jobflow-border rounded-2xl p-5 text-center relative overflow-hidden group shrink-0">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-jobflow-accent to-transparent opacity-20 group-hover:opacity-100 transition-all"></div>
           <h3 className="text-base font-bold text-jobflow-text mb-1">Unlock Predictive Analytics</h3>
           <p className="text-[11px] text-jobflow-text-dim max-w-lg mx-auto mb-4 leading-relaxed font-medium">
             Our AI engine can predict which companies are most likely to respond based on your historical success patterns and live market data.
           </p>
           <button className="px-6 py-2.5 bg-jobflow-accent text-white font-semibold text-[11px] uppercase tracking-[0.15em] rounded-xl shadow-lg shadow-jobflow-accent/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto">
             Get AI Insights <ChevronRight size={14}/>
           </button>
        </div>
      </div>
    </div>
  );
};

const MetricBox = ({ title, value, sub, icon: Icon, color="text-jobflow-accent" }) => (
  <div className="bg-jobflow-card border border-jobflow-border p-4 rounded-2xl hover:border-jobflow-accent/30 transition-all group">
     <div className={`p-2 bg-jobflow-bg border border-jobflow-border rounded-lg w-fit mb-3 ${color} group-hover:scale-110 transition-all`}>
        <Icon size={16} />
     </div>
     <h4 className={`text-xl font-bold ${color} mb-0.5`}>{value}</h4>
     <p className="text-[10px] font-semibold text-jobflow-text uppercase tracking-wider">{title}</p>
     <p className="text-[10px] font-medium text-jobflow-text-dim uppercase tracking-wider mt-0.5">{sub}</p>
  </div>
);

export default AnalyticsView;
