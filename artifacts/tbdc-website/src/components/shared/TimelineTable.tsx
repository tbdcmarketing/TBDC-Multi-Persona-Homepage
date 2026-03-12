import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '1990', text: 'Founded by the City of Toronto and Province of Ontario at 1071 King St. West —one of Canada\'s first publicly backed startup incubators.' },
  { year: '1993', text: 'Self-Employment Assistance Program launched, building the structured support systems that still anchor our work.' },
  { year: '2003', text: 'National recognition. Awarded Incubator of the Year as Toronto\'s startup ecosystem gained momentum.' },
  { year: '2004', text: 'Youth-At-Risk Self-Employment Program launched, expanding entrepreneurship access to underrepresented communities.' },
  { year: '2005', text: 'Second location opened at 105 Jungle Road in Etobicoke.' },
  { year: '2006', text: 'Summer Company Program and BIZ Futures launched.' },
  { year: '2008', text: 'Canada\'s Top Incubator. Named the country\'s leading incubator for measurable outcomes and program design.' },
  { year: '2009', text: 'Province of Ontario Award of Recognition for measurable economic contribution.' },
  { year: '2010', text: 'Canada\'s Incubator of the Year (CABI).' },
  { year: '2013', text: 'Federal designation. Became one of the first incubators authorized to support Canada\'s Startup Visa program.' },
  { year: '2015', text: 'First unicorn. Turtle Island Recycling Corporation scales to $1B+ valuation, cementing TBDC\'s role in Canada\'s circular economy.' },
  { year: '2019', text: 'Second unicorn. Hydrostor achieves unicorn status, strengthening TBDC\'s role in Canada\'s cleantech economy.' },
  { year: '2020–2021', text: 'Global programming connects 660+ founders from India, CEE, Europe, and Southeast Asia.' },
  { year: '2022', text: 'Horizon and Pivot programs launched for international scaleups entering North America.' },
  { year: '2023', text: '$3.3M federal investment for the Land & Expand program. Moved to 111 Peter St. Recognized by the Prime Minister\'s Office.' },
  { year: '2025', text: 'Province-wide reach. Ontario\'s only province-wide Startup Visa incubator with deepened government and industry partnerships.' },
];

export default function TimelineTable() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-row', {
        scrollTrigger: { trigger: '.timeline-row', start: 'top 85%', toggleActions: 'play none none none' },
        y: 20, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-sand py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            The institution behind the programs.
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}>
            TBDC: Thirty-six years of showing up.
          </h2>
          <p className="text-charcoal/70 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}>
            Founded by the City of Toronto. Backed by three levels of government. Recognized nationally and internationally for measurable economic impact.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {milestones.map((m, i) => (
            <div key={i} className="timeline-row flex gap-6 py-4 border-b border-charcoal/10 last:border-b-0">
              <span className="text-teal font-bold text-sm shrink-0 w-24"
                style={{ fontFamily: 'var(--font-mono)' }}>
                {m.year}
              </span>
              <p className="text-charcoal/80 text-sm leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}>
                {m.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
