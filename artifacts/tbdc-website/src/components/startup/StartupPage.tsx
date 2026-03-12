import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import SectionDivider from '../shared/SectionDivider';
import ProofTicker from '../shared/ProofTicker';
import TimelineTable from '../shared/TimelineTable';
import StartupHero from './StartupHero';
import BuildAlone from './BuildAlone';
import ProgramPaths from './ProgramPaths';
import Mentorship from './Mentorship';
import TrackRecord from './TrackRecord';
import StartupCTA from './StartupCTA';

gsap.registerPlugin(ScrollTrigger);

export default function StartupPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { label: 'Programs', href: '#programs' },
    { label: 'Mentorship', href: '#mentorship' },
    { label: 'Track Record', href: '#track-record' },
  ];

  const proofItems = [
    'Hydrostor — clean energy unicorn and TBDC alumni',
    'Turtle Island Recycling Corp. — circular economy unicorn',
    '1,900+ businesses launched since 1990',
    '$263M+ in economic output since 2022',
    'Province of Ontario Award of Recognition',
  ];

  return (
    <>
      <Navbar links={navLinks} ctaLabel="Find Your Program" ctaHref="#programs" />
      <StartupHero />
      <ProofTicker items={proofItems} />

      <SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />
      <BuildAlone />

      <SectionDivider fromColor="#FAF8F5" toColor="#F0ECE3" />
      <ProgramPaths />

      <SectionDivider fromColor="#F0ECE3" toColor="#FAF8F5" />
      <Mentorship />

      <SectionDivider fromColor="#FAF8F5" toColor="#0A1628" />
      <TrackRecord />

      <SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />
      <StartupCTA />

      <SectionDivider fromColor="#FAF8F5" toColor="#F0ECE3" />
      <TimelineTable />

      <Footer />
    </>
  );
}
