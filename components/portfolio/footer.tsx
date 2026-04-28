'use client';

import { portfolioData } from '@/lib/portfolio-data';
import { SocialLinks } from './social-links';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{portfolioData.name}</h3>
            <p className="text-white/70 text-sm">
              {portfolioData.title}
            </p>
            <p className="text-white/60 text-xs">
              Creating beautiful digital experiences with clean code and thoughtful design.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <nav>
              <ul className="space-y-2">
                {portfolioData.navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Connect</h3>
            <p className="text-white/70 text-sm">
              Let&apos;s build something amazing together.
            </p>
            <div className="flex gap-4">
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/60 text-sm">
          <p>
            &copy; {currentYear} {portfolioData.name}. All rights reserved.
          </p>
          <p>
            Designed and built with passion for the web.
          </p>
        </div>
      </div>
    </footer>
  );
}
