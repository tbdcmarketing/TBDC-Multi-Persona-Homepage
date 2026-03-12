import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TeamHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-hero-eyebrow', { y: 20, opacity: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' });
      gsap.from('.team-hero-title', { y: 30, opacity: 0, duration: 0.8, delay: 0.35, ease: 'power3.out' });
      gsap.from('.team-hero-subtitle', { y: 20, opacity: 0, duration: 0.7, delay: 0.5, ease: 'power3.out' });
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
          <circle cx="150" cy="200" r="120" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <circle cx="650" cy="400" r="100" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <line x1="150" y1="200" x2="650" y2="400" stroke="#00A88E" strokeWidth="0.3" />
          <circle cx="400" cy="100" r="80" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <line x1="400" y1="100" x2="150" y2="200" stroke="#00A88E" strokeWidth="0.3" />
          <line x1="400" y1="100" x2="650" y2="400" stroke="#00A88E" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 text-center pt-16 pb-20 md:pb-28">
        <p
          className="team-hero-eyebrow text-teal text-sm font-bold uppercase tracking-wider mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          The People Behind the Mission
        </p>
        <h1
          className="team-hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Meet Our{' '}
          <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }} className="text-teal">
            Team
          </span>
        </h1>
        <p
          className="team-hero-subtitle text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          The dedicated professionals driving innovation, building bridges, and empowering
          entrepreneurs across the globe.
        </p>
      </div>
    </section>
  );
}
