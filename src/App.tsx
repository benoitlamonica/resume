import { Nav } from './components/Nav';
import { NoiseOverlay } from './components/NoiseOverlay';
import { SpotlightCursor } from './components/SpotlightCursor';
import { MotionModal } from './components/MotionModal';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import { EasterEggToast } from './components/EasterEggToast';
import { HeroSection } from './sections/HeroSection';
import { AISection } from './sections/AISection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { LookingForSection } from './sections/LookingForSection';
import { Footer } from './sections/Footer';
import { useKonamiCode } from './lib/useKonamiCode';
import { useSecretWord } from './lib/useSecretWord';
import { useGravityDrop } from './lib/useGravityDrop';
import { siteData } from './data/siteData';

function Divider() {
  return <div className="section-divider mx-auto max-w-6xl" aria-hidden="true" />;
}

export default function App() {
  const { easterEggs } = siteData;

  // ── Easter eggs ──
  const konamiActive = useKonamiCode();
  const devWordActive = useSecretWord('dev');
  useGravityDrop(easterEggs.gravityKeys);

  return (
    <>
      <MotionModal />
      <ConfettiCanvas active={konamiActive} />
      <EasterEggToast message={easterEggs.devToast} visible={devWordActive} />
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
