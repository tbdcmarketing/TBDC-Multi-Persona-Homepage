import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookOpen, GraduationCap, Briefcase, Plane } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    icon: BookOpen,
    name: 'Business Inc.',
    tagline: 'Plan · Build · Launch',
    audience: 'Ontario residents age 18+ who want to start a business.',
    format: '8–12 weeks of structured business planning workshops, 1:1 mentorship, and peer cohort sessions.',
    cost: 'Government-funded. No cost to participants.',
    deliverables: [
      'Business plan development with expert guidance',
      'Financial literacy and bookkeeping fundamentals',
      'Marketing strategy and customer acquisition planning',
      'Pitch preparation and presentation coaching',
      'Access to TBDC\'s mentor and investor network',
    ],
  },
  {
    icon: GraduationCap,
    name: 'Biz Futures',
    tagline: 'Learn · Earn · Grow',
    audience: 'Youth entrepreneurs age 15–29 looking to explore entrepreneurship.',
    format: 'Part-time program with flexible scheduling, combining workshops, mentorship, and real-world business experience.',
    cost: 'Government-funded. No cost to participants.',
    deliverables: [
      'Entrepreneurship fundamentals and business model design',
      'Hands-on business simulation and real-world application',
      'Mentorship from experienced entrepreneurs',
      'Financial literacy and basic accounting',
      'Certificate of completion and TBDC alumni network access',
    ],
  },
  {
    icon: Briefcase,
    name: 'Preparing for Self-Employment',
    tagline: 'Assess · Plan · Transition',
    audience: 'Ontario residents considering self-employment as a career path, including those transitioning from traditional employment.',
    format: 'Structured workshops and individual coaching designed to help you evaluate your business idea and prepare for self-employment.',
    cost: 'Government-funded. No cost to participants.',
    deliverables: [
      'Self-employment readiness assessment',
      'Business concept validation and market research',
      'Personal financial planning for entrepreneurs',
      'Legal and regulatory requirements overview',
      'Transition planning and timeline development',
    ],
  },
  {
    icon: Plane,
    name: 'Land & Expand',
    tagline: 'Arrive · Settle · Grow',
    audience: 'Newcomer entrepreneurs who have arrived in Canada and want structured support to launch or grow their business.',
    format: 'Ongoing. Rolling intake.',
    cost: 'Government-funded. No cost to participants.',
    deliverables: [
      'Settlement and integration support',
      'Business registration and compliance guidance',
      'Access to banking, payroll, and operational setup',
      'Mentorship from founders who\'ve made the same journey',
      'Connection to TBDC\'s investor and enterprise network',
    ],
  },
];

export default function ProgramPaths() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pp-card', {
        scrollTrigger: { trigger: '.pp-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="programs" ref={sectionRef} className="bg-sand py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Programs
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Find the path that{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              fits where you are.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((prog, i) => (
            <div key={i}
              className="pp-card card-hover bg-white rounded-2xl p-8 border border-slate-200/50
                flex flex-col">
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
                    style={{ fontFamily: 'var(--font-mono)' }}>Cost</p>
                  <p className="text-sm text-charcoal/70" style={{ fontFamily: 'var(--font-body)' }}>
                    {prog.cost}
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
