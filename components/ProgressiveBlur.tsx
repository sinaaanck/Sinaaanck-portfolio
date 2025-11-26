import React from 'react';

export const ProgressiveBlur = () => {
    return (
        <div
            className="fixed inset-0 pointer-events-none z-[50]"
            style={{
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                // Smoother gradient transition
                maskImage: 'linear-gradient(to bottom, black 0%, transparent 20%, transparent 80%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 20%, transparent 80%, black 100%)'
            }}
        />
    );
};
