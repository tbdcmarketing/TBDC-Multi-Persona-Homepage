import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Footer from '../shared/Footer';
import SectionDivider from '../shared/SectionDivider';
import TeamHero from './TeamHero';
import TeamGrid from './TeamGrid';
import TeamCTA from './TeamCTA';

gsap.registerPlugin(ScrollTrigger);

export default function TeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <TeamHero />
      <SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />
      <TeamGrid />
      <SectionDivider fromColor="#FAF8F5" toColor="#0A1628" />
      <TeamCTA />
      <Footer />
    </>
  );
}
