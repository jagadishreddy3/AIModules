import React, { useState, useMemo } from 'react';
import { useJobs } from './hooks/useJobs';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import KanbanBoard from './components/KanbanBoard';
import JobFormModal from './components/JobFormModal';
import DeleteConfirm from './components/DeleteConfirm';
import { Loader2 } from 'lucide-react';

function App() {
  const {
    jobs,
    loading,
    addJob,
    updateJob,
    deleteJob,
    moveJob,
    exportJSON,
    importJSON,
  } = useJobs();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const filteredJobs = useMemo(() => {
    if (!searchValue) return jobs;
    const lowerSearch = searchValue.toLowerCase();
    return jobs.filter(
      (j) =>
        j.company.toLowerCase().includes(lowerSearch) ||
        j.role.toLowerCase().includes(lowerSearch)
    );
  }, [jobs, searchValue]);

  const existingResumes = useMemo(() => {
    const resumes = jobs.map((j) => j.resume).filter(Boolean);
    return [...new Set(resumes)];
  }, [jobs]);

  const handleAddClick = () => {
    setEditingJob(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleSaveJob = (formData) => {
    if (editingJob) {
      updateJob(editingJob.id, formData);
    } else {
      addJob(formData);
    }
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteJob(deleteId);
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
        <p className="text-slate-500 font-medium animate-pulse">Initializing your Job Tracker...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <Toolbar
        onAdd={handleAddClick}
        onExport={exportJSON}
        onImport={importJSON}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side Bar - Analytics */}
        <Sidebar jobs={jobs} />

        {/* Main Content - Kanban Board */}
        <main className="flex-1 overflow-hidden relative">
          <KanbanBoard
            jobs={filteredJobs}
            onMove={moveJob}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </main>
      </div>

      <JobFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveJob}
        job={editingJob}
        existingResumes={existingResumes}
      />

      <DeleteConfirm
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        jobTitle={jobs.find((j) => j.id === deleteId)?.company || 'this job'}
      />

      {/* Footer / Status bar */}
      <footer className="h-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center px-8 justify-between z-50 shrink-0">
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>Total Jobs: {jobs.length}</span>
          <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
          <span>Filtered: {filteredJobs.length}</span>
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Local Storage Persistent via IndexedDB
        </div>
      </footer>
    </div>
  );
}

export default App;
