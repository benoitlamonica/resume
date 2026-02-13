import { motion } from 'framer-motion';
import { siteData } from '@/data/siteData';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { useReducedMotion } from '@/lib/motionContext';
import { getFadeUpVariants, getStaggerContainer } from '@/lib/animations';

export function LookingForSection() {
  const { lookingFor, socials } = siteData;
  const { prefersReducedMotion } = useReducedMotion();
  const fadeUp = getFadeUpVariants(prefersReducedMotion);
  const stagger = getStaggerContainer(prefersReducedMotion);

  const emailLink = socials.find((s) => s.icon === 'email')?.url ?? '#';

  return (
    <Section
      id="looking-for"
      title={lookingFor.title}
      subtitle="Next chapter"
      className="py-24 md:py-32"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-10"
      >
        <motion.p variants={fadeUp} className="max-w-3xl text-lg text-white/60 leading-relaxed">
          {lookingFor.description}
        </motion.p>

        {/* Role pills */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          {lookingFor.roles.map((role) => (
            <span
              key={role}
              className="px-4 py-2 rounded-xl bg-electric-500/10 text-electric-400 border border-electric-500/20 text-sm font-medium"
            >
              {role}
            </span>
          ))}
        </motion.div>

        <motion.p variants={fadeUp} className="max-w-3xl text-base text-white/40 leading-relaxed">
          {lookingFor.preference}
        </motion.p>

        <motion.div variants={fadeUp}>
          <Button href={emailLink} variant="primary">
            Let's talk →
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}
