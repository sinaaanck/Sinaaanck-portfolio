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
        const calligraphyDesigns = [
            'ﮮ', 'ﮯ', 'ﮰ', 'ﮱ', // Decorative tails
            '﴾', '﴿', // Ornate parentheses
            '؏', // Poetic verse sign
            '~', // Tilde (stylized)
            '،'  // Arabic comma (stylized)
        ];

        const targetText = "MOHAMMED SINAN";
        let mouse = { x: -1000, y: -1000, active: false };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            originX: number;
            originY: number;
            targetX: number | null;
            targetY: number | null;
            isTarget: boolean;
            content: string;
            color: string;
            baseColor: string;
            size: number;
            angle: number;
            spin: number;

            // Physics properties
            springFactor: number;
            friction: number;
            timeOffset: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.originX = x;
                this.originY = y;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;

                this.content = calligraphyDesigns[Math.floor(Math.random() * calligraphyDesigns.length)];

                this.targetX = null;
                this.targetY = null;
                this.isTarget = false;

                // Silver / White Theme
                const hue = 210;
                const saturation = 10;
                const lightness = 40 + Math.random() * 40;
                this.baseColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.random() * 0.4 + 0.1})`;
                this.color = this.baseColor;

                this.size = Math.random() * 25 + 20;
                this.angle = Math.random() * Math.PI * 2;
                this.spin = (Math.random() - 0.5) * 0.002;

                // Physics init
                this.springFactor = 0.05 + Math.random() * 0.05;
                this.friction = 0.90 + Math.random() * 0.05;
                this.timeOffset = Math.random() * 100;
            }

            update() {
                // 1. Target Attraction (Spring Physics)
                if (this.isTarget && this.targetX !== null && this.targetY !== null) {
                    const dx = this.targetX - this.x;
                    const dy = this.targetY - this.y;

                    this.vx += dx * this.springFactor;
                    this.vy += dy * this.springFactor;

                    // Brighten color when forming text
                    this.color = 'hsla(210, 20%, 95%, 0.95)';

                    // Align rotation
                    const targetAngle = 0;
                    const dAngle = targetAngle - this.angle;
                    this.angle += dAngle * 0.1;

                } else {
                    // 2. Idle "Breathing" Motion
                    const time = Date.now() * 0.001;
                    const floatX = Math.sin(time + this.timeOffset) * 0.5;
                    const floatY = Math.cos(time + this.timeOffset * 0.5) * 0.5;

                    this.vx += floatX * 0.01;
                    this.vy += floatY * 0.01;

                    // 3. Mouse Repulsion (Fluid Displacement)
                    if (mouse.active) {
                        const dx = mouse.x - this.x;
                        const dy = mouse.y - this.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const repulsionRadius = 150;

                        if (dist < repulsionRadius) {
                            const force = (repulsionRadius - dist) / repulsionRadius;
                            const angle = Math.atan2(dy, dx);
                            const repulseX = Math.cos(angle) * force * 2;
                            const repulseY = Math.sin(angle) * force * 2;

                            this.vx -= repulseX;
                            this.vy -= repulseY;
                        }
                    }

                    this.color = this.baseColor;
                    this.angle += this.spin;
                }

                // Apply Physics
                this.vx *= this.friction;
                this.vy *= this.friction;
                this.x += this.vx;
                this.y += this.vy;

                // Bounds wrapping
                if (!this.isTarget) {
                    if (this.x < -50) this.x = width + 50;
                    if (this.x > width + 50) this.x = -50;
                    if (this.y < -50) this.y = height + 50;
                    if (this.y > height + 50) this.y = -50;
                }
            }

            draw() {
                ctx!.fillStyle = this.color;
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
            const particleCount = Math.floor((width * height) / 8000); // Slightly reduced density
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(Math.random() * width, Math.random() * height));
            }
        };

        const getPointsFromText = (text: string) => {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            if (!tempCtx) return [];

            tempCanvas.width = width;
            tempCanvas.height = height;

            const fontSize = Math.min(width / 8, 140); // Slightly larger text
            tempCtx.font = `700 ${fontSize}px 'Reem Kufi', sans-serif`;
            tempCtx.fillStyle = 'white';
            tempCtx.textAlign = 'center';
            tempCtx.textBaseline = 'middle';
            tempCtx.fillText(text, width / 2, height / 2);

            const imageData = tempCtx.getImageData(0, 0, width, height).data;
            const points: { x: number, y: number }[] = [];
            const step = 6;

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

            // Reset targets
            particles.forEach(p => p.isTarget = false);

            if (mouse.active) {
                if (textPoints.length === 0) {
                    textPoints = getPointsFromText(targetText);
                }

                // Assign particles to text points
                // We shuffle or just assign sequentially. 
                // For fluid effect, closest particle to point is better but expensive.
                // Sequential is fast and looks okay with enough particles.

                let pointIndex = 0;
                for (let i = 0; i < particles.length; i++) {
                    if (pointIndex >= textPoints.length) break;

                    const p = particles[i];
                    // Only attract if particle is somewhat close to preserve some background particles?
                    // Or just use all available particles.

                    const target = textPoints[pointIndex];
                    p.isTarget = true;
                    p.targetX = target.x;
                    p.targetY = target.y;

                    pointIndex++;
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
