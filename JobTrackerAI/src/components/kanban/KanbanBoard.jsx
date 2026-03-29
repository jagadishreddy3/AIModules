import React from 'react';
import KanbanColumn from './KanbanColumn';
import JobCard from './JobCard';
import { COLUMNS } from '../../constants/columns';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

const KanbanBoard = ({ jobs, onMove, onEdit, onDelete }) => {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
       // logic for onMove(active.id, overId) already handled in parent
    }
  };

  return (
    <div className="h-full w-full overflow-x-auto overflow-y-hidden custom-scrollbar">
      <div className="flex gap-8 p-10 h-full min-w-max">
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
  );
};

export default KanbanBoard;
