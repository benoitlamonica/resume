import { motion } from 'framer-motion';
import { siteData } from '@/data/siteData';
import { Section } from '@/components/Section';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/Button';
import { useReducedMotion } from '@/lib/motionContext';
import { getStaggerContainer } from '@/lib/animations';

export function ProjectsSection() {
  const { projects, socials } = siteData;
  const { prefersReducedMotion } = useReducedMotion();
  const stagger = getStaggerContainer(prefersReducedMotion);
  const githubLink = socials.find((s) => s.icon === 'github')?.url ?? '#';

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Selected work"
      className="py-24 md:py-32"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>

      <div className="text-center">
        <Button
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
        >
          See more on GitHub →
        </Button>
      </div>
    </Section>
  );
}
