import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SettingsProvider } from './context/SettingsContext'
import { HistoryProvider } from './context/HistoryContext'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <HistoryProvider>
          <App />
        </HistoryProvider>
      </SettingsProvider>
    </BrowserRouter>
  </StrictMode>,
)
