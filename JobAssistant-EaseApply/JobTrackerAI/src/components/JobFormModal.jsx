import React, { useState, useEffect } from 'react';
import { X, Briefcase, Building2, MapPin, Link as LinkIcon, DollarSign, Tag, Calendar, FileText, Sparkles } from 'lucide-react';
import { STATUS_OPTIONS } from '../constants/columns';

const JobFormModal = ({ isOpen, onClose, onSubmit, job }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    tags: '',
    salary: '',
    status: 'wishlist',
    dateApplied: new Date().toISOString().split('T')[0],
    linkedinUrl: '',
    notes: '',
  });

  useEffect(() => {
    if (job) {
      setFormData({
        ...job,
        tags: Array.isArray(job.tags) ? job.tags.join(', ') : (job.tags || ''),
      });
    } else {
      setFormData({
        company: '',
        role: '',
        location: '',
        tags: '',
        salary: '',
        status: 'wishlist',
        dateApplied: new Date().toISOString().split('T')[0],
        linkedinUrl: '',
        notes: '',
      });
    }
  }, [job, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    onSubmit({ ...formData, tags: tagsArray });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-jobflow-bg/90 backdrop-blur-md animate-fade-in">
      <div className="bg-jobflow-card w-full max-w-2xl rounded-[40px] border border-jobflow-border shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-jobflow-accent/50 via-jobflow-accent to-jobflow-accent/50 opacity-30"></div>
        
        <div className="p-8 pb-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-jobflow-bg border border-jobflow-border rounded-2xl text-jobflow-accent">
                <Briefcase size={20} />
             </div>
             <div>
                <h2 className="text-xl font-black text-jobflow-text">{job ? 'Edit' : 'Add New'} Application</h2>
                <p className="text-[10px] font-bold text-jobflow-text-dim uppercase tracking-widest">JobFlow AI Pipeline</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 text-jobflow-text-dim hover:text-jobflow-text hover:bg-jobflow-bg rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 pt-4 overflow-y-auto custom-scrollbar flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <FormInput 
              icon={Building2} label="Company" placeholder="e.g. Stripe" 
              value={formData.company} 
              onChange={v => setFormData({...formData, company: v})} 
              required
            />
            <FormInput 
              icon={Briefcase} label="Role" placeholder="e.g. Senior Frontend" 
              value={formData.role} 
              onChange={v => setFormData({...formData, role: v})} 
              required
            />
            <FormInput 
              icon={MapPin} label="Location" placeholder="e.g. Remote / SF" 
              value={formData.location} 
              onChange={v => setFormData({...formData, location: v})} 
            />
            <FormInput 
              icon={DollarSign} label="Salary" placeholder="e.g. $180k - $220k" 
              value={formData.salary} 
              onChange={v => setFormData({...formData, salary: v})} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-jobflow-text-dim tracking-widest flex items-center gap-2 mb-1">
                  <Tag size={12}/> Tags (comma separated)
               </label>
               <input
                 type="text"
                 className="w-full bg-jobflow-bg border border-jobflow-border rounded-2xl p-4 text-xs text-jobflow-text focus:border-jobflow-accent focus:ring-1 focus:ring-jobflow-accent/20 transition-all outline-none"
                 placeholder="e.g. React, Node.js, AI"
                 value={formData.tags}
                 onChange={e => setFormData({...formData, tags: e.target.value})}
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-jobflow-text-dim tracking-widest flex items-center gap-2 mb-1">
                  <Calendar size={12}/> Current Status
               </label>
               <select
                 className="w-full bg-jobflow-bg border border-jobflow-border rounded-2xl p-4 text-xs text-jobflow-text focus:border-jobflow-accent transition-all outline-none appearance-none cursor-pointer"
                 value={formData.status}
                 onChange={e => setFormData({...formData, status: e.target.value})}
               >
                 {STATUS_OPTIONS.map(opt => (
                   <option key={opt.value} value={opt.value} className="bg-jobflow-card text-jobflow-text">{opt.label}</option>
                 ))}
               </select>
            </div>
          </div>

          <div className="space-y-6">
            <FormInput 
               icon={LinkIcon} label="LinkedIn URL" placeholder="https://linkedin.com/jobs/..." 
               value={formData.linkedinUrl} 
               onChange={v => setFormData({...formData, linkedinUrl: v})} 
            />
            
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-jobflow-text-dim tracking-widest flex items-center gap-2 mb-1">
                  <FileText size={12}/> Notes & AI Insights
               </label>
               <textarea
                 className="w-full bg-jobflow-bg border border-jobflow-border rounded-2xl p-4 text-xs text-jobflow-text focus:border-jobflow-accent focus:ring-1 focus:ring-jobflow-accent/20 transition-all outline-none min-h-[100px] resize-none"
                 placeholder="Key skills mentioned, referral name, interview notes..."
                 value={formData.notes}
                 onChange={e => setFormData({...formData, notes: e.target.value})}
               />
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-8 py-4 bg-jobflow-bg border border-jobflow-border text-jobflow-text-dim font-black text-[11px] uppercase tracking-widest rounded-2xl hover:text-jobflow-text hover:bg-jobflow-card transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-8 py-4 bg-jobflow-accent text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-jobflow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {job ? 'Save Changes' : 'Create Application'} <Sparkles size={14}/>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FormInput = ({ icon: Icon, label, placeholder, value, onChange, required = false }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-jobflow-text-dim tracking-widest flex items-center gap-2 mb-1">
       <Icon size={12}/> {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <input
      type="text"
      className="w-full bg-jobflow-bg border border-jobflow-border rounded-2xl p-4 text-xs text-jobflow-text focus:border-jobflow-accent focus:ring-1 focus:ring-jobflow-accent/20 transition-all outline-none"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      required={required}
    />
  </div>
);

export default JobFormModal;
