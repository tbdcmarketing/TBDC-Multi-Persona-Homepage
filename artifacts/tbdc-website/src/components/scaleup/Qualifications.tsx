import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Qualifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.q-item', {
        scrollTrigger: { trigger: '.q-item', start: 'top 85%', toggleActions: 'play none none none' },
        y: 20, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const qualifies = [
    'Post-revenue or VC-backed with proven market traction',
    'Seeking North American expansion (first entry or re-entry)',
    'Willing to invest in structured market-entry support',
    'Have a product or service ready for North American buyers',
    'Committed to engaging in curated Sprint Week meetings',
  ];

  const doesNot = [
    'Pre-product companies without market validation',
    'Companies looking only for free co-working or networking events',
    'Founders not yet committed to North American expansion',
  ];

  return (
    <section ref={sectionRef} className="bg-sand py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Is this for you?
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Who qualifies.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-charcoal mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}>
              You're a fit if:
            </h3>
            <ul className="space-y-3">
              {qualifies.map((item, i) => (
                <li key={i} className="q-item flex items-start gap-3 text-sm text-charcoal/80"
                  style={{ fontFamily: 'var(--font-body)' }}>
                  <span className="w-5 h-5 bg-teal/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-teal" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-charcoal mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}>
              This probably isn't right if:
            </h3>
            <ul className="space-y-3">
              {doesNot.map((item, i) => (
                <li key={i} className="q-item flex items-start gap-3 text-sm text-charcoal/80"
                  style={{ fontFamily: 'var(--font-body)' }}>
                  <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <X size={12} className="text-red-500" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
