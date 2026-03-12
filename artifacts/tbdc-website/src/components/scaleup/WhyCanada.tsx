import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DollarSign, Users, Building, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { icon: DollarSign, title: '#1 in G7 for R&D tax incentives', desc: 'SR&ED credits, IRAP, and other programs reduce innovation costs.' },
  { icon: Users, title: 'Access to 500M+ consumers', desc: 'CUSMA/USMCA gives you preferential access to North American markets.' },
  { icon: Building, title: 'World-class institutions', desc: 'Top universities, research hospitals, and an AI ecosystem rivaling any global hub.' },
  { icon: Globe, title: 'Canada\'s most multicultural city', desc: 'Toronto\'s diversity is a strategic asset. Over 200 languages spoken. Global business culture built in.' },
];

export default function WhyCanada() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wc-card', {
        scrollTrigger: { trigger: '.wc-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why-canada" ref={sectionRef} className="bg-warm-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Why Canada
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Why Toronto.{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              Why now.
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div key={i}
              className="wc-card card-hover bg-white rounded-2xl p-8 border border-slate-200/50 text-center">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5 mx-auto">
                <r.icon size={24} className="text-teal" />
              </div>
              <h3 className="text-base font-bold text-charcoal mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {r.title}
              </h3>
              <p className="text-sm text-charcoal/70" style={{ fontFamily: 'var(--font-body)' }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
