import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Award, MapPin, DollarSign } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trust = [
  { icon: Shield, title: 'Federal Designation', desc: 'One of Canada\'s first Startup Visa designated incubators. Authorized by IRCC since 2013.' },
  { icon: Award, title: 'National Recognition', desc: 'Canada\'s Incubator of the Year (2003, 2008, 2010). Province of Ontario Award of Recognition (2009).' },
  { icon: DollarSign, title: '$3.3M Federal Investment', desc: '2023 federal investment for the Land & Expand program. Recognized by the Prime Minister\'s Office.' },
  { icon: MapPin, title: 'Province-Wide Reach', desc: 'Ontario\'s only province-wide Startup Visa incubator with deepened government and industry partnerships.' },
];

export default function GovernmentTrust() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gt-card', {
        scrollTrigger: { trigger: '.gt-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="government" ref={sectionRef} className="bg-navy py-20 md:py-28 scroll-mt-[104px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)', color: '#D4A843' }}>
            Government Trust
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Backed by three levels{' '}
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#D4A843' }}>
              of government.
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trust.map((t, i) => (
            <div key={i}
              className="gt-card card-hover bg-white/5 backdrop-blur-sm rounded-2xl p-8
                border border-white/10 text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 mx-auto"
                style={{ backgroundColor: 'rgba(212,168,67,0.2)' }}>
                <t.icon size={24} style={{ color: '#D4A843' }} />
              </div>
              <h3 className="text-base font-bold text-white mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {t.title}
              </h3>
              <p className="text-sm text-white/60" style={{ fontFamily: 'var(--font-body)' }}>
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
