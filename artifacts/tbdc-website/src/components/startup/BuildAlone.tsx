import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BuildAlone() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ba-text', {
        scrollTrigger: { trigger: '.ba-text', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-warm-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 lg:px-16">
        <h2 className="ba-text text-2xl md:text-3xl lg:text-4xl font-extrabold text-charcoal mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}>
          Building alone is hard. Building without the right people around you is harder.
        </h2>

        <p className="ba-text text-charcoal/80 leading-relaxed mb-6"
          style={{ fontFamily: 'var(--font-body)' }}>
          You know the stats. Most startups fail — not because of bad ideas, but because of bad timing, no distribution, and zero access to the rooms that matter.
        </p>

        <p className="ba-text text-charcoal/80 leading-relaxed mb-6"
          style={{ fontFamily: 'var(--font-body)' }}>
          That's especially true for newcomer entrepreneurs. You arrive with skills, ambition, and often more resilience than most Canadian-born founders. But you don't have the network. You don't know the funding landscape. You may not have Canadian credit history, a local co-founder, or a warm introduction to an investor.
        </p>

        <p className="ba-text text-xl md:text-2xl font-extrabold text-charcoal"
          style={{ fontFamily: 'var(--font-heading)' }}>
          TBDC was built to fix that. Since 1990, we've helped 1,900+ founders get from idea to revenue — with structured programs, experienced mentors, and the institutional credibility to open doors.
        </p>
      </div>
    </section>
  );
}
