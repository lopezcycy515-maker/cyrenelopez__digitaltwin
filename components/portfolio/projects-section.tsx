'use client';

import { portfolioData } from '@/lib/portfolio-data';
import { useState } from 'react';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="border-b border-black/10 bg-black/3">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-4xl font-bold text-black">Projects</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioData.projects.map((project, index) => (
            <button
              key={index}
              onClick={() => setSelectedProject(selectedProject === index ? null : index)}
              className="group cursor-pointer rounded-2xl border-2 border-black/10 bg-white p-6 text-left transition-all duration-200 hover:border-black hover:shadow-lg"
            >
              <h3 className="text-xl font-bold text-black group-hover:text-black/80">
                {project.title}
              </h3>
              <p className="mt-2 text-black/60">
                {project.description}
              </p>
              {selectedProject === index && (
                <div className="mt-4 text-sm text-black/70">
                  <p>Click to close details</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
