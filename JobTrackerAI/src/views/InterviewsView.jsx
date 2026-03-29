import React from 'react';
import { Calendar, Clock, MapPin, Video, CheckCircle2, ChevronRight, Sparkles, PhoneCall } from 'lucide-react';
import { formatDate } from '../utils/date';

const InterviewsView = ({ jobs }) => {
  const interviews = jobs.filter(j => j.status === 'interviews');

  return (
    <div className="flex flex-col h-full bg-jobflow-bg/30 animate-fade-in overflow-y-auto custom-scrollbar">
      <div className="px-10 py-8 border-b border-jobflow-border/50 sticky top-0 bg-jobflow-bg/80 backdrop-blur-sm z-10">
        <h2 className="text-3xl font-black text-jobflow-text tracking-tight">Interview Tracker</h2>
        <p className="text-[10px] font-black text-jobflow-text-dim uppercase tracking-[0.2em] mt-2 border border-jobflow-border px-2 py-1 rounded-md inline-block">
          {interviews.length} Scheduled Stages
        </p>
      </div>

      <div className="p-10 grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Upcoming Section */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar size={18} className="text-jobflow-accent" />
            <h3 className="font-black text-jobflow-text uppercase text-xs tracking-widest">Upcoming Rounds</h3>
          </div>

          {interviews.length > 0 ? interviews.map((job, i) => (
            <div key={job.id} className="bg-jobflow-card border border-jobflow-border p-6 rounded-[32px] hover:border-jobflow-accent/40 hover:shadow-xl hover:shadow-jobflow-accent/5 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-jobflow-bg border border-jobflow-border rounded-2xl flex items-center justify-center text-jobflow-text font-black text-lg">
                    {job.company[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-jobflow-text text-lg leading-tight group-hover:text-jobflow-accent transition-all">{job.company}</h4>
                    <p className="text-[10px] font-bold text-jobflow-text-dim uppercase tracking-widest mt-1">{job.role}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <span className="px-3 py-1 bg-jobflow-accent/10 border border-jobflow-accent/20 text-jobflow-accent text-[9px] font-black uppercase tracking-widest rounded-lg">Round {i + 1}: Technical</span>
                   <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500">
                     <CheckCircle2 size={12} /> Confirmed
                   </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-jobflow-bg/50 rounded-2xl border border-jobflow-border/50">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black text-jobflow-text-dim uppercase tracking-widest">Date</span>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-jobflow-text">
                    <Calendar size={12} className="text-jobflow-accent" /> {formatDate(job.dateApplied)}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black text-jobflow-text-dim uppercase tracking-widest">Time</span>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-jobflow-text">
                    <Clock size={12} className="text-jobflow-accent" /> 2:30 PM (IST)
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black text-jobflow-text-dim uppercase tracking-widest">Type</span>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-jobflow-text">
                    <Video size={12} className="text-jobflow-accent" /> Google Meet
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black text-jobflow-text-dim uppercase tracking-widest">Links</span>
                  <div className="flex items-center gap-2 text-[10px] font-black text-jobflow-accent hover:underline cursor-pointer">
                    Join Call <ChevronRight size={12} />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                 <div className="flex -space-x-2">
                    {[1, 2, 3].map(p => (
                      <div key={p} className="w-8 h-8 rounded-full border-2 border-jobflow-card bg-jobflow-bg flex items-center justify-center text-[10px] font-black text-jobflow-text-dim">
                        P{p}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-jobflow-card bg-jobflow-accent text-white flex items-center justify-center text-[8px] font-black">
                      +2
                    </div>
                 </div>
                 <button className="px-5 py-2.5 bg-jobflow-card border border-jobflow-border text-jobflow-accent text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-jobflow-accent hover:text-white transition-all shadow-lg active:scale-95">
                    Preparations Card
                 </button>
              </div>
            </div>
          )) : (
            <div className="bg-jobflow-card border border-jobflow-border p-20 rounded-[48px] flex flex-col items-center justify-center text-center">
               <div className="p-6 bg-jobflow-bg rounded-[32px] border border-jobflow-border mb-6 text-jobflow-text-dim opacity-20">
                  <PhoneCall size={64} />
               </div>
               <h4 className="text-xl font-black text-jobflow-text mb-2">No interviews yet</h4>
               <p className="text-xs text-jobflow-text-dim max-w-sm mb-8 leading-relaxed">
                  Focus on your [SDE_Resume_v3] and apply to 5 more jobs today to trigger new interview invites.
               </p>
               <button className="px-8 py-4 bg-jobflow-accent text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-jobflow-accent/20 hover:scale-105 active:scale-95 transition-all">
                  Browse Applications
               </button>
            </div>
          )}
        </div>

        {/* AI Preparation Tips */}
        <div className="space-y-8">
           <div className="bg-gradient-to-br from-blue-600/10 to-jobflow-bg border border-jobflow-accent/20 rounded-[32px] p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Sparkles size={128} />
              </div>
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-jobflow-accent rounded-xl text-white">
                    <Sparkles size={16} />
                 </div>
                 <span className="text-xs font-black text-jobflow-text uppercase tracking-widest">AI Interview Prep</span>
              </div>
              
              <h5 className="font-black text-jobflow-text mb-4">Focus Areas for Next Round:</h5>
              <div className="space-y-4 mb-8">
                 {[
                   'System Design with Redis caching',
                   'Concurrent data processing in Rust',
                   'Behavioral: Handling production outages'
                 ].map((tip, i) => (
                   <div key={i} className="flex gap-4 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-jobflow-accent mt-1.5 shrink-0"></div>
                      <p className="text-[11px] font-medium text-jobflow-text-dim leading-normal">{tip}</p>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 bg-jobflow-card border border-jobflow-border text-jobflow-text font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:border-jobflow-accent transition-all flex items-center justify-center gap-2">
                 Generate preparation guide
              </button>
           </div>

           <div className="bg-jobflow-card border border-jobflow-border rounded-[32px] p-8">
              <h3 className="font-black text-jobflow-text uppercase text-xs tracking-widest mb-6">Past Performance</h3>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-jobflow-text-dim">
                       <span>Technical Dept</span>
                       <span className="text-emerald-500">8.4 / 10</span>
                    </div>
                    <div className="h-1.5 bg-jobflow-bg rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-jobflow-text-dim">
                       <span>Communication</span>
                       <span className="text-blue-500">9.2 / 10</span>
                    </div>
                    <div className="h-1.5 bg-jobflow-bg rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewsView;
