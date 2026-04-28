'use client';

import { portfolioData } from '@/lib/portfolio-data';
import { useState } from 'react';

export function EducationSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="education" className="border-b border-black/10 bg-black/3">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-4xl font-bold text-black">Education</h2>
        
        <div className="space-y-4">
          {portfolioData.education.map((edu, index) => (
            <button
              key={index}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full rounded-xl border border-black/10 bg-white p-6 text-left transition-all duration-200 hover:bg-black/2 hover:border-black/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-black">{edu.school}</h3>
                  <p className="mt-1 text-black/70">{edu.program || edu.degree}</p>
                </div>
                <span className="text-sm font-medium text-black/60">{edu.year}</span>
              </div>
              {expandedIndex === index && (
                <div className="mt-4 border-t border-black/10 pt-4 text-sm text-black/60">
                  <p>Click to close</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
