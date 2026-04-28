'use client';

import { portfolioData } from '@/lib/portfolio-data';

export function SocialLinks() {
  return (
    <div className="flex gap-6">
      {portfolioData.socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="text-sm font-medium text-gray-700 transition-colors hover:text-black"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
