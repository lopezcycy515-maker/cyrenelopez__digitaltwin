'use client';

import { portfolioData } from '@/lib/portfolio-data';

export function AboutSection() {
  return (
    <section id="about" className="border-b border-black/10 bg-black/3">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div>
            <h2 className="text-4xl font-bold text-black mb-6">About Me</h2>
            <div className="space-y-6 text-black/70">
              <p className="text-lg leading-relaxed">
                {portfolioData.bio}
              </p>
              <p className="text-base leading-relaxed">
                {portfolioData.description}
              </p>
              <p className="text-base leading-relaxed">
                I believe in continuous learning and staying updated with the latest technologies. Whether it's crafting pixel-perfect interfaces or building robust backend systems, I'm committed to delivering excellence in every project I work on.
              </p>
              <p className="text-base leading-relaxed">
                When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or sharing knowledge with fellow developers in the community.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-black">What I Do</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-black font-bold">•</span>
                  <span className="text-black/70">Full-stack web application development</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black font-bold">•</span>
                  <span className="text-black/70">User experience and interface design</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black font-bold">•</span>
                  <span className="text-black/70">Performance optimization and scalability</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black font-bold">•</span>
                  <span className="text-black/70">Technical mentoring and knowledge sharing</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-black">My Approach</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-black font-bold">•</span>
                  <span className="text-black/70">User-centric design philosophy</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black font-bold">•</span>
                  <span className="text-black/70">Clean, maintainable, and documented code</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black font-bold">•</span>
                  <span className="text-black/70">Agile development methodologies</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black font-bold">•</span>
                  <span className="text-black/70">Collaborative problem-solving</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
