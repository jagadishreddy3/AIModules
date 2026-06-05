import React from 'react';
import { Calendar, Clock, MapPin, Video, CheckCircle2, ChevronRight, Sparkles, PhoneCall } from 'lucide-react';
import { formatDate } from '../utils/date';

const InterviewsView = ({ jobs }) => {
  const interviews = jobs.filter(j => j.status === 'interviews');

  return (
    <div className="flex flex-col h-full bg-jobflow-bg/30 animate-fade-in overflow-hidden">
      <div className="px-5 py-3 border-b border-jobflow-border/50 shrink-0 bg-jobflow-bg/80 backdrop-blur-sm z-10">
        <h2 className="text-xl font-bold text-jobflow-text tracking-tight">Interview Tracker</h2>
        <p className="text-[11px] font-semibold text-jobflow-text-dim uppercase tracking-[0.15em] mt-1 border border-jobflow-border px-2 py-0.5 rounded-md inline-block">
          {interviews.length} Scheduled Stages
        </p>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden flex-1">
        <div className="lg:col-span-2 flex flex-col gap-3 min-h-0 overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            <Calendar size={16} className="text-jobflow-accent" />
            <h3 className="font-semibold text-jobflow-text uppercase text-xs tracking-wider">Upcoming Rounds</h3>
          </div>

          {interviews.length > 0 ? interviews.map((job, i) => (
            <div key={job.id} className="bg-jobflow-card border border-jobflow-border p-4 rounded-2xl hover:border-jobflow-accent/40 transition-all group shrink-0">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-jobflow-bg border border-jobflow-border rounded-xl flex items-center justify-center text-jobflow-text font-bold text-sm">
                    {job.company[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-jobflow-text text-sm leading-tight group-hover:text-jobflow-accent transition-all">{job.company}</h4>
                    <p className="text-[10px] font-medium text-jobflow-text-dim uppercase tracking-wider mt-0.5">{job.role}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                   <span className="px-2 py-0.5 bg-jobflow-accent/10 border border-jobflow-accent/20 text-jobflow-accent text-[10px] font-semibold uppercase tracking-wider rounded-md">Technical Round</span>
                   <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-500">
                     <CheckCircle2 size={10} /> Confirmed
                   </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-jobflow-bg/50 rounded-xl border border-jobflow-border/50">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-semibold text-jobflow-text-dim uppercase tracking-wider">Date</span>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-jobflow-text">
                    <Calendar size={10} className="text-jobflow-accent" /> {formatDate(job.dateApplied)}
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-semibold text-jobflow-text-dim uppercase tracking-wider">Time</span>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-jobflow-text">
                    <Clock size={10} className="text-jobflow-accent" /> 2:30 PM
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-semibold text-jobflow-text-dim uppercase tracking-wider">Type</span>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-jobflow-text">
                    <Video size={10} className="text-jobflow-accent" /> Virtual
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-jobflow-accent hover:underline cursor-pointer">
                  Join <ChevronRight size={10} />
                </div>
              </div>
            </div>
          )) : (
            <div className="bg-jobflow-card border border-jobflow-border p-12 rounded-2xl flex flex-col items-center justify-center text-center opacity-50">
               <PhoneCall size={48} className="mb-4 text-jobflow-text-dim" />
               <h4 className="text-base font-bold text-jobflow-text mb-1">No interviews scheduled</h4>
               <p className="text-[11px] text-jobflow-text-dim max-w-sm font-medium">
                  Apply to more roles to see your interview pipeline populate here.
               </p>
            </div>
          )}
        </div>

        <div className="bg-jobflow-card border border-jobflow-border rounded-2xl p-5 h-fit">
           <div className="flex items-center gap-2 mb-4">
              <Sparkles size={14} className="text-jobflow-accent" />
              <span className="text-xs font-semibold text-jobflow-text uppercase tracking-wider">AI Prep Tips</span>
           </div>
           <p className="text-[11px] text-jobflow-text-dim leading-relaxed mb-4 font-medium">
             Focus on System Design and Scalability for your upcoming rounds.
           </p>
           <button className="w-full py-2.5 bg-jobflow-accent text-white font-semibold text-[11px] uppercase tracking-wider rounded-xl">
              Generate Prep Guide
           </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewsView;
