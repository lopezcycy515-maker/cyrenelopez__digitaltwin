'use client';

import { portfolioData } from '@/lib/portfolio-data';

export function SocialLinks() {
  return (
    <div className="flex gap-6">
      {portfolioData.socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="text-sm font-medium text-gray-700 transition-colors hover:text-pink-700"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
