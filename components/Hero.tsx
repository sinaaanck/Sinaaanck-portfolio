/**
 * =============================================================================
 * Hero.tsx - Hero Section Component
 * =============================================================================
 * 
 * The main hero/landing section of the portfolio featuring:
 * - Animated name reveal with elastic letter-by-letter animation
 * - Professional title and description
 * - Scrolling tech stack marquee with hover effects
 * - Parallax scroll effect on the text container
 * 
 * Uses GSAP (GreenSock Animation Platform) for professional animations
 * 
 * @author Mohammed Sinan CK
 * @version 1.0.0
 * =============================================================================
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin for scroll-based animations
gsap.registerPlugin(ScrollTrigger);

/**
 * Tech Stack Configuration
 * Array of technologies to display in the scrolling marquee.
 * Each item has a name (display text) and icon URL (from devicons CDN).
 * 
 * Categories:
 * - Programming & Scripting: Languages used for automation and development
 * - OS & Tools: Operating systems and development tools
 */
const techStack = [
  // Programming & Scripting Languages
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },

  // Operating Systems & Development Tools
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Windows", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
];

/**
 * Hero Component
 * Main landing section with animated name, title, and tech stack.
 */
export const Hero = () => {
  // DOM references for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null);      // Main container for scroll trigger
  const textContainerRef = useRef<HTMLDivElement>(null);  // Text wrapper for parallax
  const techRef = useRef<HTMLDivElement>(null);           // Tech stack section
  const nameRef = useRef<HTMLHeadingElement>(null);       // Name heading for letter animation

  /**
   * Animation Effect
   * Runs once on component mount to set up all entrance animations
   */
  useEffect(() => {
    // Create main animation timeline
    const tl = gsap.timeline();

    // Initial states - hide elements before animation
    gsap.set(textContainerRef.current, { opacity: 0 });
    gsap.set(techRef.current, { opacity: 0, y: 40 });

    // Set initial state for individual name letters
    if (nameRef.current) {
      const letters = nameRef.current.querySelectorAll('.name-letter');
      gsap.set(letters, {
        y: 120,        // Start below position
        opacity: 0,    // Invisible
        rotateX: -90,  // Flipped backwards
        scale: 0.8     // Slightly smaller
      });
    }

    /**
     * Animation Sequence:
     * 1. Fade in text container
     * 2. Animate name letters with elastic bounce
     * 3. Reveal subtitle with blur
     * 4. Reveal description with blur
     * 5. Slide up tech stack
     */
    tl.to(textContainerRef.current, {
      opacity: 1,
      duration: 0.2
    })
      // Name letter animation - elastic bounce effect
      .to(".name-letter", {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        stagger: 0.04,        // 40ms delay between each letter
        duration: 1.4,
        ease: "elastic.out(1, 0.6)"  // Bouncy elastic easing
      })
      // Subtitle reveal with blur effect
      .fromTo(".hero-subtitle",
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: "power4.out" },
        "-=0.9"  // Start 0.9s before previous animation ends
      )
      // Description reveal with blur effect
      .fromTo(".hero-desc",
        { opacity: 0, y: 25, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: "power4.out" },
        "-=0.9"
      )
      // Tech stack slide up
      .to(techRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out"
      }, "-=0.7");

    /**
     * Parallax Scroll Effect
     * Moves text container up as user scrolls down,
     * creating a depth/parallax effect
     */
    if (textContainerRef.current) {
      gsap.to(textContainerRef.current, {
        y: 120,  // Move 120px down relative to scroll
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",     // When top of container hits top of viewport
          end: "bottom top",    // When bottom of container hits top of viewport
          scrub: 0.5            // Smooth scrubbing with 0.5s delay
        }
      });
    }
  }, []);

  // Name to display - split into individual letters for animation
  const nameString = "Mohammed Sinan";

  return (
    // Main hero container - full viewport height, centered content
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden text-white flex flex-col items-center justify-center pt-20 md:pt-0 selection:bg-white/20"
    >
      {/* Background Glow Effect - Subtle pulsing circle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-white/[0.03] rounded-full blur-[120px] animate-pulse"></div>
      </div>

      {/* Main Content Area */}
      <main className="text-center px-6 z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center relative">

        {/* Text Container - Wraps name, title, and description */}
        <div ref={textContainerRef} className="flex flex-col items-center mb-16 animate-float">

          <h1
            ref={nameRef}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.1] mb-8 cursor-default whitespace-nowrap"
          >
            {/* Name Letters Container */}
            <span className="block text-white drop-shadow-2xl">
              {/* Split name into individual span elements for animation */}
              {nameString.split("").map((char, index) => (
                <span
                  key={index}
                  className="name-letter inline-block transform-style-3d origin-bottom"
                >
                  {/* Replace space with non-breaking space for proper spacing */}
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>

            {/* Job Title / Subtitle - Fresher Diploma Profile */}
            <span className="hero-subtitle text-gray-500 block text-lg sm:text-xl md:text-3xl lg:text-4xl font-light font-manrope mt-4 tracking-normal">
              Network Support Engineer
            </span>
            <span className="hero-subtitle text-gray-600 block text-sm sm:text-base md:text-xl font-light font-manrope mt-2 tracking-normal">
              Diploma in Computer Engineering
            </span>
          </h1>

          {/* Description Paragraphs - Fresher focused */}
          <p className="hero-desc max-w-[42rem] mx-auto text-base sm:text-lg md:text-xl text-gray-400 font-light leading-relaxed">
            Fresh graduate with hands-on training in <span className="text-white font-medium">Network Support</span>, <span className="text-white font-medium">System Administration</span>, and IT troubleshooting through practical lab environments.
          </p>
          <p className="hero-desc max-w-[38rem] mx-auto text-sm sm:text-base md:text-lg text-gray-500 font-light leading-relaxed mt-4">
            Eager to learn and grow in IT infrastructure, help desk support, and network operations roles.
          </p>
        </div>

        {/* ============================================
            TECH STACK SECTION
            Infinite scrolling marquee of technologies
            ============================================ */}
        <div ref={techRef} className="mt-12 w-full opacity-0 translate-y-8 overflow-hidden">

          {/* Section Label */}
          <p className="text-[10px] text-gray-600 mb-8 tracking-[0.3em] uppercase font-bold text-center">
            Tech Arsenal
          </p>

          {/* Marquee Container with Fade Mask */}
          <div className="marquee-mask w-full relative border-t border-b border-white/5 py-6">

            {/* Scrolling Content - Duplicated 4x for infinite scroll effect */}
            <div className="marquee-content flex items-center">
              {/* Map through tech stack 4 times for seamless loop */}
              {[...techStack, ...techStack, ...techStack, ...techStack].map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 mx-6 opacity-60 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 cursor-default group"
                >
                  {/* Icon Container with Hover Effects */}
                  <div className="bg-white/5 backdrop-blur-sm p-1.5 rounded-md group-hover:scale-105 transition-all duration-300 border border-white/5 group-hover:border-white/15 group-hover:bg-white/5">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-6 h-6 md:w-7 md:h-7 object-contain group-hover:drop-shadow-[0_0_3px_rgba(255,255,255,0.2)]"
                    />
                  </div>
                  {/* Tech Name - Hidden on mobile */}
                  <span className="hidden md:block text-gray-400 font-medium text-xs tracking-wide group-hover:text-gray-200 transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};