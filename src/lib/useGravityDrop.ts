import { useEffect, useCallback, useRef, useState } from 'react';

/**
 * Activates a gravity-drop effect: all main content elements fall down
 * with simulated physics, then reset after `durationMs`.
 */
export function useGravityDrop(triggerWord: string, durationMs = 3000) {
  const [active, setActive] = useState(false);
  const bufferRef = useRef('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key.length !== 1) return;

      bufferRef.current += e.key.toLowerCase();
      if (bufferRef.current.length > triggerWord.length) {
        bufferRef.current = bufferRef.current.slice(-triggerWord.length);
      }

      if (bufferRef.current === triggerWord.toLowerCase()) {
        bufferRef.current = '';
        setActive(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerWord]);

  const drop = useCallback(() => {
    const selector =
      'section, nav, footer, .section-divider';
    const elements = document.querySelectorAll<HTMLElement>(selector);

    elements.forEach((el) => {
      // Random lateral wobble
      const wobble = (Math.random() - 0.5) * 30;
      const rotation = (Math.random() - 0.5) * 15;

      el.style.transition = `transform ${1.2 + Math.random() * 0.6}s cubic-bezier(0.22, 1, 0.36, 1)`;
      el.style.transform = `translateY(120vh) rotate(${rotation}deg) translateX(${wobble}px)`;
    });

    setTimeout(() => {
      elements.forEach((el) => {
        el.style.transition = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.transform = '';
      });
      // Clean up inline styles after animation
      setTimeout(() => {
        elements.forEach((el) => {
          el.style.transition = '';
        });
        setActive(false);
      }, 900);
    }, durationMs);
  }, [durationMs]);

  useEffect(() => {
    if (active) drop();
  }, [active, drop]);

  return active;
}
