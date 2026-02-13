import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../lib/motionContext';
import { getFadeUpVariants } from '../lib/animations';
import type { SectionId } from '../data/siteData';

interface SectionProps {
  id: SectionId;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  /** Full-bleed hero sections skip max-width container */
  fullBleed?: boolean;
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  fullBleed = false,
}: SectionProps) {
  const { prefersReducedMotion } = useReducedMotion();
  const variants = getFadeUpVariants(prefersReducedMotion);

  return (
    <section
      id={id}
      className={`relative ${fullBleed ? '' : 'mx-auto max-w-6xl px-4 sm:px-6'} ${className}`}
    >
      {(title || subtitle) && (
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 md:mb-16"
        >
          {subtitle && (
            <p className="text-electric-400 font-mono text-sm tracking-wider uppercase mb-2">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {title}
            </h2>
          )}
        </motion.div>
      )}
      {children}
    </section>
  );
}
