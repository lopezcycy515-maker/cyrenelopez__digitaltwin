'use client';

import { portfolioData } from '@/lib/portfolio-data';
import { useState } from 'react';

export function EducationSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="education" className="border-b border-pink-700/10 bg-pink-700/3">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-4xl font-bold text-pink-700">Education</h2>
        
        <div className="space-y-4">
          {portfolioData.education.map((edu, index) => (
            <button
              key={index}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full rounded-xl border border-pink-700/10 bg-white p-6 text-left transition-all duration-200 hover:bg-pink-700/2 hover:border-pink-700/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-pink-700">{edu.school}</h3>
                  <p className="mt-1 text-gray-600">{edu.program || edu.degree}</p>
                </div>
                <span className="text-sm font-medium text-gray-500">{edu.year}</span>
              </div>
              {expandedIndex === index && (
                <div className="mt-4 border-t border-pink-700/10 pt-4 text-sm text-gray-500">
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
