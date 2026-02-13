import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

interface MotionContextValue {
  /** True when motion should be reduced (user toggle OR OS preference) */
  prefersReducedMotion: boolean;
  /** Manual toggle override */
  toggleReducedMotion: () => void;
}

const MotionContext = createContext<MotionContextValue>({
  prefersReducedMotion: false,
  toggleReducedMotion: () => {},
});

export function MotionProvider({ children }: { children: ReactNode }) {
  const [osPreference, setOsPreference] = useState(false);
  const [manualOverride, setManualOverride] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setOsPreference(mq.matches);
    const handler = (e: MediaQueryListEvent) => setOsPreference(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem('reduce-motion');
    if (saved !== null) {
      setManualOverride(saved === 'true');
    }
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setManualOverride((prev) => {
      const next = prev === null ? !osPreference : !prev;
      localStorage.setItem('reduce-motion', String(next));
      return next;
    });
  }, [osPreference]);

  const prefersReducedMotion = manualOverride ?? osPreference;

  return (
    <MotionContext.Provider value={{ prefersReducedMotion, toggleReducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useReducedMotion(): MotionContextValue {
  return useContext(MotionContext);
}
