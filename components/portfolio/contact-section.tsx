'use client';

import { portfolioData } from '@/lib/portfolio-data';
import { useState } from 'react';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="border-b border-pink-700/10 bg-pink-700/3">
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-4xl font-bold text-pink-700">Get in Touch</h2>
        <p className="mb-12 text-pink-700/70">Have a project in mind? Let&apos;s collaborate!</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-pink-700 mb-2">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-pink-700/20 bg-white px-4 py-3 text-pink-700 placeholder-black/40 focus:border-pink-700 focus:outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-pink-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-pink-700/20 bg-white px-4 py-3 text-pink-700 placeholder-black/40 focus:border-pink-700 focus:outline-none"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-pink-700 mb-2">Message</label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="w-full rounded-lg border border-pink-700/20 bg-white px-4 py-3 text-pink-700 placeholder-black/40 focus:border-pink-700 focus:outline-none resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-pink-700 px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Send Message
          </button>

          {submitted && (
            <div className="rounded-lg bg-pink-700/10 p-4 text-center text-sm text-pink-700 font-medium">
              ✓ Message sent successfully!
            </div>
          )}
        </form>

        <div className="mt-16 grid gap-8 border-t border-pink-700/10 pt-12 md:grid-cols-3">
          {portfolioData.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center hover:text-pink-700/70 transition-colors"
            >
              <p className="font-medium text-pink-700">{link.label}</p>
              <p className="text-sm text-pink-700/60">{link.href}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
