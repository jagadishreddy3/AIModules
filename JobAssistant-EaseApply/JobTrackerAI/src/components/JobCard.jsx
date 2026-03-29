import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ExternalLink, Edit2, Trash2, Calendar, FileText, Banknote, StickyNote } from 'lucide-react';
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
    opacity: isDragging ? 0.5 : 1,
  };

  const column = COLUMNS.find(c => c.id === job.status);
  const daysSince = getDaysSince(job.dateApplied);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-white dark:bg-slate-800 rounded-xl shadow-sm border-l-4 ${column?.border || 'border-slate-300'} p-4 mb-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 border border-slate-200 dark:border-slate-700`}
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-between items-start gap-2 mb-1">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 truncate flex-1" title={job.company}>
          {job.company}
        </h3>
        <div className="flex items-center gap-1 shrink-0">
          {job.linkedinUrl && (
            <a
              href={job.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1 text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
              title="Open LinkedIn Job"
            >
              <ExternalLink size={14} />
            </a>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(job);
            }}
            className="p-1 text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            title="Edit Application"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(job.id);
            }}
            className="p-1 text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            title="Delete Application"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3 truncate italic" title={job.role}>
        {job.role}
      </p>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
          <Calendar size={12} className="shrink-0 text-slate-400" />
          <span className="truncate">{daysSince === 0 ? 'Today' : `${daysSince}d ago`}</span>
        </div>
        {job.resume && (
          <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
            <FileText size={12} className="shrink-0 text-slate-400" />
            <span className="truncate" title={job.resume}>{job.resume}</span>
          </div>
        )}
        {job.salary && (
          <div className="flex items-center gap-2 text-[10px] text-emerald-600 dark:text-emerald-500 font-semibold">
            <Banknote size={12} className="shrink-0" />
            <span className="truncate" title={job.salary}>{job.salary}</span>
          </div>
        )}
        {job.notes && (
          <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 col-span-2">
            <StickyNote size={12} className="shrink-0" />
            <span className="truncate italic" title={job.notes}>{job.notes}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
