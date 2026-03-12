import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Footer from '../shared/Footer';
import SectionDivider from '../shared/SectionDivider';
import ProofTicker from '../shared/ProofTicker';
import TimelineTable from '../shared/TimelineTable';
import PartnersHero from './PartnersHero';
import EcosystemRole from './EcosystemRole';
import PartnerTypes from './PartnerTypes';
import GovernmentTrust from './GovernmentTrust';
import Workforce from './Workforce';
import PartnersCTA from './PartnersCTA';

gsap.registerPlugin(ScrollTrigger);

export default function PartnersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timer);
  }, []);

  const proofItems = [
    'Ontario government designee for Startup Visa program',
    'Recognized by the Prime Minister\'s Office',
    '$3.3M federal investment in 2023',
    '$263M+ economic output since 2022',
    'Province-wide reach across Ontario',
  ];

  return (
    <>
      <PartnersHero />
      <ProofTicker items={proofItems} />

      <SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />
      <EcosystemRole />

      <SectionDivider fromColor="#FAF8F5" toColor="#F0ECE3" />
      <PartnerTypes />

      <SectionDivider fromColor="#F0ECE3" toColor="#0A1628" />
      <GovernmentTrust />

      <SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />
      <Workforce />

      <SectionDivider fromColor="#FAF8F5" toColor="#0A1628" />
      <PartnersCTA />

      <SectionDivider fromColor="#0A1628" toColor="#F0ECE3" />
      <TimelineTable />

      <Footer />
    </>
  );
}
