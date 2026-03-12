import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe, RefreshCw, Plane } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    icon: Globe,
    name: 'Horizon',
    tagline: 'Scout · Sprint · Surge',
    audience: 'International scaleups exploring North American expansion. Pre-revenue in this market, post-revenue at home.',
    format: 'Cohort-based. Two cohorts annually (Spring / Fall).',
    duration: '4–6 months (Scout → Sprint → Surge).',
    fee: 'Fee-based with performance-aligned milestones.',
    deliverables: [
      'Feasibility report and GTM roadmap',
      'Curated Sprint Week of qualified meetings',
      'Fractional C-suite matching and support',
      'Investor readiness coaching and introductions',
      'Compliance, incorporation, and regulatory navigation',
    ],
  },
  {
    icon: RefreshCw,
    name: 'Pivot',
    tagline: 'Pilot · Adapt · Scale',
    audience: "International scaleups with an existing North American presence that's stalled or plateaued.",
    format: 'Rolling intake. Customized engagement scoped to your specific gaps.',
    duration: '3–6 months.',
    fee: 'Fee-based, scoped to engagement.',
    deliverables: [
      'Market repositioning and GTM recalibration',
      'Channel strategy and partnership mapping',
      'Fractional leadership for execution gaps',
      'Financial restructuring and investor re-engagement',
      'Board and advisory reconfiguration',
    ],
  },
  {
    icon: Plane,
    name: 'Land & Expand',
    tagline: 'Arrive · Settle · Grow',
    audience: "Post-program founders who've committed to building in Canada.",
    format: "Ongoing support for alumni and founders who've incorporated or relocated.",
    duration: '12–24 months.',
    fee: 'Government-funded. No cost to founders.',
    deliverables: [
      'Immigration and work-permit coordination',
      'Office space and co-working partnerships',
      'Banking, payroll, and operational setup',
      'Talent recruitment and team building',
      'Ongoing deal facilitation and investor access',
    ],
  },
];

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.prog-card', {
        scrollTrigger: { trigger: '.prog-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="programs" ref={sectionRef} className="bg-sand py-20 md:py-28 scroll-mt-[104px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Programs
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal"
            style={{ fontFamily: 'var(--font-heading)' }}>
            The right program.{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              The right pace.
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {programs.map((prog, i) => (
            <div key={i}
              className="prog-card card-hover bg-white rounded-2xl p-8 border border-slate-200/50
                flex flex-col relative overflow-hidden">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5">
                <prog.icon size={24} className="text-teal" />
              </div>

              <h3 className="text-2xl font-extrabold text-charcoal mb-1"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {prog.name}
              </h3>

              <p className="text-teal text-sm font-bold mb-4"
                style={{ fontFamily: 'var(--font-mono)' }}>
                {prog.tagline}
              </p>

              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-xs font-bold text-charcoal/40 uppercase tracking-wider mb-0.5"
                    style={{ fontFamily: 'var(--font-mono)' }}>Audience</p>
                  <p className="text-sm text-charcoal/70" style={{ fontFamily: 'var(--font-body)' }}>
                    {prog.audience}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-charcoal/40 uppercase tracking-wider mb-0.5"
                    style={{ fontFamily: 'var(--font-mono)' }}>Format</p>
                  <p className="text-sm text-charcoal/70" style={{ fontFamily: 'var(--font-body)' }}>
                    {prog.format}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-charcoal/40 uppercase tracking-wider mb-0.5"
                    style={{ fontFamily: 'var(--font-mono)' }}>Duration</p>
                  <p className="text-sm text-charcoal/70" style={{ fontFamily: 'var(--font-body)' }}>
                    {prog.duration}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-charcoal/40 uppercase tracking-wider mb-0.5"
                    style={{ fontFamily: 'var(--font-mono)' }}>Fee</p>
                  <p className="text-sm text-charcoal/70" style={{ fontFamily: 'var(--font-body)' }}>
                    {prog.fee}
                  </p>
                </div>
              </div>

              <p className="text-sm font-bold text-charcoal mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}>
                What's included:
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {prog.deliverables.map((d, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-charcoal/70"
                    style={{ fontFamily: 'var(--font-body)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0 mt-1.5" />
                    {d}
                  </li>
                ))}
              </ul>

              <a href="#apply"
                className="bg-teal hover:bg-teal-dark text-white font-semibold px-6 py-3
                  rounded-full text-sm text-center inline-flex items-center justify-center gap-2 transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}>
                Apply to {prog.name} <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
