import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Users, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    icon: Compass,
    num: '01',
    title: 'Scout: Know before you grow.',
    desc: 'A 4–6 week feasibility engagement. We map your competitive landscape, identify the highest-value entry points, match you with sector-specific advisors, and hand you a GTM foundation you can execute against. No guessing. No wasted runway.',
    label: 'What you get:',
    items: [
      'Market feasibility report with clear entry paths',
      'Risk and regulatory assessment',
      'Industry-expert matching in your sector',
      'Strategic GTM foundation',
    ],
  },
  {
    icon: Users,
    num: '02',
    title: 'Sprint: Five days. The right rooms.',
    desc: 'Sprint Week in Toronto is where research becomes relationships. Before you arrive, we\'ve already matched you with enterprise customers ready to evaluate your product, VCs actively deploying in your sector, and operators who\'ve scaled your exact journey. Every meeting is curated. Nothing left to chance.',
    label: 'What you get:',
    items: [
      'Curated 1:1 meetings with buyers and investors',
      'Sales and GTM clinics led by operators',
      'Compliance and regulatory navigation',
      'Full ecosystem integration across Toronto\'s network',
    ],
  },
  {
    icon: Rocket,
    num: '03',
    title: 'Surge: Execute. With deep confidence.',
    desc: 'Post-Sprint, we match you with fractional C-suite executives who\'ve actually scaled into North America. They work alongside your team to implement your GTM, navigate compliance, prepare you for fundraising, and keep you moving. 3–6 months. Monthly strategy sessions plus on-demand access when it matters.',
    label: 'What you get:',
    items: [
      'Matched fractional executive support',
      'GTM implementation with North American playbooks',
      'Investor readiness coaching',
      'Regulatory and incorporation guidance',
    ],
  },
];

export default function ThreeStages() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stage-card', {
        scrollTrigger: { trigger: '.stage-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-warm-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Three stages. One outcome:{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              traction.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {stages.map((stage, i) => (
            <div key={i}
              className="stage-card card-hover bg-white rounded-2xl p-8 border border-slate-200/50
                border-t-[3px] border-t-teal relative overflow-hidden">
              <span className="absolute top-2 right-3 text-6xl font-extrabold text-charcoal/[0.03] pointer-events-none"
                style={{ fontFamily: 'var(--font-mono)' }}>
                {stage.num}
              </span>

              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5">
                <stage.icon size={24} className="text-teal" />
              </div>

              <p className="text-teal text-xs font-bold uppercase tracking-wider mb-2"
                style={{ fontFamily: 'var(--font-mono)' }}>
                Stage {stage.num}
              </p>

              <h3 className="text-lg font-bold text-charcoal mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {stage.title}
              </h3>

              <p className="text-sm text-charcoal/70 leading-relaxed mb-4"
                style={{ fontFamily: 'var(--font-body)' }}>
                {stage.desc}
              </p>

              <p className="text-sm font-bold text-charcoal mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {stage.label}
              </p>

              <ul className="space-y-2">
                {stage.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-charcoal/70"
                    style={{ fontFamily: 'var(--font-body)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
