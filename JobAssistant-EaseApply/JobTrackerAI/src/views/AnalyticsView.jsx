import React from 'react';
import { BarChart, PieChart, Activity, TrendingUp, Target, Briefcase, ChevronRight } from 'lucide-react';

const AnalyticsView = ({ jobs }) => {
  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const stats = [
    { label: 'Wishlist', count: statusCounts.wishlist || 0, color: 'bg-purple-500' },
    { label: 'Applied', count: statusCounts.applied || 0, color: 'bg-blue-500' },
    { label: 'Screening', count: statusCounts.screening || 0, color: 'bg-amber-500' },
    { label: 'Interviews', count: statusCounts.interviews || 0, color: 'bg-cyan-500' },
    { label: 'Offer', count: statusCounts.offer || 0, color: 'bg-emerald-500' },
  ];

  const maxCount = Math.max(...stats.map(s => s.count), 1);

  return (
    <div className="flex flex-col h-full bg-jobflow-bg/30 animate-fade-in overflow-y-auto custom-scrollbar">
      <div className="px-10 py-8 border-b border-jobflow-border/50 sticky top-0 bg-jobflow-bg/80 backdrop-blur-sm z-10">
        <h2 className="text-3xl font-black text-jobflow-text tracking-tight">Performance Analytics</h2>
        <p className="text-[10px] font-black text-jobflow-text-dim uppercase tracking-[0.2em] mt-2 border border-jobflow-border px-2 py-1 rounded-md inline-block">
          Pipeline Evolution
        </p>
      </div>

      <div className="p-10 space-y-12">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          <div className="bg-jobflow-card border border-jobflow-border rounded-[40px] p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="font-black text-jobflow-text text-xl mb-1">Pipeline Distribution</h3>
                  <p className="text-[10px] font-bold text-jobflow-text-dim uppercase tracking-widest">Real-time Stage Analysis</p>
               </div>
               <BarChart className="text-jobflow-accent" size={24} />
            </div>
            
            <div className="space-y-8">
              {stats.map(stat => (
                <div key={stat.label} className="space-y-3 group">
                   <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black text-jobflow-text uppercase tracking-[0.2em] group-hover:text-jobflow-accent transition-all">{stat.label}</span>
                      <span className="text-sm font-black text-jobflow-text">{stat.count} <span className="text-[10px] text-jobflow-text-dim font-bold ml-1">({Math.round(stat.count/jobs.length*100 || 0)}%)</span></span>
                   </div>
                   <div className="h-2.5 bg-jobflow-bg rounded-full overflow-hidden border border-jobflow-border/50">
                      <div 
                        className={`h-full ${stat.color} rounded-full shadow-lg shadow-current/20 transition-all duration-700 ease-out`} 
                        style={{ width: `${(stat.count / maxCount) * 100}%` }}
                      ></div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <MetricBox title="Application Success" value="68%" sub="Conversion to Screen" icon={Activity} />
             <MetricBox title="Interview Pass" value="42%" sub="Offer Conversion" icon={Target} color="text-emerald-500" />
             <MetricBox title="Average Rounds" value="3.4" sub="Per Application" icon={TrendingUp} color="text-purple-500" />
             <MetricBox title="Monthly Velocity" value="+18" sub="New Applications" icon={Briefcase} color="text-blue-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-jobflow-card to-jobflow-bg border border-jobflow-border rounded-[40px] p-10 text-center relative overflow-hidden group">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-jobflow-accent to-transparent opacity-20 group-hover:opacity-100 transition-all"></div>
           <h3 className="text-2xl font-black text-jobflow-text mb-2">Unlock Predictive Analytics</h3>
           <p className="text-xs text-jobflow-text-dim max-w-lg mx-auto mb-8 leading-relaxed font-medium">
             Our AI engine can predict which companies are most likely to respond based on your historical success patterns and live market data.
           </p>
           <button className="px-10 py-4 bg-jobflow-accent text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-jobflow-accent/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto">
             Get AI Insights <ChevronRight size={16}/>
           </button>
        </div>
      </div>
    </div>
  );
};

const MetricBox = ({ title, value, sub, icon: Icon, color="text-jobflow-accent" }) => (
  <div className="bg-jobflow-card border border-jobflow-border p-8 rounded-[32px] hover:border-jobflow-accent/30 transition-all group">
     <div className={`p-3 bg-jobflow-bg border border-jobflow-border rounded-2xl w-fit mb-6 ${color} group-hover:scale-110 transition-all`}>
        <Icon size={20} />
     </div>
     <h4 className={`text-3xl font-black ${color} mb-1`}>{value}</h4>
     <p className="text-[11px] font-black text-jobflow-text uppercase tracking-widest">{title}</p>
     <p className="text-[9px] font-bold text-jobflow-text-dim uppercase tracking-widest mt-1">{sub}</p>
  </div>
);

export default AnalyticsView;
