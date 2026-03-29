import React from 'react';
import { FileText, Plus, Search, MoreVertical, ExternalLink, Calendar, Copy } from 'lucide-react';

const ResumesView = ({ resumes, onAdd, onEdit, onDelete }) => {
  return (
    <div className="p-10 animate-fade-in h-full overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-black text-jobflow-text mb-2">Resume Assets</h2>
          <p className="text-sm text-jobflow-text-dim font-medium tracking-wide italic">Manage your tailored resumes and variations.</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 bg-jobflow-accent hover:bg-jobflow-accent/80 text-white px-6 py-3 rounded-2xl font-black text-sm transition-all shadow-lg shadow-jobflow-accent/20 active:scale-95"
        >
          <Plus size={18} /> Add Variation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.length > 0 ? resumes.map((resume) => (
          <div key={resume.id} className="bg-jobflow-card border border-jobflow-border rounded-3xl p-6 hover:border-jobflow-accent/30 transition-all group overflow-hidden relative">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-jobflow-accent/10 rounded-2xl text-jobflow-accent">
                <FileText size={24} />
              </div>
              <button className="text-jobflow-text-dim hover:text-jobflow-text p-1 transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>

            <h3 className="text-lg font-black text-jobflow-text group-hover:text-jobflow-accent transition-all mb-2 truncate">
              {resume.name}
            </h3>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-jobflow-text-dim uppercase tracking-wider">
                <Calendar size={12} />
                <span>{new Date(resume.lastModified).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                <Copy size={12} />
                <span>8 Uses</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-2.5 bg-jobflow-sidebar border border-jobflow-border text-jobflow-text text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-jobflow-border transition-all flex items-center justify-center gap-2">
                <ExternalLink size={12} /> Preview
              </button>
              <button className="flex-1 py-2.5 bg-jobflow-sidebar border border-jobflow-border text-jobflow-text text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-jobflow-border transition-all">
                Edit Tag
              </button>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute bottom-[-20px] right-[-10px] text-jobflow-accent/5 -rotate-12 group-hover:text-jobflow-accent/10 transition-all">
              <Plus size={120} />
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 bg-jobflow-card/50 border-2 border-dashed border-jobflow-border rounded-3xl flex flex-col items-center justify-center text-jobflow-text-dim">
            <div className="p-6 bg-jobflow-sidebar rounded-full mb-4">
              <FileText size={48} className="text-jobflow-border" />
            </div>
            <p className="font-bold text-lg mb-1 text-jobflow-text">No resumes found</p>
            <p className="text-xs italic">Upload your first resume to start tailoring.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumesView;
