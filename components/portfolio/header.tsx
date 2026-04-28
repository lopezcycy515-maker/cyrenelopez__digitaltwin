'use client';

import { useState, useEffect } from 'react';
import { portfolioData } from '@/lib/portfolio-data';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('persona');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['persona', 'about', 'skills', 'projects', 'education', 'goals', 'contact'];
      let current = 'persona';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) => {
    const sectionId = href.replace('#', '');
    return sectionId === activeSection;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white backdrop-blur-sm bg-white/95">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#persona" className="text-2xl font-bold text-black transition-opacity hover:opacity-70">
            {portfolioData.name}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {portfolioData.navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium transition-all ${
                      isActive(link.href)
                        ? 'border-b-2 border-black text-black'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button className="ml-4 rounded bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
                  Sign in
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-black transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-black transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-black transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 border-t border-black/10 pt-4">
            <ul className="flex flex-col gap-2">
              {portfolioData.navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2 text-sm font-medium transition-all ${
                      isActive(link.href)
                        ? 'border-l-2 border-black bg-black/5 text-black'
                        : 'text-gray-600 hover:text-black hover:bg-black/5'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button className="w-full rounded bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
                  Sign in
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
