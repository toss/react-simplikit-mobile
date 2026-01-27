import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { BodyScrollLockUtilDemo } from './pages/demos/BodyScrollLockUtilDemo.tsx';
import { IsServerDemo } from './pages/demos/IsServerDemo.tsx';
import { UseBodyScrollLockDemo } from './pages/demos/UseBodyScrollLockDemo.tsx';
import { UseScrollDirectionDemo } from './pages/demos/UseScrollDirectionDemo.tsx';
import { UseVisualViewportDemo } from './pages/demos/UseVisualViewportDemo.tsx';
import { ExperimentsIndex } from './pages/experiments/index.tsx';
import { LandingClaudeCode } from './pages/experiments/LandingClaudeCode.tsx';
import { LandingBento } from './pages/experiments/LandingBento.tsx';
import { LandingGradientOrb } from './pages/experiments/LandingGradientOrb.tsx';
import { LandingApple } from './pages/experiments/LandingApple.tsx';
import { LandingDarkModern } from './pages/experiments/LandingDarkModern.tsx';
import { LandingDeveloper } from './pages/experiments/LandingDeveloper.tsx';
import { LandingFoundation } from './pages/experiments/LandingFoundation.tsx';
import { LandingMinimal } from './pages/experiments/LandingMinimal.tsx';
import { LandingPremium } from './pages/experiments/LandingPremium.tsx';
import { Home } from './pages/Home.tsx';
import { Landing } from './pages/Landing.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/experiments" element={<ExperimentsIndex />} />
        <Route path="/experiments/minimal" element={<LandingMinimal />} />
        <Route path="/experiments/premium" element={<LandingPremium />} />
        <Route path="/experiments/developer" element={<LandingDeveloper />} />
        <Route path="/experiments/foundation" element={<LandingFoundation />} />
        <Route path="/experiments/dark-modern" element={<LandingDarkModern />} />
        <Route path="/experiments/claude-code" element={<LandingClaudeCode />} />
        <Route path="/experiments/bento" element={<LandingBento />} />
        <Route path="/experiments/gradient-orb" element={<LandingGradientOrb />} />
        <Route path="/experiments/apple" element={<LandingApple />} />
        <Route path="/demos/is-server" element={<IsServerDemo />} />
        <Route path="/demos/use-body-scroll-lock" element={<UseBodyScrollLockDemo />} />
        <Route path="/demos/use-scroll-direction" element={<UseScrollDirectionDemo />} />
        <Route path="/demos/use-visual-viewport" element={<UseVisualViewportDemo />} />
        <Route path="/demos/body-scroll-lock-util" element={<BodyScrollLockUtilDemo />} />
      </Routes>
    </BrowserRouter>
  );
}
