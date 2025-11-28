import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Navbar } from './components/Navbar';

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
      <AsciiScene />
    </>
  )
}
    </div >
  );
}

export default App;