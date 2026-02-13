import { useEffect, useRef, useState } from 'react';

/**
 * Listens for a secret word typed anywhere on the page.
 * Returns `true` once the word is fully typed, then resets after `resetMs`.
 */
export function useSecretWord(word: string, resetMs = 5000): boolean {
  const [activated, setActivated] = useState(false);
  const bufferRef = useRef('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore modifier keys and non-printable
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key.length !== 1) return;

      bufferRef.current += e.key.toLowerCase();

      // Keep buffer trimmed to word length
      if (bufferRef.current.length > word.length) {
        bufferRef.current = bufferRef.current.slice(-word.length);
      }

      if (bufferRef.current === word.toLowerCase()) {
        setActivated(true);
        bufferRef.current = '';
        setTimeout(() => setActivated(false), resetMs);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [word, resetMs]);

  return activated;
}
