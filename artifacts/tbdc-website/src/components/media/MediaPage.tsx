import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import SectionDivider from '../shared/SectionDivider';
import MediaHero from './MediaHero';
import MediaFeatured from './MediaFeatured';
import MediaGrid from './MediaGrid';
import MediaCTA from './MediaCTA';

gsap.registerPlugin(ScrollTrigger);

export default function MediaPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <MediaHero />
      <SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />
      <MediaFeatured />
      <SectionDivider fromColor="#FAF8F5" toColor="#F0ECE3" />
      <MediaGrid />
      <SectionDivider fromColor="#F0ECE3" toColor="#0A1628" />
      <MediaCTA />
      <Footer />
    </>
  );
}
