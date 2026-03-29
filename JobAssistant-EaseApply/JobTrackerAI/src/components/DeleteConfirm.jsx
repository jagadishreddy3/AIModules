import React from 'react';
import { Trash2, AlertCircle, X } from 'lucide-react';

const DeleteConfirm = ({ isOpen, onClose, onConfirm, jobTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-jobflow-bg/90 backdrop-blur-md animate-fade-in">
      <div className="bg-jobflow-card w-full max-w-md rounded-[32px] border border-jobflow-border shadow-2xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.2)]"></div>
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-rose-500/10 text-rose-500 rounded-3xl border border-rose-500/20">
            <Trash2 size={32} />
          </div>
        </div>
        
        <h2 className="text-xl font-black text-jobflow-text mb-2 tracking-tight">Wait a second!</h2>
        <p className="text-sm text-jobflow-text-dim leading-relaxed mb-8 font-medium">
          Are you sure you want to remove <strong className="text-jobflow-text font-extrabold px-1 underline decoration-rose-500/30 decoration-2 underline-offset-4">{jobTitle}</strong>? This action cannot be undone and you'll lose all related notes.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 bg-jobflow-bg border border-jobflow-border text-jobflow-text-dim font-black text-[11px] uppercase tracking-widest rounded-2xl hover:text-jobflow-text hover:bg-jobflow-card transition-all active:scale-95"
          >
            Go Back
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-4 bg-rose-600 text-white font-black text-[11px] uppercase tracking-widest rounded-2xl shadow-xl shadow-rose-500/20 hover:bg-rose-500 transition-all active:scale-95"
          >
            Delete Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
