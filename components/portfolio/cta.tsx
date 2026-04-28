'use client';

import { portfolioData } from '@/lib/portfolio-data';

export function CTA() {
  return (
    <>
      <a
        href={portfolioData.cta.primary.href}
        className="inline-block rounded bg-black px-8 py-3 font-medium text-white transition-opacity hover:opacity-90"
      >
        {portfolioData.cta.primary.label}
      </a>
      <a
        href={portfolioData.cta.secondary.href}
        className="inline-block rounded border-2 border-black px-8 py-3 font-medium text-black transition-colors hover:bg-black hover:text-white"
      >
        {portfolioData.cta.secondary.label}
      </a>
    </>
  );
}
