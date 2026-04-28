'use client';

import { portfolioData } from '@/lib/portfolio-data';

export function SkillsSection() {
  return (
    <section id="skills" className="border-b border-black/10 bg-black/3">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-4xl font-bold text-black">Skills</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {portfolioData.skills.map((skill, index) => (
            <div
              key={index}
              className="rounded-lg border border-black/10 bg-white px-6 py-4 transition-all hover:shadow-md hover:border-black/20"
            >
              <p className="font-medium text-black">{skill}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
