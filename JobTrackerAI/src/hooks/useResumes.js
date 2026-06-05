import { useState, useEffect } from 'react';
import * as db from '../db/jobsDB';

export const useResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        const allResumes = await db.getAllResumes();
        setResumes(allResumes);
      } catch (error) {
        console.error('Failed to load resumes:', error);
      } finally {
        setLoading(false);
      }
    };
    loadResumes();
  }, []);

  const addResume = async (resumeData) => {
    const newResume = {
      ...resumeData,
      id: crypto.randomUUID(),
      lastModified: new Date().toISOString(),
    };
    await db.addResume(newResume);
    setResumes((prev) => [...prev, newResume]);
    return newResume;
  };

  const deleteResume = async (id) => {
    await db.deleteResume(id);
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  return {
    resumes,
    loading,
    addResume,
    deleteResume,
  };
};
