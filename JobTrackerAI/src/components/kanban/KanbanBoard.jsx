import React, { useState } from 'react';
import KanbanColumn from './KanbanColumn';
import { COLUMNS } from '../../constants/columns';
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

const KanbanBoard = ({ jobs, onMove, onEdit, onDelete }) => {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const [activeId, setActiveId] = useState(null);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const jobId = active.id;
    const targetId = over.id;

    const targetColumn = COLUMNS.find(c => c.id === targetId);
    if (targetColumn) {
      const currentJob = jobs.find(j => j.id === jobId);
      if (currentJob && currentJob.status !== targetId) {
        onMove(jobId, targetId, 0);
      }
      return;
    }

    const targetJob = jobs.find(j => j.id === targetId);
    if (targetJob) {
      const currentJob = jobs.find(j => j.id === jobId);
      if (currentJob && currentJob.status !== targetJob.status) {
        onMove(jobId, targetJob.status, 0);
      }
    }
  };

  const activeJob = jobs.find(j => j.id === activeId);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-full w-full overflow-x-auto overflow-y-hidden kanban-scrollbar">
        <div className="flex gap-6 p-6 h-full min-w-max">
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              jobs={jobs.filter((j) => j.status === column.id)}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
