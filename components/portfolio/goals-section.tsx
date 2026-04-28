'use client';

import { portfolioData } from '@/lib/portfolio-data';
import { useState } from 'react';

export function GoalsSection() {
  const [activeGoal, setActiveGoal] = useState<number | null>(null);

  return (
    <section id="goals" className="border-b border-pink-700/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-4xl font-bold text-pink-700">Goals</h2>
        
        <div className="space-y-3">
          {portfolioData.goals.map((goal, index) => (
            <button
              key={index}
              onClick={() => setActiveGoal(activeGoal === index ? null : index)}
              className="w-full rounded-lg border-l-4 border-pink-700 bg-white p-5 text-left transition-all duration-200 hover:bg-pink-700/3 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-700 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-gray-800 font-medium">{goal}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
