import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '../lib/motionContext';
import { siteData } from '../data/siteData';

export function MotionModal() {
  const { hasChosenMotion, setMotionPreference } = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);

  const { title, description, enableLabel, disableLabel } =
    siteData.motionModal;

  // Trap focus inside the modal when open
  useEffect(() => {
    if (hasChosenMotion) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return; // don't dismiss on Escape — force a choice

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [hasChosenMotion]);

  // Auto-focus the first button on mount
  useEffect(() => {
    if (!hasChosenMotion && dialogRef.current) {
      const firstBtn = dialogRef.current.querySelector<HTMLButtonElement>('button');
      firstBtn?.focus();
    }
  }, [hasChosenMotion]);

  return (
    <AnimatePresence>
      {!hasChosenMotion && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />

          {/* Modal card */}
          <motion.div
            ref={dialogRef}
            className="relative mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-navy-900/95 p-8 shadow-2xl shadow-electric-500/10 backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Icon */}
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-electric-500/10 text-2xl">
              ✨
            </div>

            {/* Title */}
            <h2 className="mb-2 text-xl font-semibold text-white">
              {title}
            </h2>

            {/* Description */}
            <p className="mb-8 text-sm leading-relaxed text-white/60">
              {description}
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setMotionPreference(false)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-electric-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-electric-500/25 transition-all duration-300 hover:bg-electric-600 hover:shadow-electric-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
              >
                <span className="text-base">🚀</span>
                {enableLabel}
              </button>

              <button
                type="button"
                onClick={() => setMotionPreference(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
              >
                <span className="text-base">🧘</span>
                {disableLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
