import { Nav } from './components/Nav';
import { NoiseOverlay } from './components/NoiseOverlay';
import { SpotlightCursor } from './components/SpotlightCursor';
import { HeroSection } from './sections/HeroSection';
import { AISection } from './sections/AISection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { LookingForSection } from './sections/LookingForSection';
import { Footer } from './sections/Footer';

function Divider() {
  return <div className="section-divider mx-auto max-w-6xl" aria-hidden="true" />;
}

export default function App() {
  return (
    <>
      <NoiseOverlay />
      <SpotlightCursor />
      <Nav />

      <main>
        <HeroSection />
        <Divider />
        <AISection />
        <Divider />
        <ExperienceSection />
        <Divider />
        <ProjectsSection />
        <Divider />
        <LookingForSection />
      </main>

      <Footer />
    </>
  );
}
