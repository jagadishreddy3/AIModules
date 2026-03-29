import { createContext, useContext, useState, type ReactNode } from 'react';

export type Provider = 'ollama' | 'groq' | 'openai';

export interface ProviderSettings {
  ollamaUrl: string;
  ollamaModel: string;
  groqApiKey: string;
  groqModel: string;
  openaiApiKey: string;
  openaiModel: string;
  activeProvider: Provider;
}

const defaultSettings: ProviderSettings = {
  ollamaUrl: 'http://localhost:11434',
  ollamaModel: 'gemma3:1b',
  groqApiKey: '',
  groqModel: 'llama3-8b-8192',
  openaiApiKey: '',
  openaiModel: 'gpt-4-turbo-preview',
  activeProvider: 'ollama',
};

const STORAGE_KEY = 'testcasegen_settings';

interface SettingsContextValue {
  settings: ProviderSettings;
  updateSettings: (partial: Partial<ProviderSettings>) => void;
  saveSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ProviderSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const updateSettings = (partial: Partial<ProviderSettings>) => {
    setSettings(prev => ({ ...prev, ...partial }));
  };

  const saveSettings = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}
