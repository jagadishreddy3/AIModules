import { createContext, useContext, useState, type ReactNode } from 'react';

export interface HistoryEntry {
  id: string;
  title: string;
  requirement: string;
  output: string;
  timestamp: number;
  provider: string;
}

interface HistoryContextValue {
  history: HistoryEntry[];
  addEntry: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
  removeEntry: (id: string) => void;
  clearHistory: () => void;
  getEntry: (id: string) => HistoryEntry | undefined;
}

const HistoryContext = createContext<HistoryContextValue | null>(null);

const STORAGE_KEY = 'testcasegen_history';

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const saveToStorage = (newHistory: HistoryEntry[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  const addEntry = (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    setHistory(prev => {
      const updated = [newEntry, ...prev].slice(0, 50); // Keep last 50 entries
      saveToStorage(updated);
      return updated;
    });
  };

  const removeEntry = (id: string) => {
    setHistory(prev => {
      const updated = prev.filter(e => e.id !== id);
      saveToStorage(updated);
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getEntry = (id: string) => history.find(e => e.id === id);

  return (
    <HistoryContext.Provider value={{ history, addEntry, removeEntry, clearHistory, getEntry }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error('useHistory must be used inside HistoryProvider');
  return ctx;
}
