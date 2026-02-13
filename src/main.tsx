import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionProvider } from './lib/motionContext';
import { siteData } from './data/siteData';
import App from './App';
import './index.css';

// ── Secret console message for fellow devs ────────────────────────────────
const { easterEggs } = siteData;
console.log(
  `%c${easterEggs.consoleAscii}`,
  'color: #3b82f6; font-family: monospace; font-size: 12px; line-height: 1.4;',
);
console.log(
  `%c${easterEggs.consoleMessage}`,
  'color: #60a5fa; font-size: 13px; font-style: italic; padding: 4px 0;',
);
console.log(
  `%c🥚 Psst… there are a few secrets hidden in this site:\n\n${easterEggs.consoleHints.join('\n')}`,
  'color: #a78bfa; font-family: monospace; font-size: 12px; line-height: 1.6; padding: 4px 0;',
);

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <MotionProvider>
      <App />
    </MotionProvider>
  </StrictMode>,
);
