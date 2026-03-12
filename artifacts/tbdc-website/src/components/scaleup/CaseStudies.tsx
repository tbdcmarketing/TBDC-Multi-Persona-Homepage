import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Shield, Landmark as LandmarkIcon, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const studies = [
  {
    icon: Globe,
    region: 'CEE Cohort',
    company: 'Virtual Events Platform',
    origin: 'Central & Eastern Europe',
    metric: '3,000+ events across 27 countries',
    challenge: 'Couldn\'t land a single North American enterprise meeting despite strong global traction.',
    result: 'TBDC curated introductions that led to pilot conversations with two Fortune 500 companies within 30 days of Sprint Week.',
    quote: '"We had the product. TBDC gave us the rooms we couldn\'t get into alone."',
  },
  {
    icon: Shield,
    company: 'Cybersecurity Company',
    origin: 'Europe',
    metric: 'Serving enterprise clients across EU',
    challenge: 'Research calls weren\'t converting to commercial conversations.',
    result: 'Sprint Week connected the founder directly with CISOs and procurement leads at Canadian banks and critical infrastructure companies.',
    quote: '"Four meetings in five days. Each one led to a follow-up. That doesn\'t happen with cold outreach."',
  },
  {
    icon: LandmarkIcon,
    company: 'Romanian Robotics Company',
    origin: 'Romania',
    metric: 'Advanced industrial robotics platform',
    challenge: 'Needed validated demand and a signed agreement before committing to expansion.',
    result: 'During Sprint Week, the founder closed a North American distribution agreement — before the return flight.',
    quote: '"We came for research. We left with a signed agreement."',
  },
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cs-card', {
        scrollTrigger: { trigger: '.cs-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="results" ref={sectionRef} className="bg-navy py-20 md:py-28 scroll-mt-[104px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Proof
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Results, not testimonials.
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {studies.map((study, i) => (
            <div key={i}
              className="cs-card card-hover bg-white/5 backdrop-blur-sm rounded-2xl p-8
                border border-white/10 flex flex-col">
              <div className="w-12 h-12 bg-teal/20 rounded-xl flex items-center justify-center mb-5">
                <study.icon size={24} className="text-teal" />
              </div>

              {study.region && (
                <p className="text-teal text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ fontFamily: 'var(--font-mono)' }}>
                  {study.region}
                </p>
              )}

              <h3 className="text-lg font-bold text-white mb-1"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {study.company}
              </h3>

              <p className="text-white/40 text-xs mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
                {study.origin} · {study.metric}
              </p>

              <div className="space-y-3 mb-5 flex-1">
                <div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-0.5"
                    style={{ fontFamily: 'var(--font-mono)' }}>Challenge</p>
                  <p className="text-sm text-white/70" style={{ fontFamily: 'var(--font-body)' }}>
                    {study.challenge}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-0.5"
                    style={{ fontFamily: 'var(--font-mono)' }}>Result</p>
                  <p className="text-sm text-white/70" style={{ fontFamily: 'var(--font-body)' }}>
                    {study.result}
                  </p>
                </div>
              </div>

              <blockquote className="border-l-2 border-teal pl-4 text-sm text-teal italic"
                style={{ fontFamily: 'var(--font-serif)' }}>
                {study.quote}
              </blockquote>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a href="#apply"
            className="bg-teal hover:bg-teal-dark text-white font-semibold px-8 py-3
              rounded-full text-sm inline-flex items-center gap-2 transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}>
            Join the next cohort <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
