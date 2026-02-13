import { motion } from 'framer-motion';
import { siteData } from '../data/siteData';
import { Section } from '../components/Section';
import { useReducedMotion } from '../lib/motionContext';
import { getFadeUpVariants, getStaggerContainer } from '../lib/animations';

export function AISection() {
  const { ai } = siteData;
  const { prefersReducedMotion } = useReducedMotion();
  const fadeUp = getFadeUpVariants(prefersReducedMotion);
  const stagger = getStaggerContainer(prefersReducedMotion);

  return (
    <Section id="ai" title={ai.title} subtitle={ai.subtitle} className="py-24 md:py-32">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-12"
      >
        {/* Intro */}
        <motion.div variants={fadeUp} className="max-w-3xl">
          <p className="text-lg text-white/60 leading-relaxed mb-4">{ai.intro}</p>
          <p className="text-base text-white/40 leading-relaxed italic">{ai.philosophy}</p>
        </motion.div>

        {/* Workflow steps */}
        <motion.div
          variants={stagger}
          className="grid gap-6 sm:grid-cols-3"
        >
          {ai.workflow.map((step) => (
            <motion.div
              key={step.step}
              variants={fadeUp}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm hover:border-electric-500/20 hover:bg-white/[0.05] transition-all duration-500"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-electric-500/10 via-transparent to-transparent" />

              {/* Step number */}
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-electric-500/10 text-electric-400 font-mono text-sm font-bold mb-4">
                {String(step.step).padStart(2, '0')}
              </span>

              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
