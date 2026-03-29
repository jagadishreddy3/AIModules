import { useEffect, useState, useCallback } from 'react';
import { openDB } from 'idb';

const DB_NAME = 'JobTrackerDB';
const STORE_RESUMES = 'resumes';

export const useResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const initDB = useCallback(async () => {
    return openDB(DB_NAME, 2);
  }, []);

  const loadResumes = useCallback(async () => {
    setLoading(true);
    const db = await initDB();
    const allResumes = await db.getAll(STORE_RESUMES);
    setResumes(allResumes || []);
    setLoading(false);
  }, [initDB]);

  useEffect(() => {
    loadResumes();
  }, [loadResumes]);

  const addResume = async (resumeData) => {
    const db = await initDB();
    const id = crypto.randomUUID();
    const newResume = {
      ...resumeData,
      id,
      lastModified: new Date().toISOString(),
    };
    await db.add(STORE_RESUMES, newResume);
    await loadResumes();
    return id;
  };

  const updateResume = async (id, updates) => {
    const db = await initDB();
    const existing = await db.get(STORE_RESUMES, id);
    const updated = {
      ...existing,
      ...updates,
      lastModified: new Date().toISOString(),
    };
    await db.put(STORE_RESUMES, updated);
    await loadResumes();
  };

  const deleteResume = async (id) => {
    const db = await initDB();
    await db.delete(STORE_RESUMES, id);
    await loadResumes();
  };

  return {
    resumes,
    loading,
    addResume,
    updateResume,
    deleteResume,
    refreshResumes: loadResumes,
  };
};
