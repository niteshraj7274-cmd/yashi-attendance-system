import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SyncProvider } from './components/SyncContext';
import './index.css';

const originalConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && (args[0].includes('Could not reach Cloud Firestore backend') || args[0].includes('client is offline'))) {
    return;
  }
  if (args[0] && typeof args[0] === 'object' && args[0].message && args[0].message.includes('client is offline')) {
    return;
  }
  if (typeof args[1] === 'object' && args[1] && args[1].message && args[1].message.includes('client is offline')) {
    return;
  }
  originalConsoleError(...args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <SyncProvider>
        <App />
      </SyncProvider>
    </ErrorBoundary>
  </StrictMode>,
);
