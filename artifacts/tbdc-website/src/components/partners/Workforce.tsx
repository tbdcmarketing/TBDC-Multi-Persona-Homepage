import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Workforce() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wf-text', {
        scrollTrigger: { trigger: '.wf-text', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-warm-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 lg:px-16">
        <p className="wf-text text-sm font-bold uppercase tracking-wider mb-3"
          style={{ fontFamily: 'var(--font-mono)', color: '#D4A843' }}>
          Economic Impact
        </p>

        <h2 className="wf-text text-2xl md:text-3xl lg:text-4xl font-extrabold text-charcoal mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}>
          Every founder we support creates jobs, pays taxes, and strengthens communities.
        </h2>

        <p className="wf-text text-charcoal/80 leading-relaxed mb-6"
          style={{ fontFamily: 'var(--font-body)' }}>
          Since 2022 alone, TBDC programming has generated $263M+ in economic output across Ontario. Our founders hire locally, export globally, and build the kind of businesses that strengthen supply chains, create middle-class jobs, and diversify local economies.
        </p>

        <p className="wf-text text-charcoal/80 leading-relaxed mb-6"
          style={{ fontFamily: 'var(--font-body)' }}>
          For government partners, this translates directly to measurable returns: job creation, tax revenue, innovation competitiveness, and community resilience. For enterprise partners, it means access to a pipeline of vetted, ambitious companies building solutions to real problems.
        </p>

        <p className="wf-text text-xl md:text-2xl font-extrabold text-charcoal"
          style={{ fontFamily: 'var(--font-heading)' }}>
          When you partner with TBDC, you're investing in outcomes — not activities.
        </p>
      </div>
    </section>
  );
}
