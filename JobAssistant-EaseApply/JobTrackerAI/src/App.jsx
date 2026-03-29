import React, { useState, useMemo, useEffect } from 'react';
import { useJobs } from './hooks/useJobs';
import { useResumes } from './hooks/useResumes';
import RailNav from './components/layout/RailNav';
import TopNav from './components/layout/TopNav';
import Sidebar from './components/layout/Sidebar';
import DashboardView from './views/DashboardView';
import AnalyticsView from './views/AnalyticsView';
import ResumesView from './views/ResumesView';
import InterviewsView from './views/InterviewsView';
import KanbanBoard from './components/kanban/KanbanBoard';
import JobFormModal from './components/JobFormModal';
import DeleteConfirm from './components/DeleteConfirm';
import { VIEWS } from './constants/columns';

const App = () => {
  const { jobs, loading, addJob, updateJob, deleteJob, moveJob } = useJobs();
  const { resumes } = useResumes();
  
  const [currentView, setCurrentView] = useState(VIEWS.DASHBOARD);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleAddClick = () => {
    setEditingJob(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (jobData) => {
    if (editingJob) {
      await updateJob(editingJob.id, jobData);
    } else {
      await addJob(jobData);
    }
    setIsFormOpen(false);
  };

  const renderView = () => {
    switch (currentView) {
      case VIEWS.DASHBOARD:
        return <DashboardView jobs={jobs} />;
      case VIEWS.APPLICATIONS:
        return (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="px-10 py-8 flex justify-between items-center bg-jobflow-bg/80 backdrop-blur-sm sticky top-0 z-10 border-b border-jobflow-border/50">
               <div>
                  <h2 className="text-3xl font-black text-jobflow-text tracking-tight">Application Board</h2>
                  <div className="flex items-center gap-4 mt-2">
                     <span className="text-[10px] font-black text-jobflow-text-dim uppercase tracking-[0.2em] border border-jobflow-border px-2 py-1 rounded-md cursor-pointer hover:border-jobflow-accent transition-all flex items-center gap-1">
                        ⇅ Sort by Date
                     </span>
                     <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-8 h-4 bg-jobflow-card border border-jobflow-border rounded-full relative group-hover:border-jobflow-accent transition-all">
                           <div className="absolute left-1 top-1 w-2 h-2 bg-jobflow-text-dim rounded-full transition-all"></div>
                        </div>
                        <span className="text-[10px] font-black text-jobflow-text-dim uppercase tracking-widest">Urgent Only</span>
                     </label>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="flex bg-jobflow-card border border-jobflow-border p-1 rounded-xl">
                     <button className="px-3 py-1.5 text-[10px] font-black uppercase text-white bg-jobflow-accent rounded-lg shadow-sm">Kanban</button>
                     <button className="px-3 py-1.5 text-[10px] font-black uppercase text-jobflow-text-dim hover:text-jobflow-text transition-all">Table</button>
                     <button className="px-3 py-1.5 text-[10px] font-black uppercase text-jobflow-text-dim hover:text-jobflow-text transition-all">Stats</button>
                  </div>
                  <button 
                    onClick={handleAddClick}
                    className="bg-jobflow-accent hover:bg-jobflow-accent/80 text-white px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-lg shadow-jobflow-accent/20 active:scale-95"
                  >
                    + Add Job
                  </button>
               </div>
            </div>
            <KanbanBoard 
              jobs={jobs} 
              onMove={moveJob} 
              onEdit={handleEditClick} 
              onDelete={setDeletingId} 
            />
          </div>
        );
      case VIEWS.ANALYTICS:
        return <AnalyticsView jobs={jobs} />;
      case VIEWS.RESUMES:
        return <ResumesView resumes={resumes} onAdd={() => alert('Add Resume feature coming soon!')} />;
      case VIEWS.INTERVIEWS:
        return <InterviewsView jobs={jobs} />;
      default:
        return <DashboardView jobs={jobs} />;
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen bg-jobflow-bg flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-jobflow-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="text-jobflow-text-dim font-black text-xs uppercase tracking-[0.3em] animate-pulse">Initializing JobFlow AI...</p>
         </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex bg-jobflow-bg text-jobflow-text overflow-hidden">
      <RailNav currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex flex-col flex-1 min-w-0">
        <TopNav 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          theme={theme} 
          onThemeToggle={toggleTheme} 
        />
        
        <main className="flex flex-1 min-h-0 overflow-hidden">
          <Sidebar jobs={jobs} currentView={currentView} />
          <div className="flex-1 min-w-0 h-full overflow-hidden bg-jobflow-bg/30">
            {renderView()}
          </div>
        </main>
      </div>

      <JobFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        job={editingJob}
      />

      <DeleteConfirm
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={async () => {
          await deleteJob(deletingId);
          setDeletingId(null);
        }}
        jobTitle={jobs.find((j) => j.id === deletingId)?.company || 'this job'}
      />
    </div>
  );
};

export default App;
