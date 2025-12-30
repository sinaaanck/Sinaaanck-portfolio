import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const cursorPos = useRef({ x: 0, y: 0 });
    const followerPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        // Smooth lerp for follower with spring physics
        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor;
        };

        const onMouseMove = (e: MouseEvent) => {
            cursorPos.current = { x: e.clientX, y: e.clientY };

            // Immediate cursor movement with smooth easing
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.08,
                ease: "power2.out"
            });
        };

        // Smooth follower animation loop
        const animateFollower = () => {
            followerPos.current.x = lerp(followerPos.current.x, cursorPos.current.x, 0.12);
            followerPos.current.y = lerp(followerPos.current.y, cursorPos.current.y, 0.12);

            gsap.set(follower, {
                x: followerPos.current.x,
                y: followerPos.current.y
            });

            requestAnimationFrame(animateFollower);
        };

        // Handle hover on interactive elements
        const handleMouseEnter = () => {
            gsap.to(cursor, {
                scale: 0.5,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
            gsap.to(follower, {
                scale: 1.8,
                borderColor: 'rgba(255, 255, 255, 0.6)',
                duration: 0.4,
                ease: "elastic.out(1, 0.5)"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
            gsap.to(follower, {
                scale: 1,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                duration: 0.4,
                ease: "elastic.out(1, 0.5)"
            });
        };

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        window.addEventListener('mousemove', onMouseMove);
        animateFollower();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-100"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 border-2 border-white/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 backdrop-blur-[1px]"
            />
        </>
    );
};
