import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ExternalLink, Edit2, Trash2, MapPin, Tag, Banknote, Clock, Plus } from 'lucide-react';
import { getDaysSince } from '../utils/date';
import { COLUMNS } from '../constants/columns';

const JobCard = ({ job, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  const column = COLUMNS.find(c => c.id === job.status);
  const daysSince = getDaysSince(job.dateApplied);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-jobflow-card rounded-[24px] border border-jobflow-border p-5 mb-4 cursor-grab active:cursor-grabbing hover:border-jobflow-accent/40 hover:shadow-xl hover:shadow-jobflow-accent/5 transition-all duration-300 animate-fade-in`}
      {...attributes}
      {...listeners}
    >
      {/* Accent strip */}
      <div className={`absolute left-0 top-1/4 bottom-1/4 w-1 ${column?.color} rounded-r-full opacity-0 group-hover:opacity-100 transition-all`}></div>

      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black text-jobflow-text-dim uppercase tracking-widest truncate max-w-[120px]">
              {job.company}
            </span>
            <span className="text-jobflow-text-dim opacity-50">•</span>
            <span className="text-[10px] font-bold text-jobflow-text-dim flex items-center gap-1">
              <MapPin size={10} /> {job.location || 'Remote'}
            </span>
          </div>
          <h3 className="font-black text-jobflow-text text-sm leading-tight group-hover:text-jobflow-accent transition-colors truncate" title={job.role}>
            {job.role}
          </h3>
        </div>
        
        <div className="flex items-center gap-1 shrink-0 bg-jobflow-bg/50 p-1 rounded-xl border border-jobflow-border">
          {job.linkedinUrl && (
            <a
              href={job.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 text-jobflow-text-dim hover:text-jobflow-accent rounded-lg transition-all"
            >
              <ExternalLink size={14} />
            </a>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(job); }}
            className="p-1.5 text-jobflow-text-dim hover:text-jobflow-accent rounded-lg transition-all"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(job.id); }}
            className="p-1.5 text-jobflow-text-dim hover:text-rose-500 rounded-lg transition-all"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Tags Section */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {(job.tags || ['AI/ML', 'React']).map((tag, i) => (
          <span key={i} className="px-2 py-0.5 bg-jobflow-bg border border-jobflow-border text-[9px] font-black text-jobflow-text-dim rounded-md uppercase tracking-wider group-hover:border-jobflow-accent/30 transition-all">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-jobflow-border/50 pt-4 mt-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-jobflow-text-dim">
            <Clock size={12} className="text-jobflow-accent/60" />
            <span>{daysSince === 0 ? 'Today' : `${daysSince}d ago`}</span>
          </div>
          {job.salary && (
            <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500">
               <span>{job.salary}</span>
            </div>
          )}
        </div>
        <div className="w-6 h-6 bg-jobflow-accent/10 rounded-lg flex items-center justify-center text-jobflow-accent hover:bg-jobflow-accent hover:text-white transition-all cursor-pointer">
           <Plus size={14} />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
