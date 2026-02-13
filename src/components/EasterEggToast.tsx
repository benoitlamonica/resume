import { AnimatePresence, motion } from 'framer-motion';

interface EasterEggToastProps {
  message: string;
  visible: boolean;
}

export function EasterEggToast({ message, visible }: EasterEggToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-[9998] -translate-x-1/2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-xl border border-white/10 bg-navy-900/95 px-6 py-3 text-sm text-white/80 shadow-2xl shadow-electric-500/10 backdrop-blur-md">
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
