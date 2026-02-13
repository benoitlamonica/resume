import { useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from '../lib/motionContext';

/**
 * Subtle radial spotlight that follows the cursor on desktop.
 * Disabled when reduced motion is active or on touch devices.
 */
export function SpotlightCursor() {
  const { prefersReducedMotion } = useReducedMotion();
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isTouch) return;
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion, isTouch, handleMouseMove]);

  if (prefersReducedMotion || isTouch) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] transition-opacity duration-300"
      aria-hidden="true"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.06), transparent 40%)`,
      }}
    />
  );
}
