import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData } from '../data/siteData';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { HeroBackground } from '../components/HeroBackground';
import { useReducedMotion } from '../lib/motionContext';
import { getFadeUpVariants, getStaggerContainer } from '../lib/animations';
import { useKonamiCode } from '../lib/useKonamiCode';

export function HeroSection() {
  const { hero, socials, easterEggs } = siteData;
  const { prefersReducedMotion } = useReducedMotion();
  const fadeUp = getFadeUpVariants(prefersReducedMotion);
  const stagger = getStaggerContainer(prefersReducedMotion);
  const konamiActive = useKonamiCode();

  // ── Click-name joke titles ──
  const [clickCount, setClickCount] = useState(0);
  const [jokeTitle, setJokeTitle] = useState<string | null>(null);

  const handleNameClick = useCallback(() => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5) {
      const idx = (Math.floor((next - 5) / 1)) % easterEggs.jokeTitles.length;
      setJokeTitle(easterEggs.jokeTitles[idx] ?? null);
    }
  }, [clickCount, easterEggs.jokeTitles]);

  const displayTagline = konamiActive
    ? easterEggs.konamiTagline
    : jokeTitle ?? hero.tagline;

  const githubLink = socials.find((s) => s.icon === 'github')?.url ?? '#';
  const emailLink = socials.find((s) => s.icon === 'email')?.url ?? '#';

  return (
    <Section id="hero" fullBleed className="relative min-h-svh flex items-center justify-center py-32 overflow-hidden">
      <HeroBackground />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center"
      >
        {/* Greeting pill */}
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-glow-pulse" />
            {hero.greeting} — Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4"
        >
          <span
            onClick={handleNameClick}
            className="cursor-pointer select-none transition-transform duration-200 hover:scale-[1.02] inline-block"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNameClick(); }}
            aria-label={`Click me ${5 - Math.min(clickCount, 5)} more times for a surprise`}
          >
            {hero.name}
          </span>
          <span className="text-electric-400">.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="text-xl sm:text-2xl md:text-3xl font-light text-white/60 mb-6"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={displayTagline}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              {displayTagline}
            </motion.span>
          </AnimatePresence>
        </motion.p>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="max-w-2xl mx-auto text-base sm:text-lg text-white/40 leading-relaxed mb-10"
        >
          {hero.description}
        </motion.p>

        {/* Highlight pills */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {hero.highlights.map((h) => (
            <span
              key={h.text}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white/70 backdrop-blur-sm"
            >
              <span>{h.icon}</span>
              {h.text}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button href={emailLink} variant="primary">
            Get in touch
          </Button>
          <Button href={githubLink} target="_blank" rel="noopener noreferrer" variant="secondary">
            GitHub
          </Button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={fadeUp}
          className="mt-20"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white/20 text-2xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
