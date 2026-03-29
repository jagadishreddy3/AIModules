import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import JobCard from './JobCard';
import { MoreHorizontal, Plus } from 'lucide-react';

const KanbanColumn = ({ column, jobs, onEdit, onDelete }) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className="flex flex-col w-80 shrink-0 h-full group/column">
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${column.color} shadow-lg shadow-current/20`}></div>
          <h2 className="font-black text-jobflow-text text-[13px] uppercase tracking-[0.15em]">
            {column.label}
          </h2>
          <span className="bg-jobflow-card border border-jobflow-border text-jobflow-text-dim text-[10px] font-black px-2 py-0.5 rounded-full min-w-[24px] text-center">
            {jobs.length}
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover/column:opacity-100 transition-opacity">
           <button className="p-1.5 text-jobflow-text-dim hover:text-jobflow-text hover:bg-jobflow-card rounded-lg transition-all"><MoreHorizontal size={16}/></button>
           <button className="p-1.5 text-jobflow-text-dim hover:text-jobflow-accent hover:bg-jobflow-card rounded-lg transition-all"><Plus size={16}/></button>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 min-h-[500px] overflow-y-auto custom-scrollbar pr-2 pb-10"
      >
        <SortableContext items={jobs.map((j) => j.id)} strategy={verticalListSortingStrategy}>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} onEdit={onEdit} onDelete={onDelete} />
            ))
          ) : (
            <div className="h-32 border-2 border-dashed border-jobflow-border rounded-[24px] flex flex-col items-center justify-center text-jobflow-text-dim/40 group transition-all hover:border-jobflow-accent/20">
              <Plus size={24} className="mb-2 opacity-50 group-hover:scale-110 group-hover:text-jobflow-accent transition-all" />
              <span className="text-[10px] font-black uppercase tracking-widest">Drop here</span>
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
