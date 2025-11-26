import React, { useEffect, useRef } from 'react';

export const IslamicPatternCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = container.offsetWidth;
        let height = container.offsetHeight;
        let particles: Particle[] = [];

        // Configuration
        // Abstract Arabic Calligraphy Words & Designs (Non-religious)
        const calligraphyDesigns = [
            'ﮮ', 'ﮯ', 'ﮰ', 'ﮱ', // Decorative tails
            '﴾', '﴿', // Ornate parentheses
            '؏', // Poetic verse sign
            '~', // Tilde (stylized)
            '،'  // Arabic comma (stylized)
        ];

        // Target text
        const targetText = "MOHAMMED SINAN";

        // Mouse state
        let mouse = { x: -1000, y: -1000, active: false };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            content: string;
            targetX: number | null;
            targetY: number | null;
            isTarget: boolean;
            color: string;
            baseColor: string;
            size: number;
            angle: number;
            spin: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                // Slow, fluid movement
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = (Math.random() - 0.5) * 0.2;

                this.content = calligraphyDesigns[Math.floor(Math.random() * calligraphyDesigns.length)];

                this.targetX = null;
                this.targetY = null;
                this.isTarget = false;

                // Silver / White Theme
                // HSL: 210deg (Cool Silver/Blue-ish White). 
                const hue = 210;
                const saturation = 10;
                const lightness = 40 + Math.random() * 40;
                this.baseColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.random() * 0.4 + 0.1})`;
                this.color = this.baseColor;

                this.size = Math.random() * 25 + 20; // Larger for calligraphy words
                this.angle = Math.random() * Math.PI * 2;
                this.spin = (Math.random() - 0.5) * 0.005; // Slower spin for elegance
            }

            update() {
                if (this.isTarget && this.targetX !== null && this.targetY !== null) {
                    // Fluid attraction
                    const dx = this.targetX - this.x;
                    const dy = this.targetY - this.y;
                    this.x += dx * 0.08;
                    this.y += dy * 0.08;

                    // Bright White/Silver for text
                    this.color = 'hsla(210, 20%, 90%, 0.95)';
                    this.angle += 0.02;
                } else {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.angle += this.spin;
                    this.color = this.baseColor;

                    if (this.x < 0 || this.x > width) this.vx *= -1;
                    if (this.y < 0 || this.y > height) this.vy *= -1;
                }
            }

            draw() {
                ctx!.fillStyle = this.color;
                // Use Amiri for the calligraphy
                ctx!.font = `${this.size}px 'Amiri', serif`;
                ctx!.save();
                ctx!.translate(this.x, this.y);
                ctx!.rotate(this.angle);
                ctx!.fillText(this.content, -this.size / 2, this.size / 2);
                ctx!.restore();
            }
        }

        const init = () => {
            particles = [];
            // Reduced count for performance and elegance (less clutter)
            const particleCount = Math.floor((width * height) / 7000);

            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(Math.random() * width, Math.random() * height));
            }
        };

        // Function to sample points from text
        const getPointsFromText = (text: string) => {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            if (!tempCtx) return [];

            tempCanvas.width = width;
            tempCanvas.height = height;

            // Use Reem Kufi for the Target Text
            const fontSize = Math.min(width / 10, 120);
            tempCtx.font = `700 ${fontSize}px 'Reem Kufi', sans-serif`;
            tempCtx.fillStyle = 'white';
            tempCtx.textAlign = 'center';
            tempCtx.textBaseline = 'middle';

            // Draw text in center
            tempCtx.fillText(text, width / 2, height / 2);

            const imageData = tempCtx.getImageData(0, 0, width, height).data;
            const points: { x: number, y: number }[] = [];
            const step = 7; // Less dense for better performance

            for (let y = 0; y < height; y += step) {
                for (let x = 0; x < width; x += step) {
                    const index = (y * width + x) * 4;
                    if (imageData[index + 3] > 128) {
                        points.push({ x, y });
                    }
                }
            }
            return points;
        };

        let textPoints: { x: number, y: number }[] = [];

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.isTarget = false;
            });

            if (mouse.active) {
                if (textPoints.length === 0) {
                    textPoints = getPointsFromText(targetText);
                }

                const offsetX = mouse.x - width / 2;
                const offsetY = mouse.y - height / 2;

                let pointIndex = 0;
                for (let i = 0; i < particles.length; i++) {
                    if (pointIndex >= textPoints.length) break;

                    const p = particles[i];
                    const target = textPoints[pointIndex];
                    p.isTarget = true;
                    p.targetX = target.x + offsetX * 0.2; // Reduced parallax
                    p.targetY = target.y + offsetY * 0.2;

                    pointIndex++;
                    if (pointIndex >= textPoints.length) pointIndex = 0;
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animate);
        };

        const resize = () => {
            width = container.offsetWidth;
            height = container.offsetHeight;
            canvas.width = width;
            canvas.height = height;
            init();
            textPoints = [];
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const rect = container.getBoundingClientRect();
            mouse.x = e.touches[0].clientX - rect.left;
            mouse.y = e.touches[0].clientY - rect.top;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        resize();
        init(); // Initialize particles
        animate();

        window.addEventListener('resize', resize);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchstart', handleTouchMove, { passive: false });
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('touchend', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', resize);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchstart', handleTouchMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeEventListener('touchend', handleMouseLeave);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-screen pointer-events-auto z-0 overflow-hidden opacity-80">
            <canvas ref={canvasRef} className="block" />
        </div>
    );
};
