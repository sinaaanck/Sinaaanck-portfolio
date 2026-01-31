import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  // Programming Languages
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
  // IT Infrastructure
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Windows", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
  { name: "Prometheus", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg" },
  { name: "Grafana", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Ansible", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg" },
  { name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
];

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    gsap.set(textContainerRef.current, { opacity: 0 });
    gsap.set(techRef.current, { opacity: 0, y: 40 });

    if (nameRef.current) {
      const letters = nameRef.current.querySelectorAll('.name-letter');
      gsap.set(letters, { y: 120, opacity: 0, rotateX: -90, scale: 0.8 });
    }

    tl.to(textContainerRef.current, {
      opacity: 1,
      duration: 0.2
    })
      .to(".name-letter", {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        stagger: 0.04,
        duration: 1.4,
        ease: "elastic.out(1, 0.6)"
      })
      .fromTo(".hero-subtitle",
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: "power4.out" },
        "-=0.9"
      )
      .fromTo(".hero-desc",
        { opacity: 0, y: 25, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: "power4.out" },
        "-=0.9"
      )
      .to(techRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out"
      }, "-=0.7");

    // Smooth parallax scroll effect
    if (textContainerRef.current) {
      gsap.to(textContainerRef.current, {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5
        }
      });
    }
  }, []);

  // Name hover animation removed as per user request

  const nameString = "Mohammed Sinan";

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden text-white flex flex-col items-center justify-center pt-20 md:pt-0 selection:bg-white/20">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-white/[0.03] rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <main className="text-center px-6 z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center relative">
        <div ref={textContainerRef} className="flex flex-col items-center mb-16 animate-float">
          <h1
            ref={nameRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.1] mb-8 cursor-default"
          >
            <span className="block text-white drop-shadow-2xl">
              {nameString.split("").map((char, index) => (
                <span key={index} className="name-letter inline-block transform-style-3d origin-bottom">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>

            <span className="hero-subtitle text-gray-500 block text-2xl md:text-4xl font-light font-manrope mt-4 tracking-normal">
              IT Infrastructure & Network Operations Engineer
            </span>
          </h1>

          <p className="hero-desc max-w-[42rem] mx-auto text-lg md:text-xl text-gray-400 font-light leading-relaxed">
            Hands-on experience with <span className="text-white font-medium">NOC-style monitoring</span>, <span className="text-white font-medium">Linux servers</span>, Windows systems, networking fundamentals, and incident response workflows.
          </p>
          <p className="hero-desc max-w-[38rem] mx-auto text-base md:text-lg text-gray-500 font-light leading-relaxed mt-4">
            Trained through real-world labs simulating enterprise and operations environments.
          </p>
        </div>

        <div ref={techRef} className="mt-12 w-full opacity-0 translate-y-8 overflow-hidden">
          <p className="text-[10px] text-gray-600 mb-8 tracking-[0.3em] uppercase font-bold text-center">Tech Arsenal</p>
          <div className="marquee-mask w-full relative border-t border-b border-white/5 py-6">
            <div className="marquee-content flex items-center">
              {[...techStack, ...techStack, ...techStack, ...techStack].map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 mx-8 opacity-60 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 cursor-default group"
                >
                  <div className="bg-white/5 backdrop-blur-sm p-2 rounded-lg group-hover:scale-110 transition-all duration-300 border border-white/5 group-hover:border-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:bg-white/10">
                    <img src={tech.icon} alt={tech.name} className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                  </div>
                  <span className="hidden md:block text-gray-300 font-medium text-sm tracking-wide group-hover:text-white transition-colors">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};