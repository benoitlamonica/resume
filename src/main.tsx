import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionProvider } from './lib/motionContext';
import App from './App';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <MotionProvider>
      <App />
    </MotionProvider>
  </StrictMode>,
);
