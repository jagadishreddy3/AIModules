import React from 'react';
import { FileText, Plus, Search, ChevronRight, Clock, Clock3, Tag, Download } from 'lucide-react';

const ResumesView = ({ resumes, onAdd }) => {
  return (
    <div className="flex flex-col h-full bg-jobflow-bg/30 animate-fade-in overflow-y-auto custom-scrollbar">
      <div className="px-10 py-8 border-b border-jobflow-border/50 sticky top-0 bg-jobflow-bg/80 backdrop-blur-sm z-10 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-jobflow-text tracking-tight">Resume Palace</h2>
          <p className="text-[10px] font-black text-jobflow-text-dim uppercase tracking-[0.3em] mt-2 border border-jobflow-border px-2 py-1 rounded-md inline-block">
            {resumes.length} Asset Variations
          </p>
        </div>
        <button 
          onClick={onAdd}
          className="bg-jobflow-accent hover:bg-jobflow-accent/80 text-white px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-jobflow-accent/20 active:scale-95 flex items-center gap-3"
        >
          <Plus size={18} /> New Variation
        </button>
      </div>

      <div className="p-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {resumes.length > 0 ? resumes.map(resume => (
          <div key={resume.id} className="bg-jobflow-card border border-jobflow-border p-8 rounded-[40px] hover:border-jobflow-accent/50 hover:shadow-2xl hover:shadow-jobflow-accent/5 transition-all group relative cursor-pointer overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <Download size={22} className="text-jobflow-accent" />
             </div>

             <div className="w-14 h-14 bg-jobflow-bg border border-jobflow-border rounded-2xl flex items-center justify-center text-jobflow-accent mb-6 group-hover:bg-jobflow-accent group-hover:text-white transition-all">
                <FileText size={24} />
             </div>
             
             <h3 className="font-black text-xl text-jobflow-text mb-2 leading-tight group-hover:text-jobflow-accent transition-all">
                {resume.name}
             </h3>
             <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1 text-[10px] font-bold text-jobflow-text-dim">
                   <Clock3 size={12} /> Last used: Jan 24, 2026
                </div>
                <div className="w-1 h-1 bg-jobflow-border rounded-full"></div>
                <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-md">86% Success</div>
             </div>

             <div className="flex flex-wrap gap-2 mb-8">
                {['Fullstack', 'Senior', 'TypeScript', 'Lead'].map(tag => (
                  <span key={tag} className="px-2 py-1 bg-jobflow-bg border border-jobflow-border text-[9px] font-black text-jobflow-text-dim rounded-lg uppercase">
                    {tag}
                  </span>
                ))}
             </div>

             <button className="w-full py-4 bg-jobflow-bg border border-jobflow-border text-jobflow-text font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:border-jobflow-accent transition-all flex items-center justify-center gap-2">
                Preview Variation <ChevronRight size={14} />
             </button>
          </div>
        )) : (
          <div className="col-span-full py-32 flex flex-col items-center justify-center text-center opacity-50">
             <div className="p-8 bg-jobflow-card rounded-[40px] border-2 border-dashed border-jobflow-border mb-8">
                <FileText size={64} className="text-jobflow-text-dim" />
             </div>
             <h3 className="text-2xl font-black text-jobflow-text mb-2">No variations found</h3>
             <p className="text-xs text-jobflow-text-dim max-w-sm mb-10 leading-relaxed font-medium">
               Upload your primary resume and let JobFlow AI help you create optimized variations for different roles.
             </p>
             <button 
              onClick={onAdd}
              className="px-10 py-4 bg-jobflow-accent text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-jobflow-accent/20 hover:scale-105 active:scale-95 transition-all"
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
