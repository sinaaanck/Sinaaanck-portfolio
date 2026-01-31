import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkSection } from './components/WorkSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { NotFound } from './components/NotFound';
import { IslamicPatternCanvas } from './components/IslamicPatternCanvas';
import { ComplexIslamicBackground } from './components/ComplexIslamicBackground';
import { CustomCursor } from './components/CustomCursor';
import { ProgressiveBlur } from './components/ProgressiveBlur';
import { AsciiScene } from './components/ascii-scene';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Layout Wrapper
const MainContent = () => (
  <>
    <Navbar />
    <Hero />
    <WorkSection />
    <ContactSection />
    <Footer />
  </>
);

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Smooth Scroll
  useSmoothScroll();

  // Safety Mechanism
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="relative w-full overflow-hidden min-h-screen text-slate-200 font-display cursor-none">
      <SpeedInsights />
      <CustomCursor />
      <ProgressiveBlur />

      {/* Complex Islamic Geometric Background */}
      <ComplexIslamicBackground />

      {/* Islamic Pattern Animation Canvas */}
      <IslamicPatternCanvas />


      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Content always rendered but hidden during loading to prevent flash */}
      <div
        className={`transition-all duration-1000 ease-out ${loading ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'}`}
        style={{ visibility: loading ? 'hidden' : 'visible' }}
      >
        <HashRouter>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
        {/* AsciiScene hidden - all effects disabled, was causing blank space after footer */}
        {/* <AsciiScene /> */}
      </div>
    </div>
  );
}

export default App;