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
  /** Whether the user has already made a motion choice (modal dismissed) */
  hasChosenMotion: boolean;
  /** Set motion preference explicitly (used by the modal) */
  setMotionPreference: (reduceMotion: boolean) => void;
}

const MotionContext = createContext<MotionContextValue>({
  prefersReducedMotion: false,
  toggleReducedMotion: () => {},
  hasChosenMotion: false,
  setMotionPreference: () => {},
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

  const setMotionPreference = useCallback((reduceMotion: boolean) => {
    setManualOverride(reduceMotion);
    localStorage.setItem('reduce-motion', String(reduceMotion));
  }, []);

  const prefersReducedMotion = manualOverride ?? osPreference;
  const hasChosenMotion = manualOverride !== null;

  return (
    <MotionContext.Provider value={{ prefersReducedMotion, toggleReducedMotion, hasChosenMotion, setMotionPreference }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useReducedMotion(): MotionContextValue {
  return useContext(MotionContext);
}
