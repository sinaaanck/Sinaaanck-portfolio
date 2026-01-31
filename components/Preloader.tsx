import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete
    });

    if (containerRef.current) gsap.set(containerRef.current, { display: 'flex' });
    if (textRef.current) gsap.set(textRef.current, { opacity: 0, y: 15, letterSpacing: "0.2em" });

    if (pathRef.current && textRef.current && containerRef.current) {
      const length = pathRef.current.getTotalLength();

      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fillOpacity: 0
      });

      // Elegant stroke draw animation
      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power3.inOut"
      })
        // Subtle rotation as it draws
        .to(pathRef.current.parentElement, {
          rotation: 2,
          duration: 0.6,
          ease: "sine.inOut"
        }, "-=0.8")
        .to(pathRef.current.parentElement, {
          rotation: 0,
          duration: 0.4,
          ease: "sine.out"
        })
        // Fill reveal with glow effect
        .to(pathRef.current, {
          fillOpacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.3")
        // Text reveal with spring effect
        .to(textRef.current, {
          opacity: 1,
          y: 0,
          letterSpacing: "0.08em",
          duration: 1,
          ease: "elastic.out(1, 0.8)"
        }, "-=0.4")
        // Hold moment
        .to({}, { duration: 0.8 })
        // Smooth exit animation
        .to([textRef.current, pathRef.current], {
          opacity: 0,
          y: -30,
          scale: 0.95,
          duration: 0.8,
          ease: "power2.inOut",
          stagger: 0.08
        })
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.7,
          ease: "power2.inOut"
        }, "-=0.4");
    } else {
      tl.to({}, { duration: 1 });
    }

    return () => {
      tl.kill();
    }
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white"
    >
      <div className="relative w-24 h-24 md:w-32 md:h-32 mb-8">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <path
            ref={pathRef}
            d="M 75 30 L 35 30 L 35 50 L 65 50 L 65 70 L 25 70"
            fill="none"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div ref={textRef} className="text-center">
        <h1 className="text-lg uppercase tracking-[0.3em] font-bold font-display text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          Sinaaan CK
        </h1>
      </div>
    </div>
  );
};