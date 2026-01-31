import React, { useEffect, useState } from 'react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'top' },
    { name: 'Work', id: 'work' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 hidden md:block rounded-full px-2 ${scrolled
            ? 'bg-white/10 backdrop-blur-xl border border-white/10'
            : 'bg-white/5 backdrop-blur-sm border border-white/5'
          }`}
      >
        <nav className="px-6 py-3">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a
              href="#top"
              className="flex items-center gap-2.5 text-lg font-bold text-white hover:text-gray-200 transition-all duration-300 z-[100] relative group"
            >
              <span className="w-9 h-9 bg-gradient-to-br from-white to-gray-300 text-black flex items-center justify-center rounded-xl font-display font-bold text-base transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-lg">S</span>
              <span className="font-display tracking-tight">Sinaaan</span>
            </a>

            {/* Separator */}
            <div className="h-5 w-px bg-white/20"></div>

            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all duration-300 rounded-full hover:bg-white/10 group"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Separator */}
            <div className="h-5 w-px bg-white/20"></div>

            {/* Resume Button */}
            <a
              href="https://drive.google.com/file/d/1sVoJrpMdlZn_TCHccgwWAg7wWXQRklUz/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-200 transition-all duration-300 active:scale-95 hover:scale-105"
            >
              Resume
            </a>
          </div>
        </nav>
      </header>

      {/* Mobile Navbar */}
      <header className="fixed top-0 left-0 right-0 z-[100] md:hidden">
        <div className={`flex justify-between items-center px-5 py-4 transition-all duration-300 ${scrolled ? 'bg-[#050505]/95' : 'bg-transparent'}`}>
          {/* Mobile Logo */}
          <a
            href="#top"
            className="flex items-center gap-2 text-lg font-bold text-white z-[101]"
            onClick={handleMobileNavClick}
          >
            <span className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-lg font-display font-bold text-sm">S</span>
            <span className="font-display">Sinaaan</span>
          </a>

          {/* Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[101] relative"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-[#050505]/98 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center gap-8 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={handleMobileNavClick}
              className={`text-3xl font-display font-bold text-white hover:text-gray-300 transition-all duration-300 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: mobileMenuOpen ? `${index * 100}ms` : '0ms' }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://drive.google.com/file/d/1sVoJrpMdlZn_TCHccgwWAg7wWXQRklUz/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleMobileNavClick}
            className={`mt-4 px-8 py-3 text-lg font-medium text-black bg-white rounded-full hover:bg-gray-200 transition-all duration-300 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: mobileMenuOpen ? '300ms' : '0ms' }}
          >
            Resume
          </a>
        </div>
      </header>
    </>
  );
};