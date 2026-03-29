import React from 'react';
import { BarChart3, Briefcase, CheckCircle2, Send, MessageSquare, Trophy, XCircle, PieChart } from 'lucide-react';
import { COLUMNS } from '../constants/columns';

const Sidebar = ({ jobs }) => {
  const stats = COLUMNS.map(col => ({
    ...col,
    count: jobs.filter(j => j.status === col.id).length
  }));

  const totalApplications = jobs.length;
  const interviewCount = jobs.filter(j => j.status === 'interview').length;
  const offerCount = jobs.filter(j => j.status === 'offer').length;

  const getStatusIcon = (id) => {
    switch(id) {
      case 'wishlist': return <PieChart size={18} />;
      case 'applied': return <Send size={18} />;
      case 'followup': return <MessageSquare size={18} />;
      case 'interview': return <BarChart3 size={18} />;
      case 'offer': return <Trophy size={18} />;
      case 'rejected': return <XCircle size={18} />;
      default: return <Briefcase size={18} />;
    }
  };

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden transition-all duration-300">
      <div className="p-6">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 px-1">Analytics Dashboard</h2>
        
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Total Applications</span>
              <span className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{totalApplications}</span>
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800 mx-1"></div>

          {/* Status Breakdown */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">By Status</h3>
            {stats.map((stat) => (
              <div key={stat.id} className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.color} text-white shadow-sm`}>
                    {getStatusIcon(stat.id)}
                  </div>
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100">{stat.label}</span>
                </div>
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{stat.count}</span>
              </div>
            ))}
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800 mx-1"></div>

          {/* Goals / Success */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">Success Metrics</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold mb-1">
                <span className="text-slate-500">Interview Rate</span>
                <span className="text-blue-500">{totalApplications > 0 ? ((interviewCount / totalApplications) * 100).toFixed(0) : 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500" 
                  style={{ width: `${totalApplications > 0 ? (interviewCount / totalApplications) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold mb-1">
                <span className="text-slate-500">Offer Success</span>
                <span className="text-emerald-500">{totalApplications > 0 ? ((offerCount / totalApplications) * 100).toFixed(0) : 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-500" 
                  style={{ width: `${totalApplications > 0 ? (offerCount / totalApplications) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
