/**
 * =============================================================================
 * App.tsx - Main Application Entry Component
 * =============================================================================
 * 
 * This is the root component of the Mohammed Sinan portfolio website.
 * It orchestrates the loading state, routing, and overall layout structure.
 * 
 * @author Mohammed Sinan CK
 * @version 1.0.0
 * @license MIT
 * =============================================================================
 */

import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";

// Component imports - each handles a specific section of the portfolio
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkSection } from './components/WorkSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { NotFound } from './components/NotFound';

// Background and visual effect components
import { IslamicPatternCanvas } from './components/IslamicPatternCanvas';
import { ComplexIslamicBackground } from './components/ComplexIslamicBackground';
import { CustomCursor } from './components/CustomCursor';
import { ProgressiveBlur } from './components/ProgressiveBlur';

// Custom hooks
import { useSmoothScroll } from './hooks/useSmoothScroll';

/**
 * MainContent Component
 * Wraps all the main page sections in a fragment for clean routing.
 * This component is rendered when the user is on the home route ("/").
 */
const MainContent = () => (
  <>
    <Navbar />      {/* Fixed navigation bar with logo and links */}
    <Hero />        {/* Hero section with name, title, and tech stack */}
    <WorkSection /> {/* Portfolio/projects showcase section */}
    <ContactSection /> {/* Contact form section */}
    <Footer />      {/* Footer with social links and copyright */}
  </>
);

/**
 * App Component
 * The main application component that handles:
 * - Loading state management with preloader animation
 * - Hash-based routing for SPA navigation
 * - Global visual enhancements (cursor, backgrounds, blur effects)
 * - Smooth scroll initialization
 */
function App() {
  // Loading state - controls preloader visibility and content reveal
  const [loading, setLoading] = useState(true);

  // Initialize smooth scrolling behavior for anchor links
  useSmoothScroll();

  /**
   * Safety Mechanism Effect
   * Ensures the preloader doesn't get stuck - automatically hides after 3.5s
   * This prevents users from being stuck on a loading screen if the
   * preloader's onComplete callback fails for any reason.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) setLoading(false);
    }, 3500); // 3.5 second timeout

    // Cleanup: clear timeout if component unmounts or loading state changes
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    // Main container with relative positioning for layered content
    <div className="relative w-full overflow-hidden min-h-screen text-slate-200 font-display cursor-none">

      {/* Vercel Speed Insights - Performance monitoring */}
      <SpeedInsights />

      {/* Custom cursor replacement - provides unique UX on desktop */}
      <CustomCursor />

      {/* Progressive blur overlay - adds depth to scrolling */}
      <ProgressiveBlur />

      {/* Complex Islamic Geometric Background - Animated hexagon pattern */}
      <ComplexIslamicBackground />

      {/* Islamic Pattern Animation Canvas - Interactive particle system */}
      <IslamicPatternCanvas />

      {/* Preloader - Animated logo reveal on initial load */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 
        Main Content Container
        - Always rendered but hidden during loading to prevent flash
        - Uses CSS transitions for smooth fade-in with slide-up effect
        - visibility:hidden ensures content doesn't receive focus during loading
      */}
      <div
        className={`transition-all duration-1000 ease-out ${loading
            ? 'opacity-0 pointer-events-none translate-y-4'
            : 'opacity-100 translate-y-0'
          }`}
        style={{ visibility: loading ? 'hidden' : 'visible' }}
      >
        {/* 
          Hash Router - Uses URL hash for client-side routing
          Better compatibility with static hosting (GitHub Pages, Vercel)
        */}
        <HashRouter>
          <Routes>
            {/* Home route - renders all main content sections */}
            <Route path="/" element={<MainContent />} />
            {/* Catch-all route - shows 404 page for unknown paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;