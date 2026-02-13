import { Suspense, lazy } from 'react';
import { useReducedMotion } from '../lib/motionContext';
import { useWebGLSupport } from '../lib/useWebGLSupport';

// Lazy-load the R3F canvas to keep initial bundle small
const Scene3D = lazy(() => import('./Scene3D'));

/**
 * Hero background: renders a Three.js particle scene when WebGL is available
 * and motion is enabled. Falls back to a static gradient otherwise.
 */
export function HeroBackground() {
  const { prefersReducedMotion } = useReducedMotion();
  const webglSupported = useWebGLSupport();

  const shouldRender3D = webglSupported && !prefersReducedMotion;

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Static gradient fallback — always present behind the 3D scene */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />

      {/* Decorative radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-electric-500/[0.07] blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-electric-600/[0.05] blur-[100px]" />

      {/* 3D Scene */}
      {shouldRender3D && (
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      )}
    </div>
  );
}
