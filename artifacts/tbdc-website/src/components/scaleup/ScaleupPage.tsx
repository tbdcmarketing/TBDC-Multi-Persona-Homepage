import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import SectionDivider from '../shared/SectionDivider';
import ProofTicker from '../shared/ProofTicker';
import TimelineTable from '../shared/TimelineTable';
import ScaleupHero from './ScaleupHero';
import MarketGap from './MarketGap';
import Approach from './Approach';
import ThreeStages from './ThreeStages';
import Programs from './Programs';
import CaseStudies from './CaseStudies';
import WhyCanada from './WhyCanada';
import Qualifications from './Qualifications';
import ScaleupCTA from './ScaleupCTA';

gsap.registerPlugin(ScrollTrigger);

export default function ScaleupPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { label: 'Our Approach', href: '#approach' },
    { label: 'Programs', href: '#programs' },
    { label: 'Results', href: '#results' },
    { label: 'Why Canada', href: '#why-canada' },
  ];

  const proofItems = [
    'Romanian robotics co. closes North American contract before return flight',
    'Latvian defence tech: paying customers in 90 days',
    'Healthtech founder meets Canada\'s largest hospital procurement team',
    'Cybersecurity co. builds enterprise pipeline in 4 weeks',
  ];

  return (
    <>
      <Navbar links={navLinks} ctaLabel="Apply to Horizon or Pivot" ctaHref="#apply" />
      <ScaleupHero />
      <ProofTicker items={proofItems} />

      <SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />
      <MarketGap />

      <SectionDivider fromColor="#FAF8F5" toColor="#F0ECE3" />
      <Approach />

      <SectionDivider fromColor="#F0ECE3" toColor="#FAF8F5" />
      <ThreeStages />

      <SectionDivider fromColor="#FAF8F5" toColor="#F0ECE3" />
      <Programs />

      <SectionDivider fromColor="#F0ECE3" toColor="#0A1628" />
      <CaseStudies />

      <SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />
      <WhyCanada />

      <SectionDivider fromColor="#FAF8F5" toColor="#F0ECE3" />
      <Qualifications />

      <SectionDivider fromColor="#F0ECE3" toColor="#0A1628" />
      <ScaleupCTA />

      <SectionDivider fromColor="#0A1628" toColor="#F0ECE3" />
      <TimelineTable />

      <Footer />
    </>
  );
}
