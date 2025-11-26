import React from 'react';

export const ComplexIslamicBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-[#050505]">
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
        </div>
    );
};
