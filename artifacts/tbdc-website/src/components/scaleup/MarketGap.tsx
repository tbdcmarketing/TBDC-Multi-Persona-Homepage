import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MarketGap() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mg-text', {
        scrollTrigger: { trigger: '.mg-text', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-warm-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 lg:px-16">
        <h2 className="mg-text text-2xl md:text-3xl lg:text-4xl font-extrabold text-charcoal mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}>
          Ontario has world-class universities, deep capital markets, and diverse talent. Market entry is still relationship-driven.
        </h2>

        <h3 className="mg-text text-xl md:text-2xl font-extrabold text-charcoal mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}>
          Founders arrive with traction but often can't break through:
        </h3>

        <div className="space-y-4 mb-8">
          <p className="mg-text text-charcoal/80 leading-relaxed text-lg border-l-[3px] border-l-teal pl-5"
            style={{ fontFamily: 'var(--font-body)' }}>
            A virtual events platform running 3,000+ events across 27 countries couldn't get a single meeting with a North American enterprise buyer.
          </p>
          <p className="mg-text text-charcoal/80 leading-relaxed text-lg border-l-[3px] border-l-teal pl-5"
            style={{ fontFamily: 'var(--font-body)' }}>
            A cybersecurity founder with European clients couldn't convert research calls into commercial conversations.
          </p>
          <p className="mg-text text-charcoal/80 leading-relaxed text-lg border-l-[3px] border-l-teal pl-5"
            style={{ fontFamily: 'var(--font-body)' }}>
            A fintech company spent months decoding Canadian regulatory norms before it could move.
          </p>
        </div>

        <p className="mg-text text-xl md:text-2xl font-extrabold text-charcoal mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}>
          TBDC closes that gap. Cold outreach becomes scheduled meetings with decision-makers who are ready to engage.
        </p>
        <p className="mg-text text-2xl md:text-3xl font-extrabold text-charcoal"
          style={{ fontFamily: 'var(--font-heading)' }}>
          We ensure your expansion lands.
        </p>
      </div>
    </section>
  );
}
