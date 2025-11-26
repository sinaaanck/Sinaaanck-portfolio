import React, { useEffect, useState } from 'react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll(); // Check initial state
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'top' },
    { name: 'Work', id: 'work' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 hidden md:block ${scrolled ? 'bg-[#050505]/90 shadow-sm border-b border-white/5 backdrop-blur-md' : 'backdrop-blur-sm'
        }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a
            href="#top"
            className="flex items-center gap-3 text-xl font-bold text-white hover:text-gray-300 transition-colors z-[100] relative tracking-tight group"
          >
            <span className="w-10 h-10 bg-white text-black flex items-center justify-center rounded-lg font-display font-bold text-lg transform group-hover:rotate-12 transition-transform duration-300">S</span>
            <span className="group-hover:tracking-wider transition-all duration-300 font-display">Sinaaan CK</span>
          </a>

          <div className="flex items-center space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                className="relative text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium tracking-wide group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1sVoJrpMdlZn_TCHccgwWAg7wWXQRklUz/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-sm font-medium text-white bg-transparent rounded-full border border-white/20 hover:bg-white hover:text-black hover:border-transparent transition-all duration-300 active:scale-95 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};