import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import JobCard from './JobCard';

const KanbanColumn = ({ column, jobs, onEdit, onDelete }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex flex-col w-72 h-full bg-slate-50/50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="p-4 flex items-center justify-between sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-t-xl z-10">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${column.color}`}></span>
          <h2 className="font-bold text-slate-700 dark:text-slate-200">
            {column.label}
          </h2>
        </div>
        <span className="px-2 py-0.5 text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full">
          {jobs.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 p-3 overflow-y-auto custom-scrollbar"
      >
        <SortableContext
          id={column.id}
          items={jobs.map(j => j.id)}
          strategy={verticalListSortingStrategy}
        >
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
          {jobs.length === 0 && (
            <div className="h-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-600 text-xs italic">
              Empty
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
