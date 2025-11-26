import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  status: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "TalentSphere",
    description: "A comprehensive talent management platform designed to streamline recruitment and employee development processes. Currently under development with advanced AI integration features planned.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    link: "https://talentsphere-swart.vercel.app/",
    status: "In Progress (Postponed)",
    tags: ["React", "Next.js", "HR Tech"]
  },
  {
    id: 2,
    title: "Innovation Lab",
    description: "Upcoming projects focusing on n8n Automation workflows, Cloud Infrastructure, and AI Agents are currently in the works. This space is reserved for the next big thing.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    link: "#",
    status: "Coming Soon",
    tags: ["Automation", "R&D", "Cloud"]
  }
];

export const WorkSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isHovering]);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(carouselRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.getElementsByClassName('spotlight-card');
    for (const card of cards) {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    }
  };

  const activeProject = projects[currentIndex];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-32 px-4 relative flex flex-col justify-center" 
      id="work"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div ref={headerRef} className="text-center mb-20 opacity-0">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Selected Work</h2>
          <p className="text-gray-500 max-w-xl mx-auto font-light text-lg">
            Exploration of Cloud, Automation, and Web Technologies.
          </p>
        </div>

        <div ref={carouselRef} className="w-full opacity-0">
          <div 
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch justify-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            
            <div className="w-full lg:w-[62%] relative perspective-1000 group">
              <div 
                key={activeProject.id}
                className="spotlight-card h-full min-h-[400px] md:min-h-[500px] rounded-xl bg-[#0a0a0a] overflow-hidden shadow-2xl transition-all duration-500 border border-white/5 relative"
              >
                <div className="absolute inset-0 w-full h-full">
                    <img 
                    src={activeProject.image} 
                    alt={activeProject.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-50 group-hover:opacity-80 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full z-10 flex flex-col justify-end h-full">
                   <div className="flex flex-wrap gap-3 mb-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    {activeProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-md rounded-full text-white border border-white/10 tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-none">{activeProject.title}</h3>
                  <p className="text-gray-300 mb-8 max-w-lg text-sm md:text-base font-light leading-relaxed">{activeProject.description}</p>
                  
                  <div className="flex items-center gap-6">
                    <a 
                      href={activeProject.link} 
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors duration-300"
                    >
                      {activeProject.status === "Coming Soon" ? "Stay Tuned" : "View Project"} 
                      <span className="material-icons text-sm">arrow_outward</span>
                    </a>
                    {activeProject.status.includes("Postponed") && (
                      <span className="text-xs text-red-400 bg-red-900/20 px-3 py-1.5 rounded border border-red-900/30">
                        {activeProject.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[38%] flex flex-col gap-4">
               <div className="flex gap-4 mb-2 justify-end">
                    <button 
                        onClick={handlePrev} 
                        className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all"
                        aria-label="Previous"
                    >
                        <span className="material-icons">chevron_left</span>
                    </button>
                    <button 
                        onClick={handleNext} 
                        className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all"
                        aria-label="Next"
                    >
                        <span className="material-icons">chevron_right</span>
                    </button>
               </div>

              {projects.map((project, index) => (
                <div 
                  key={project.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`spotlight-card p-6 rounded-xl cursor-pointer transition-all duration-500 border group ${
                    index === currentIndex 
                        ? 'border-white/40 bg-white/[0.03]' 
                        : 'border-transparent bg-[#0a0a0a]/50 hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`text-xl font-medium transition-colors ${index === currentIndex ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                        {project.title}
                    </h4>
                    {index === currentIndex && <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>}
                  </div>
                  <p className={`text-sm line-clamp-2 font-light ${index === currentIndex ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                </div>
              ))}
              
              <div className="mt-auto p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent text-center lg:text-left">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Explore More</p>
                <p className="text-gray-400 text-sm font-light mb-3">Check out my GitHub for more open source automation scripts and configurations.</p>
                <a href="https://github.com/sinaaanck" target="_blank" rel="noreferrer" className="text-sm text-white border-b border-white hover:border-transparent transition-all">Visit GitHub &rarr;</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};