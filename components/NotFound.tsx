import React from 'react';

// 404 Error Page with Cyberpunk/Glitch Aesthetic
export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white relative overflow-hidden">
      
      {/* CRT Overlay Effect - Adds scanlines */}
      <div className="crt-overlay"></div>
      
      {/* Background Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none"></div>

      <div className="z-20 text-center px-4 relative">
        <h1 
          className="text-9xl md:text-[12rem] font-bold mb-0 text-white glitch-text tracking-tighter leading-none select-none"
          data-text="404"
        >
          404
        </h1>
        
        <div className="h-px w-24 bg-white/20 mx-auto my-8"></div>

        <h2 className="text-2xl md:text-3xl font-medium text-gray-300 mb-6 font-display tracking-wide uppercase">
          System Malfunction
        </h2>
        
        <p className="max-w-md mx-auto text-gray-500 mb-12 font-mono text-sm leading-relaxed">
          &gt; Error: The requested resource vector is unreachable.<br/>
          &gt; Diagnostic: Page removed or link corrupted.<br/>
          &gt; Action: Return to base coordinates.
        </p>

        {/* Animated Return Home Button */}
        <a href="/" className="btn-beam-container inline-flex items-center justify-center group relative">
          <div className="btn-beam-content px-10 py-4 bg-[#050505] text-white font-medium transition-all duration-300 group-hover:bg-white group-hover:text-black rounded-full">
            <span className="flex items-center gap-3">
              <span className="material-icons text-sm">keyboard_return</span>
              Return Home
            </span>
          </div>
        </a>
      </div>

      {/* Decorative Code Fragments */}
      <div className="absolute top-10 left-10 text-[10px] text-green-500/20 font-mono hidden md:block select-none">
        0x4523...<br/>
        Loading kernel...<br/>
        Error at 0x000F
      </div>
      <div className="absolute bottom-10 right-10 text-[10px] text-blue-500/20 font-mono hidden md:block select-none text-right">
        Connection: Closed<br/>
        Latency: NULL<br/>
        Retrying...
      </div>
    </div>
  );
};