import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ap-text', {
        scrollTrigger: { trigger: '.ap-text', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="approach" ref={sectionRef} className="bg-sand py-20 md:py-28 scroll-mt-[104px]">
      <div className="max-w-4xl mx-auto px-6 lg:px-16">
        <p className="ap-text text-teal text-sm font-bold uppercase tracking-wider mb-3"
          style={{ fontFamily: 'var(--font-mono)' }}>
          Our Approach
        </p>

        <p className="ap-text text-charcoal/80 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
          Our portfolio spans Hydrostor (clean energy storage unicorn), Turtle Island Recycling Corporation (unicorn acquired by GFL Environmental), Bento Sushi, iBentos, and Instron Technologies. Across sectors and stages, the pattern is consistent: ambitious founders, hard problems, structured support.
        </p>

        <p className="ap-text text-charcoal/80 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
          Most incubation programs give you a desk, a mentor, and a list of events. TBDC gives you a feasibility report, fractional C-suite support, and a calendar of qualified meetings with enterprise buyers, investors, and distribution partners — built around your sector and stage.
        </p>

        <p className="ap-text text-charcoal/80 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
          We've been doing this since 1990. Our network spans hospital procurement leaders, energy executives, global investors, and corporate innovation teams. These relationships took 36 years to build. When TBDC introduces a founder, the meeting happens.
        </p>
      </div>
    </section>
  );
}
