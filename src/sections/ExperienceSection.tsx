import { siteData } from '@/data/siteData';
import { Section } from '@/components/Section';
import { Timeline } from '@/components/Timeline';

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="Where I've worked"
      className="py-24 md:py-32"
    >
      <Timeline entries={siteData.experience} />
    </Section>
  );
}
