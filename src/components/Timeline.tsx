import { motion } from 'framer-motion';
import type { ExperienceEntry } from '../data/siteData';
import { useReducedMotion } from '../lib/motionContext';
import { getFadeUpVariants, getStaggerContainer } from '../lib/animations';
import { Tag } from '@/components/Tag';

interface TimelineProps {
  entries: ExperienceEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  const { prefersReducedMotion } = useReducedMotion();
  const containerVariants = getStaggerContainer(prefersReducedMotion);
  const itemVariants = getFadeUpVariants(prefersReducedMotion);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative"
    >
      {/* Vertical line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-electric-500/50 via-electric-500/20 to-transparent" />

      <div className="space-y-12">
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            variants={itemVariants}
            className="relative pl-12 md:pl-20"
          >
            {/* Dot */}
            <span className="absolute left-[11px] md:left-[27px] top-2 h-3 w-3 rounded-full bg-electric-500 ring-4 ring-navy-950 shadow-lg shadow-electric-500/30" />

            {/* Card */}
            <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 md:p-8 backdrop-blur-sm hover:border-electric-500/20 hover:bg-white/[0.05] transition-all duration-500">
              {/* Glow on hover */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-electric-500/10 via-transparent to-electric-500/5" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{entry.company}</h3>
                  <p className="text-white/60 text-sm">{entry.role}</p>
                </div>
                <span className="text-electric-400 font-mono text-sm whitespace-nowrap">
                  {entry.duration}
                </span>
              </div>

              <p className="text-white/50 text-sm leading-relaxed mb-4">
                {entry.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {entry.stack.map((tech) => (
                  <Tag
                    key={tech}
                    variant="info"
                  >
                    {tech}
                  </Tag>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
