import { useEffect } from 'react';

export const useSmoothScroll = () => {
    useEffect(() => {
        let animationFrameId: number | null = null;

        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');

            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (!targetElement && targetId !== 'top') return;

            const targetPosition = targetId === 'top' ? 0 : targetElement?.getBoundingClientRect().top! + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1800; // Slightly longer for smoother feel
            let start: number | null = null;

            // Ease Out Expo: Ultra-smooth deceleration
            const easeOutExpo = (t: number) => {
                return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            };

            const step = (timestamp: number) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);

                // Apply easing with slight velocity dampening for extra smoothness
                const easedProgress = easeOutExpo(percentage);
                window.scrollTo(0, startPosition + distance * easedProgress);

                if (progress < duration) {
                    animationFrameId = requestAnimationFrame(step);
                } else {
                    animationFrameId = null;
                }
            };

            // Cancel any existing animation
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            animationFrameId = requestAnimationFrame(step);
        };

        const cancelScroll = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };

        document.addEventListener('click', handleAnchorClick);
        // Stop animation on user interaction
        window.addEventListener('wheel', cancelScroll);
        window.addEventListener('touchmove', cancelScroll);
        window.addEventListener('keydown', cancelScroll);

        return () => {
            document.removeEventListener('click', handleAnchorClick);
            window.removeEventListener('wheel', cancelScroll);
            window.removeEventListener('touchmove', cancelScroll);
            window.removeEventListener('keydown', cancelScroll);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);
};
