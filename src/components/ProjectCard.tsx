import { motion } from 'framer-motion';
import type { ProjectEntry } from '@/data/siteData';
import { useReducedMotion } from '@/lib/motionContext';
import { getFadeUpVariants } from '@/lib/animations';
import { Tag } from '@/components/Tag';

interface ProjectCardProps {
  project: ProjectEntry;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { prefersReducedMotion } = useReducedMotion();
  const variants = getFadeUpVariants(prefersReducedMotion);

  return (
    <motion.div
      variants={variants}
      className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm hover:border-electric-500/20 hover:bg-white/[0.05] transition-all duration-500"
    >
      {/* Glow overlay */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-electric-500/10 via-transparent to-electric-500/5" />

      {/* Number badge */}
      <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-electric-500/10 text-electric-400 font-mono text-sm font-bold mb-4">
        {project.id.replace('project-', '').toUpperCase().charAt(0)}
      </span>

      <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
      <p className="text-white/50 text-sm leading-relaxed mb-4 flex-grow">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag
            key={tag}
            variant="default"
          >
            {tag}
          </Tag>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center text-sm text-electric-400 hover:text-electric-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 rounded"
        >
          View →
        </a>
      )}
    </motion.div>
  );
}
