/**
 * =============================================================================
 * Navbar.tsx - Navigation Bar Component
 * =============================================================================
 * 
 * Responsive navigation bar with:
 * - Desktop: Floating pill-style navbar with smooth transitions
 * - Mobile: Hamburger menu with full-screen overlay
 * 
 * Features:
 * - Scroll-aware background opacity changes
 * - Animated mobile menu with staggered link reveals
 * - Clean, minimal design with subtle hover effects
 * 
 * @author Mohammed Sinan CK
 * @version 1.0.0
 * =============================================================================
 */

import React, { useEffect, useState } from 'react';

export const Navbar = () => {
  // Track scroll position for navbar background changes
  const [scrolled, setScrolled] = useState(false);

  // Mobile menu open/close state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
   * Scroll Detection Effect
   * Updates 'scrolled' state when user scrolls past 50px threshold.
   * This triggers a background color change on the navbar.
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Check initial scroll position on mount
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links configuration - easy to modify
  const navLinks = [
    { name: 'Home', id: 'top' },
    { name: 'Work', id: 'work' },
    { name: 'Contact', id: 'contact' },
  ];

  /**
   * Handle mobile navigation link click
   * Closes the mobile menu after a link is clicked
   */
  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ============================================
          DESKTOP NAVBAR
          Floating, centered pill-style navigation
          ============================================ */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 hidden md:block rounded-full px-2 ${scrolled
          ? 'bg-[#0a0a0a]/90 border border-white/5'  // Darker when scrolled
          : 'bg-[#0a0a0a]/60 border border-white/5'  // More transparent at top
          }`}
      >
        <nav className="px-6 py-3">
          <div className="flex items-center gap-8">

            {/* Logo - Links to top of page */}
            <a
              href="#top"
              className="flex items-center gap-2.5 text-lg font-bold text-white hover:text-gray-200 transition-all duration-300 z-[100] relative group"
            >
              {/* "S" logo badge with subtle rotation on hover */}
              <span className="w-9 h-9 bg-white text-black flex items-center justify-center rounded-xl font-display font-bold text-base transform group-hover:rotate-3 transition-all duration-300">S</span>
              <span className="font-display tracking-tight">Sinaaan</span>
            </a>

            {/* Visual separator between logo and links */}
            <div className="h-5 w-px bg-white/20"></div>

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all duration-300 rounded-full hover:bg-white/10 group"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Visual separator between links and resume button */}
            <div className="h-5 w-px bg-white/20"></div>

            {/* Resume Button - Opens in new tab */}
            <a
              href="https://drive.google.com/file/d/1sVoJrpMdlZn_TCHccgwWAg7wWXQRklUz/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-200 transition-all duration-300 active:scale-95 hover:scale-105"
            >
              Resume
            </a>
          </div>
        </nav>
      </header>

      {/* ============================================
          MOBILE NAVBAR
          Fixed header with hamburger menu button
          ============================================ */}
      <header className="fixed top-0 left-0 right-0 z-[100] md:hidden">
        {/* Mobile Header Bar */}
        <div className={`flex justify-between items-center px-5 py-4 transition-all duration-300 ${scrolled ? 'bg-[#050505]/95' : 'bg-transparent'}`}>

          {/* Mobile Logo */}
          <a
            href="#top"
            className="flex items-center gap-2 text-lg font-bold text-white z-[101]"
            onClick={handleMobileNavClick}
          >
            <span className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-lg font-display font-bold text-sm">S</span>
            <span className="font-display">Sinaaan</span>
          </a>

          {/* Hamburger Menu Button - Transforms to X when open */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[101] relative"
            aria-label="Toggle menu"
          >
            {/* Three bars that animate into an X shape */}
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* ============================================
            MOBILE MENU OVERLAY
            Full-screen menu with staggered animations
            ============================================ */}
        <div className={`fixed inset-0 bg-[#050505]/98 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center gap-8 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>

          {/* Navigation Links - Staggered entrance animation */}
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={handleMobileNavClick}
              className={`text-3xl font-display font-bold text-white hover:text-gray-300 transition-all duration-300 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: mobileMenuOpen ? `${index * 100}ms` : '0ms' }}
            >
              {link.name}
            </a>
          ))}

          {/* Resume Button in Mobile Menu */}
          <a
            href="https://drive.google.com/file/d/1sVoJrpMdlZn_TCHccgwWAg7wWXQRklUz/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleMobileNavClick}
            className={`mt-4 px-8 py-3 text-lg font-medium text-black bg-white rounded-full hover:bg-gray-200 transition-all duration-300 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: mobileMenuOpen ? '300ms' : '0ms' }}
          >
            Resume
          </a>
        </div>
      </header>
    </>
  );
};