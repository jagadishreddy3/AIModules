import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { STATUS_OPTIONS } from '../constants/columns';

const JobFormModal = ({ isOpen, onClose, onSubmit, job }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    tags: [],
    linkedinUrl: '',
    salary: '',
    dateApplied: new Date().toISOString().split('T')[0],
    status: 'wishlist',
    notes: '',
  });

  useEffect(() => {
    if (job) {
      setFormData(job);
    } else {
      setFormData({
        company: '',
        role: '',
        location: '',
        tags: [],
        linkedinUrl: '',
        salary: '',
        dateApplied: new Date().toISOString().split('T')[0],
        status: 'wishlist',
        notes: '',
      });
    }
  }, [job, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.role) return;
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-jobflow-bg/80 backdrop-blur-md animate-fade-in">
      <div className="bg-jobflow-card w-full max-w-2xl rounded-[32px] border border-jobflow-border shadow-2xl shadow-jobflow-accent/5 overflow-hidden">
        <div className="flex items-center justify-between p-8 border-b border-jobflow-border/50">
          <div>
            <h2 className="text-xl font-black text-jobflow-text">
              {job ? 'Edit Application' : 'Add New Job'}
            </h2>
            <p className="text-[10px] font-bold text-jobflow-text-dim uppercase tracking-widest mt-1">
              {job ? 'Update details for ' + job.company : 'Save a new job to your pipeline'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-jobflow-text-dim hover:text-jobflow-text bg-jobflow-bg border border-jobflow-border rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-jobflow-text-dim uppercase tracking-widest mb-3">Company *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-jobflow-bg border border-jobflow-border rounded-2xl px-5 py-3.5 text-sm text-jobflow-text focus:border-jobflow-accent outline-none transition-all placeholder:text-jobflow-text-dim/30"
                placeholder="e.g. Stripe"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-jobflow-text-dim uppercase tracking-widest mb-3">Role *</label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-jobflow-bg border border-jobflow-border rounded-2xl px-5 py-3.5 text-sm text-jobflow-text focus:border-jobflow-accent outline-none transition-all placeholder:text-jobflow-text-dim/30"
                placeholder="e.g. Platform Engineer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-jobflow-text-dim uppercase tracking-widest mb-3">Location</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-jobflow-bg border border-jobflow-border rounded-2xl px-5 py-3.5 text-sm text-jobflow-text focus:border-jobflow-accent outline-none transition-all placeholder:text-jobflow-text-dim/30"
                placeholder="e.g. Remote / NYC"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-jobflow-text-dim uppercase tracking-widest mb-3">Salary</label>
              <input
                type="text"
                value={formData.salary || ''}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full bg-jobflow-bg border border-jobflow-border rounded-2xl px-5 py-3.5 text-sm text-jobflow-text focus:border-jobflow-accent outline-none transition-all placeholder:text-jobflow-text-dim/30"
                placeholder="e.g. $160k - $200k"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-jobflow-text-dim uppercase tracking-widest mb-3">Tags (comma separated)</label>
            <input
              type="text"
              value={(formData.tags || []).join(', ')}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
              className="w-full bg-jobflow-bg border border-jobflow-border rounded-2xl px-5 py-3.5 text-sm text-jobflow-text focus:border-jobflow-accent outline-none transition-all placeholder:text-jobflow-text-dim/30"
              placeholder="e.g. Rust, Infrastructure, ML"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-jobflow-text-dim uppercase tracking-widest mb-3">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-jobflow-bg border border-jobflow-border rounded-2xl px-5 py-3.5 text-sm text-jobflow-text focus:border-jobflow-accent outline-none transition-all appearance-none cursor-pointer"
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-jobflow-text-dim uppercase tracking-widest mb-3">Date Applied</label>
              <input
                type="date"
                value={formData.dateApplied}
                onChange={(e) => setFormData({ ...formData, dateApplied: e.target.value })}
                className="w-full bg-jobflow-bg border border-jobflow-border rounded-2xl px-5 py-3.5 text-sm text-jobflow-text focus:border-jobflow-accent outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-jobflow-text-dim uppercase tracking-widest mb-3">LinkedIn URL</label>
            <input
              type="url"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              className="w-full bg-jobflow-bg border border-jobflow-border rounded-2xl px-5 py-3.5 text-sm text-jobflow-text focus:border-jobflow-accent outline-none transition-all placeholder:text-jobflow-text-dim/30"
              placeholder="https://linkedin.com/jobs/view/..."
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-jobflow-text-dim uppercase tracking-widest mb-3">Notes</label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full bg-jobflow-bg border border-jobflow-border rounded-2xl px-5 py-3.5 text-sm text-jobflow-text focus:border-jobflow-accent outline-none transition-all placeholder:text-jobflow-text-dim/30 resize-none"
              placeholder="Recruiter contact, referral names, focus areas..."
            />
          </div>
        </form>

        <div className="p-8 border-t border-jobflow-border/50 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-4 bg-jobflow-bg border border-jobflow-border text-jobflow-text-dim font-black text-xs uppercase tracking-widest rounded-2xl hover:text-jobflow-text transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex-[2] px-6 py-4 bg-jobflow-accent text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-jobflow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {job ? 'Update Job' : 'Add to Pipeline'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobFormModal;
