import { Header } from '@/components/portfolio/header';
import { HeroSection } from '@/components/portfolio/hero-section';
import { AboutSection } from '@/components/portfolio/about-section';
import { SkillsSection } from '@/components/portfolio/skills-section';
import { ProjectsSection } from '@/components/portfolio/projects-section';
import { EducationSection } from '@/components/portfolio/education-section';
import { GoalsSection } from '@/components/portfolio/goals-section';
import { ContactSection } from '@/components/portfolio/contact-section';
import { Footer } from '@/components/portfolio/footer';
import { DigitalTwinChat } from '@/components/portfolio/digital-twin-chat';

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <GoalsSection />
        <ContactSection />
      </main>
      <Footer />
      <DigitalTwinChat />
    </>
  );
}
