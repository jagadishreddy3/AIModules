import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import JobCard from './JobCard';
import { COLUMNS } from '../constants/columns';

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

const KanbanBoard = ({ jobs, onMove, onEdit, onDelete }) => {
  const [activeId, setActiveId] = useState(null);
  const activeJob = jobs.find((j) => j.id === activeId);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeJob = jobs.find((j) => j.id === activeId);
    const overJob = jobs.find((j) => j.id === overId);
    const overColumn = COLUMNS.find((c) => c.id === overId);

    // If dragging over a different column
    if (overColumn && activeJob.status !== overId) {
      onMove(activeId, overId, 0);
    } 
    // If dragging over another job in a different column
    else if (overJob && activeJob.status !== overJob.status) {
      onMove(activeId, overJob.status, 0);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const activeJob = jobs.find((j) => j.id === active.id);
      const overJob = jobs.find((j) => j.id === over.id);
      const overColumn = COLUMNS.find((c) => c.id === over.id);

      if (overColumn) {
        onMove(active.id, overColumn.id, 0);
      } else if (overJob) {
        onMove(active.id, overJob.status, 0);
      }
    }

    setActiveId(null);
  };

  return (
    <div className="absolute inset-0 overflow-x-auto overflow-y-hidden custom-scrollbar">
      <div className="flex gap-6 p-6 h-full min-w-max">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              jobs={jobs.filter((j) => j.status === column.id)}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

          <DragOverlay dropAnimation={dropAnimation}>
            {activeId ? (
              <JobCard
                job={activeJob}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
