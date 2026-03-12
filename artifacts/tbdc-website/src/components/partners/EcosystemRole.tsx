import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EcosystemRole() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.er-text', {
        scrollTrigger: { trigger: '.er-text', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="ecosystem" ref={sectionRef} className="bg-warm-white py-20 md:py-28 scroll-mt-[104px]">
      <div className="max-w-4xl mx-auto px-6 lg:px-16">
        <h2 className="er-text text-2xl md:text-3xl lg:text-4xl font-extrabold text-charcoal mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}>
          Ontario's startup ecosystem is world-class. The coordination layer between government priorities, founder needs, and private capital is still being built.
        </h2>

        <p className="er-text text-charcoal/80 leading-relaxed mb-6"
          style={{ fontFamily: 'var(--font-body)' }}>
          TBDC has been that coordination layer since 1990. We connect three levels of government with vetted founders, qualified investors, enterprise buyers, and institutional partners. When government invests in TBDC programming, the return shows up in jobs, tax revenue, and export growth.
        </p>

        <p className="er-text text-charcoal/80 leading-relaxed mb-6"
          style={{ fontFamily: 'var(--font-body)' }}>
          For enterprises, we're a pipeline to international innovation. For investors, we're a source of diligenced, structured deal flow. For media, we're the story of what happens when public and private sectors actually work together.
        </p>

        <p className="er-text text-xl md:text-2xl font-extrabold text-charcoal"
          style={{ fontFamily: 'var(--font-heading)' }}>
          TBDC doesn't compete with the ecosystem. We make it work.
        </p>
      </div>
    </section>
  );
}
