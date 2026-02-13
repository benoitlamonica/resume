import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { siteData, type SectionId } from '@/data/siteData';
import { useActiveSection } from '@/lib/useActiveSection';
import { useReducedMotion } from '@/lib/motionContext';

const sectionIds = siteData.nav.map((n) => n.id);

export function Nav() {
  const activeId = useActiveSection(sectionIds);
  const { prefersReducedMotion, toggleReducedMotion } = useReducedMotion();

  const handleClick = useMemo(
    () => (id: SectionId) => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    },
    [prefersReducedMotion],
  );

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-navy-950/70 border-b border-white/5"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Logo */}
        <button
          onClick={() => handleClick('hero')}
          className="text-lg font-bold tracking-tight text-white hover:text-electric-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 rounded-sm"
        >
          B<span className="text-electric-400">.</span>
        </button>

        {/* Nav links — hidden on very small screens */}
        <ul className="hidden sm:flex items-center gap-1">
          {siteData.nav.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`
                  relative px-3 py-2 text-sm font-medium rounded-md transition-colors
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500
                  ${
                    activeId === item.id
                      ? 'text-white'
                      : 'text-white/50 hover:text-white/80'
                  }
                `}
                aria-current={activeId === item.id ? 'page' : undefined}
              >
                {item.label}
                {activeId === item.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-white/10 rounded-md -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleReducedMotion}
            className="p-2 rounded-md text-xs text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500"
            aria-label={prefersReducedMotion ? 'Enable animations' : 'Reduce motion'}
            title={prefersReducedMotion ? 'Enable animations' : 'Reduce motion'}
          >
            {prefersReducedMotion ? '▶ Motion' : '⏸ Motion'}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
