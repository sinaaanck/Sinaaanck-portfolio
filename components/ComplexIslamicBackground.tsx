import React, { useEffect, useRef } from 'react';

export const ComplexIslamicBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationFrameId: number;

        // Hexagon configuration
        const hexSize = 40;
        const hexHeight = hexSize * 2;
        const hexWidth = Math.sqrt(3) * hexSize;
        const vertDist = hexHeight * 0.75;

        const drawHexagon = (x: number, y: number, opacity: number) => {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const hx = x + hexSize * Math.cos(angle);
                const hy = y + hexSize * Math.sin(angle);
                if (i === 0) ctx.moveTo(hx, hy);
                else ctx.lineTo(hx, hy);
            }
            ctx.closePath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const time = Date.now() * 0.0005;
            const cols = Math.ceil(width / hexWidth) + 2;
            const rows = Math.ceil(height / vertDist) + 2;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const xOffset = (r % 2) * (hexWidth / 2);
                    const x = c * hexWidth + xOffset - hexWidth;
                    const y = r * vertDist - hexHeight;

                    // Organic wave pattern for opacity
                    const dist = Math.sqrt((x - width / 2) ** 2 + (y - height / 2) ** 2);
                    const wave = Math.sin(dist * 0.002 - time) * 0.5 + 0.5;
                    const opacity = 0.02 + wave * 0.05; // Very subtle

                    drawHexagon(x, y, opacity);
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        handleResize();
        draw();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-[#050505]">
            <canvas ref={canvasRef} className="block" />
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
        </div>
    );
};
