'use client';

import { portfolioData } from '@/lib/portfolio-data';

export function CTA() {
  return (
    <>
      <a
        href={portfolioData.cta.primary.href}
        className="inline-block rounded bg-pink-700 px-8 py-3 font-medium text-white transition-opacity hover:opacity-90"
      >
        {portfolioData.cta.primary.label}
      </a>
      <a
        href={portfolioData.cta.secondary.href}
        className="inline-block rounded border-2 border-pink-700 px-8 py-3 font-medium text-pink-700 transition-colors hover:bg-pink-700 hover:text-white"
      >
        {portfolioData.cta.secondary.label}
      </a>
    </>
  );
}
