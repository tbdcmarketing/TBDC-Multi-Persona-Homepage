import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MediaHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.media-hero-eyebrow', { y: 20, opacity: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' });
      gsap.from('.media-hero-title', { y: 30, opacity: 0, duration: 0.8, delay: 0.35, ease: 'power3.out' });
      gsap.from('.media-hero-subtitle', { y: 20, opacity: 0, duration: 0.7, delay: 0.5, ease: 'power3.out' });
      gsap.from('.media-hero-stats > *', {
        y: 20, opacity: 0, stagger: 0.1, duration: 0.6, delay: 0.65, ease: 'power3.out',
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative bg-navy min-h-[60dvh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <circle cx="200" cy="300" r="150" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <circle cx="600" cy="200" r="100" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <line x1="200" y1="300" x2="600" y2="200" stroke="#00A88E" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 text-center pt-32 pb-20 md:pb-28">
        <p
          className="media-hero-eyebrow text-teal text-sm font-bold uppercase tracking-wider mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Press & Thought Leadership
        </p>
        <h1
          className="media-hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          TBDC in the{' '}
          <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }} className="text-teal">
            Media
          </span>
        </h1>
        <p
          className="media-hero-subtitle text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Featured articles, press coverage, and insights from Canada's premier
          innovation incubator.
        </p>

        <div className="media-hero-stats flex flex-wrap justify-center gap-8 md:gap-14">
          {[
            { number: '35+', label: 'Years of Impact' },
            { number: '242', label: 'Founders Welcomed in 2025' },
            { number: '19', label: 'Countries Represented' },
            { number: '600+', label: 'Workers Trained in Trades' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-2xl md:text-3xl font-bold text-teal"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {stat.number}
              </p>
              <p
                className="text-xs text-white/50 mt-1"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
