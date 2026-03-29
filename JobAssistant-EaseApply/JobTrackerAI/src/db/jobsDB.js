import { openDB } from 'idb';

const DATABASE_NAME = 'JobFlowDB';
const DATABASE_VERSION = 2;
export const STORE_JOBS = 'jobs';
export const STORE_RESUMES = 'resumes';

export const initDB = async () => {
  return openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction) {
      if (!db.objectStoreNames.contains(STORE_JOBS)) {
        db.createObjectStore(STORE_JOBS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_RESUMES)) {
        db.createObjectStore(STORE_RESUMES, { keyPath: 'id' });
      }
    },
  });
};

export const addJob = async (job) => {
  const db = await initDB();
  return db.add(STORE_JOBS, job);
};

export const getAllJobs = async () => {
  const db = await initDB();
  return db.getAll(STORE_JOBS);
};

export const updateJob = async (job) => {
  const db = await initDB();
  return db.put(STORE_JOBS, job);
};

export const deleteJob = async (id) => {
  const db = await initDB();
  return db.delete(STORE_JOBS, id);
};

export const addResume = async (resume) => {
  const db = await initDB();
  return db.add(STORE_RESUMES, resume);
};

export const getAllResumes = async () => {
  const db = await initDB();
  return db.getAll(STORE_RESUMES);
};

export const deleteResume = async (id) => {
  const db = await initDB();
  return db.delete(STORE_RESUMES, id);
};

export const importJobs = async (jobs) => {
  const db = await initDB();
  const tx = db.transaction(STORE_JOBS, 'readwrite');
  await tx.store.clear();
  for (const job of jobs) {
    await tx.store.put(job);
  }
  await tx.done;
};
