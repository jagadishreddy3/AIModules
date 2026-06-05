import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ExternalLink, Edit2, Trash2, MapPin, Clock, Sparkles } from 'lucide-react';
import { getDaysSince } from '../../utils/date';
import { COLUMNS } from '../../constants/columns';

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
      className={`group relative bg-jobflow-card rounded-2xl border border-jobflow-border p-3.5 mb-3 cursor-grab active:cursor-grabbing hover:border-jobflow-accent/40 hover:shadow-lg hover:shadow-jobflow-accent/5 transition-all duration-300 animate-fade-in`}
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-between items-start gap-3 mb-3 min-w-0">
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center gap-1.5 mb-0.5 min-w-0">
            <span className="text-[11px] font-semibold text-jobflow-text-dim uppercase tracking-wider truncate shrink-0">
              {job.company}
            </span>
            <span className="text-jobflow-text-dim opacity-50 shrink-0">•</span>
            <span className="text-[11px] font-medium text-jobflow-text-dim flex items-center gap-1 truncate">
              <MapPin size={9} className="shrink-0" /> {job.location || 'Remote'}
            </span>
          </div>
          <h3 className="font-semibold text-jobflow-text text-xs leading-tight group-hover:text-jobflow-accent transition-colors truncate" title={job.role}>
            {job.role}
          </h3>
        </div>
        
        <div className="flex items-center gap-0.5 shrink-0 bg-jobflow-bg/50 p-0.5 rounded-lg border border-jobflow-border">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(job); }}
            className="p-1 text-jobflow-text-dim hover:text-jobflow-accent rounded-md transition-all"
          >
            <Edit2 size={12} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(job.id); }}
            className="p-1 text-jobflow-text-dim hover:text-rose-500 rounded-md transition-all"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {(job.tags || ['AI/ML', 'React']).slice(0, 3).map((tag, i) => (
          <span key={i} className="px-1.5 py-0.5 bg-jobflow-bg border border-jobflow-border text-[10px] font-semibold text-jobflow-text-dim rounded-md uppercase tracking-wider">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-jobflow-border/50 pt-3 mt-auto">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[11px] font-medium text-jobflow-text-dim">
            <Clock size={10} className="text-jobflow-accent/60" />
            <span>{daysSince === 0 ? 'Today' : `${daysSince}d ago`}</span>
          </div>
          <button 
            title="AI-powered resume tailoring for this role — customizes your resume to match job requirements"
            className="flex items-center gap-1 px-1.5 py-0.5 bg-jobflow-accent/10 border border-jobflow-accent/20 rounded-md text-jobflow-accent text-[10px] font-semibold uppercase tracking-wider hover:bg-jobflow-accent hover:text-white transition-all shadow-sm"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <Sparkles size={9} /> Tailor
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
