import React from 'react';
import { FileText, Plus, Search, ChevronRight, Clock, Clock3, Tag, Download } from 'lucide-react';

const ResumesView = ({ resumes, onAdd }) => {
  return (
    <div className="flex flex-col h-full bg-jobflow-bg/30 animate-fade-in overflow-hidden">
      <div className="px-5 py-3 border-b border-jobflow-border/50 shrink-0 bg-jobflow-bg/80 backdrop-blur-sm z-10 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-jobflow-text tracking-tight">Resume Palace</h2>
          <p className="text-[11px] font-semibold text-jobflow-text-dim uppercase tracking-[0.15em] mt-1 border border-jobflow-border px-2 py-0.5 rounded-md inline-block">
            {resumes.length} Asset Variations
          </p>
        </div>
        <button 
          onClick={onAdd}
          className="bg-jobflow-accent hover:bg-jobflow-accent/80 text-white px-4 py-2 rounded-lg font-semibold text-[11px] uppercase tracking-[0.15em] transition-all shadow-lg shadow-jobflow-accent/20 active:scale-95 flex items-center gap-1.5"
        >
          <Plus size={14} /> New Variation
        </button>
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden flex-1">
        {resumes.length > 0 ? resumes.map(resume => (
          <div key={resume.id} className="bg-jobflow-card border border-jobflow-border p-5 rounded-2xl hover:border-jobflow-accent/50 transition-all group relative cursor-pointer overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <Download size={18} className="text-jobflow-accent" />
             </div>

             <div className="w-11 h-11 bg-jobflow-bg border border-jobflow-border rounded-xl flex items-center justify-center text-jobflow-accent mb-4 group-hover:bg-jobflow-accent group-hover:text-white transition-all">
                <FileText size={20} />
             </div>
              
             <h3 className="font-bold text-base text-jobflow-text mb-1.5 leading-tight group-hover:text-jobflow-accent transition-all">
                {resume.name}
             </h3>
             <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 text-[11px] font-medium text-jobflow-text-dim">
                   <Clock3 size={10} /> Last used: Jan 24, 2026
                </div>
                <div className="w-1 h-1 bg-jobflow-border rounded-full"></div>
                <div className="text-[10px] font-semibold text-emerald-500 uppercase tracking-wider bg-emerald-500/10 px-1.5 py-0.5 rounded-md">86% Success</div>
             </div>

             <div className="flex flex-wrap gap-1.5 mb-5">
                {['Fullstack', 'Senior', 'TypeScript', 'Lead'].map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-jobflow-bg border border-jobflow-border text-[10px] font-semibold text-jobflow-text-dim rounded-md uppercase">
                    {tag}
                  </span>
                ))}
             </div>

             <button className="w-full py-2.5 bg-jobflow-bg border border-jobflow-border text-jobflow-text font-semibold text-[11px] uppercase tracking-[0.1em] rounded-xl hover:border-jobflow-accent transition-all flex items-center justify-center gap-1.5">
                Preview Variation <ChevronRight size={12} />
             </button>
          </div>
        )) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center opacity-50">
             <div className="p-6 bg-jobflow-card rounded-2xl border-2 border-dashed border-jobflow-border mb-6">
                <FileText size={48} className="text-jobflow-text-dim" />
             </div>
             <h3 className="text-lg font-bold text-jobflow-text mb-1">No variations found</h3>
             <p className="text-[11px] text-jobflow-text-dim max-w-sm mb-6 leading-relaxed font-medium">
               Upload your primary resume and let JobFlow AI help you create optimized variations.
             </p>
             <button 
              onClick={onAdd}
              className="px-6 py-2.5 bg-jobflow-accent text-white font-semibold text-[11px] uppercase tracking-[0.15em] rounded-xl shadow-lg shadow-jobflow-accent/20 hover:scale-105 active:scale-95 transition-all"
             >
                Start with AI Tayloring
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumesView;
