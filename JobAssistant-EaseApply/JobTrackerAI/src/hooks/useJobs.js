import { useState, useEffect, useMemo } from 'react';
import * as db from '../db/jobsDB';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const allJobs = await db.getAllJobs();
        setJobs(allJobs);
      } catch (error) {
        console.error('Failed to load jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const addJob = async (jobData) => {
    const newJob = {
      ...jobData,
      id: crypto.randomUUID(),
      dateApplied: jobData.dateApplied || new Date().toISOString().split('T')[0],
      order: jobs.length,
    };
    await db.addJob(newJob);
    setJobs((prev) => [...prev, newJob]);
    return newJob;
  };

  const updateJob = async (id, updates) => {
    const updatedJob = { ...jobs.find((j) => j.id === id), ...updates };
    await db.updateJob(updatedJob);
    setJobs((prev) => prev.map((j) => (j.id === id ? updatedJob : j)));
  };

  const deleteJob = async (id) => {
    await db.deleteJob(id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const moveJob = async (id, newStatus, newIndex) => {
    setJobs((prev) => {
      const filtered = prev.filter(j => j.id !== id);
      const movingJob = prev.find(j => j.id === id);
      const updatedJob = { ...movingJob, status: newStatus };
      
      // Update DB
      db.updateJob(updatedJob);
      
      // We don't strictly manage order in DB for now to keep it simple, 
      // but we update status immediately in state
      return [...filtered, updatedJob];
    });
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(jobs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `job-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importJSON = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const importedJobs = JSON.parse(e.target.result);
        await db.importJobs(importedJobs);
        setJobs(importedJobs);
      } catch (error) {
        console.error('Failed to import jobs:', error);
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return {
    jobs,
    loading,
    addJob,
    updateJob,
    deleteJob,
    moveJob,
    exportJSON,
    importJSON,
  };
};
