import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '1,900+', label: 'Businesses launched since 1990' },
  { value: '2', label: 'Unicorns (Hydrostor, Turtle Island Recycling Corp.)' },
  { value: '$263M+', label: 'Economic output since 2022' },
  { value: '660+', label: 'International founders connected since 2020' },
  { value: '36', label: 'Years of continuous operation' },
  { value: '3', label: 'Levels of government backing' },
];

export default function TrackRecord() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tr-stat', {
        scrollTrigger: { trigger: '.tr-stat', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="track-record" ref={sectionRef} className="bg-navy py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Track Record
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Numbers that{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              don't lie.
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i}
              className="tr-stat card-hover bg-white/5 backdrop-blur-sm rounded-2xl p-8
                border border-white/10 text-center">
              <p className="text-4xl md:text-5xl font-extrabold text-teal mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {stat.value}
              </p>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
