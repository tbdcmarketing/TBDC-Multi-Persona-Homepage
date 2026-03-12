import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Landmark, Building, TrendingUp, Mic } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const types = [
  {
    icon: Landmark,
    accentColor: '#D4A843',
    title: 'Government & Public Sector',
    desc: 'Federal, provincial, and municipal bodies that fund startup programming and economic development.',
    value: [
      'Measurable ROI on public investment',
      'Direct line to vetted, funded founders',
      'Province-wide program delivery infrastructure',
      'Startup Visa designee — one of Canada\'s first',
    ],
  },
  {
    icon: Building,
    title: 'Enterprise & Corporate Innovation',
    desc: 'Large organizations looking to source and pilot innovative solutions from startups.',
    value: [
      'Access to curated startup pipeline',
      'Pilot and proof-of-concept facilitation',
      'Innovation sourcing across sectors',
      'Structured corporate-startup engagement',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Investors & Capital Partners',
    desc: 'VCs, angels, family offices, and institutional investors seeking deal flow.',
    value: [
      'Diligenced, structured deal flow',
      'Access to international founders pre-entry',
      'Co-investment and syndication opportunities',
      'Portfolio company support infrastructure',
    ],
  },
  {
    icon: Mic,
    title: 'Media & Storytelling',
    desc: 'Journalists, content creators, and media organizations covering innovation and economic development.',
    value: [
      'Access to founder stories and case studies',
      'Data on economic impact and outcomes',
      'Expert commentary on startup policy',
      'Event and program coverage opportunities',
    ],
  },
];

export default function PartnerTypes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ptype-card', {
        scrollTrigger: { trigger: '.ptype-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="partner-with-us" ref={sectionRef} className="bg-sand py-20 md:py-28 scroll-mt-[104px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)', color: '#D4A843' }}>
            Partner With Us
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal"
            style={{ fontFamily: 'var(--font-heading)' }}>
            How we{' '}
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#D4A843' }}>
              work together.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {types.map((type, i) => (
            <div key={i}
              className="ptype-card card-hover bg-white rounded-2xl p-8 border border-slate-200/50
                flex flex-col">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: type.accentColor ? `${type.accentColor}20` : 'rgba(0,168,142,0.1)' }}>
                <type.icon size={24} style={{ color: type.accentColor || '#00A88E' }} />
              </div>

              <h3 className="text-xl font-extrabold text-charcoal mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {type.title}
              </h3>

              <p className="text-sm text-charcoal/70 mb-5 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}>
                {type.desc}
              </p>

              <p className="text-sm font-bold text-charcoal mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}>
                What you get:
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {type.value.map((v, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-charcoal/70"
                    style={{ fontFamily: 'var(--font-body)' }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                      style={{ backgroundColor: type.accentColor || '#00A88E' }} />
                    {v}
                  </li>
                ))}
              </ul>

              <a href="#partner-cta"
                className="text-sm font-semibold inline-flex items-center gap-1 link-hover transition-all"
                style={{ fontFamily: 'var(--font-body)', color: type.accentColor || '#00A88E' }}>
                Get in touch <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
