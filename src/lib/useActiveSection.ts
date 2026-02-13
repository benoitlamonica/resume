import { useState, useEffect, useRef } from 'react';
import type { SectionId } from '../data/siteData';

export function useActiveSection(sectionIds: SectionId[]): SectionId {
  const [activeId, setActiveId] = useState<SectionId>(sectionIds[0] ?? 'hero');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current?.disconnect();

    const entries = new Map<string, IntersectionObserverEntry>();

    observer.current = new IntersectionObserver(
      (observedEntries) => {
        for (const entry of observedEntries) {
          entries.set(entry.target.id, entry);
        }

        // Find the topmost visible section
        for (const id of sectionIds) {
          const entry = entries.get(id);
          if (entry?.isIntersecting) {
            setActiveId(id);
            break;
          }
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.current.observe(el);
    }

    return () => observer.current?.disconnect();
  }, [sectionIds]);

  return activeId;
}
