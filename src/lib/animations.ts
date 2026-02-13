import type { Variants } from 'framer-motion';

/**
 * Returns Framer Motion variants that respect reduced-motion preference.
 * When reduced, animations are instant (no transform, no delay).
 */
export function getFadeUpVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    };
  }
  return {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };
}

export function getStaggerContainer(reduced: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.15,
        delayChildren: reduced ? 0 : 0.1,
      },
    },
  };
}
