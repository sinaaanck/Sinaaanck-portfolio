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

        const img = new Image();
        let animationFrameId: number;

        // Grid configuration
        const gridSize = 150;
        const cells: { x: number, y: number, opacity: number, speed: number, offset: number }[] = [];

        const initCells = () => {
            cells.length = 0;
            const cols = Math.ceil(width / gridSize);
            const rows = Math.ceil(height / gridSize);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    cells.push({
                        x: i * gridSize,
                        y: j * gridSize,
                        opacity: Math.random(),
                        speed: 0.0005 + Math.random() * 0.001, // Very slow pulse
                        offset: Math.random() * Math.PI * 2
                    });
                }
            }
        };

        const draw = () => {
            if (!img.complete) return;

            ctx.clearRect(0, 0, width, height);

            const time = Date.now();

            cells.forEach(cell => {
                // Organic pulse using sine wave
                const pulse = (Math.sin(time * cell.speed + cell.offset) + 1) / 2; // 0 to 1
                const currentOpacity = 0.05 + pulse * 0.15; // Min 0.05, Max 0.2

                ctx.globalAlpha = currentOpacity;

                // Draw slice of image
                // We randomly sample from the image or just tile it. 
                // Let's tile it for consistency but rotate randomly? 
                // For performance, just draw the image slice.

                // Source coords (wrap around image)
                const sx = (cell.x % img.width);
                const sy = (cell.y % img.height);

                // Destination
                ctx.drawImage(img, sx, sy, gridSize, gridSize, cell.x, cell.y, gridSize, gridSize);
            });

            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(draw);
        };

        img.onload = () => {
            initCells();
            draw();
        };

        img.src = '/calligraphy-grid.png';

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initCells();
        };

        handleResize();
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
