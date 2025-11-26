import React, { useEffect, useRef } from 'react';

export const ComplexIslamicBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-[#050505]">
            <canvas ref={canvasRef} className="block" />
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
        </div>
    );
};
