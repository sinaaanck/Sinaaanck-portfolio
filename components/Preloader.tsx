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

      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 1.0,
        ease: "power2.inOut"
      })
        .to(pathRef.current, {
          fillOpacity: 1,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3")
        .to(textRef.current, {
          opacity: 1,
          y: 0,
          letterSpacing: "0.05em",
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.3")
        .to({}, { duration: 0.4 })
        .to([textRef.current, pathRef.current], {
          opacity: 0,
          y: -20,
          scale: 0.95,
          duration: 0.4,
          ease: "power2.in"
        })
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in"
        });
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