'use client';

import { portfolioData } from '@/lib/portfolio-data';
import { CTA } from './cta';
import { SocialLinks } from './social-links';

export function HeroSection() {
  return (
    <section id="persona" className="border-b border-black/10 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {/* Content */}
          <div className="space-y-10">
            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-wider text-black/60 uppercase">
                {portfolioData.status}
              </p>
              <h2 className="text-5xl font-bold text-black lg:text-6xl">
                {portfolioData.name}
              </h2>
              <p className="text-lg font-medium text-black/70">
                {portfolioData.title}
              </p>
            </div>

            <div className="space-y-4 text-black/70">
              <p className="text-base leading-relaxed">
                {portfolioData.bio}
              </p>
              <p className="text-sm leading-relaxed">
                {portfolioData.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <CTA />
            </div>

            <div className="flex gap-8 pt-4">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
