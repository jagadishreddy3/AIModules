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
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar size={18} className="text-jobflow-accent" />
            <h3 className="font-black text-jobflow-text uppercase text-xs tracking-widest">Upcoming Rounds</h3>
          </div>

          {interviews.length > 0 ? interviews.map((job, i) => (
            <div key={job.id} className="bg-jobflow-card border border-jobflow-border p-6 rounded-[32px] hover:border-jobflow-accent/40 transition-all group">
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
                   <span className="px-3 py-1 bg-jobflow-accent/10 border border-jobflow-accent/20 text-jobflow-accent text-[9px] font-black uppercase tracking-widest rounded-lg">Technical Round</span>
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
                    <Clock size={12} className="text-jobflow-accent" /> 2:30 PM
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black text-jobflow-text-dim uppercase tracking-widest">Type</span>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-jobflow-text">
                    <Video size={12} className="text-jobflow-accent" /> Virtual
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-jobflow-accent hover:underline cursor-pointer">
                  Join <ChevronRight size={12} />
                </div>
              </div>
            </div>
          )) : (
            <div className="bg-jobflow-card border border-jobflow-border p-20 rounded-[48px] flex flex-col items-center justify-center text-center opacity-50">
               <PhoneCall size={64} className="mb-6 text-jobflow-text-dim" />
               <h4 className="text-xl font-black text-jobflow-text mb-2">No interviews scheduled</h4>
               <p className="text-xs text-jobflow-text-dim max-w-sm font-medium">
                  Apply to more roles to see your interview pipeline populate here.
               </p>
            </div>
          )}
        </div>

        <div className="bg-jobflow-card border border-jobflow-border rounded-[32px] p-8">
           <div className="flex items-center gap-3 mb-6">
              <Sparkles size={16} className="text-jobflow-accent" />
              <span className="text-xs font-black text-jobflow-text uppercase tracking-widest">AI Prep Tips</span>
           </div>
           <p className="text-[11px] text-jobflow-text-dim lowercase tracking-normal leading-relaxed mb-6 font-medium">
             Focus on **System Design** and **Scalability** for your upcoming rounds. Our AI suggests reviewing the [SDE_Resume] tailoring results.
           </p>
           <button className="w-full py-4 bg-jobflow-accent text-white font-black text-[10px] uppercase tracking-widest rounded-2xl">
              Generate Prep Guide
           </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewsView;
