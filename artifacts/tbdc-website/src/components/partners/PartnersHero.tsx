import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PartnersHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.pt-hero-line', { y: 40, opacity: 0, stagger: 0.08, duration: 0.9 })
        .from('.pt-hero-body', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.pt-hero-cta', { y: 20, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=0.4');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-[100dvh] flex flex-col justify-end">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <circle cx="400" cy="300" r="200" fill="none" stroke="#D4A843" strokeWidth="0.5" />
          <circle cx="400" cy="300" r="150" fill="none" stroke="#D4A843" strokeWidth="0.3" />
          <circle cx="400" cy="300" r="100" fill="none" stroke="#D4A843" strokeWidth="0.3" />
          <circle cx="200" cy="400" r="80" fill="none" stroke="#00A88E" strokeWidth="0.3" />
          <circle cx="600" cy="200" r="80" fill="none" stroke="#00A88E" strokeWidth="0.3" />
          <line x1="200" y1="400" x2="400" y2="300" stroke="#D4A843" strokeWidth="0.3" />
          <line x1="600" y1="200" x2="400" y2="300" stroke="#D4A843" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative z-10 px-6 lg:px-16 pb-32 md:pb-40 pt-32">
        <div className="max-w-4xl">
          <p className="pt-hero-line text-sm font-bold uppercase tracking-wider mb-4"
            style={{ fontFamily: 'var(--font-mono)', color: '#D4A843' }}>
            Government · Enterprise · Investors · Media
          </p>
          <h1 className="mb-6">
            <span className="pt-hero-line block text-4xl md:text-5xl lg:text-6xl font-extrabold text-white"
              style={{ fontFamily: 'var(--font-heading)' }}>
              We translate mandates
            </span>
            <span className="pt-hero-line block text-5xl md:text-6xl lg:text-7xl mt-2"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#D4A843' }}>
              into market outcomes.
            </span>
          </h1>
          <p className="pt-hero-body text-white/70 text-base md:text-lg max-w-lg leading-relaxed mb-8"
            style={{ fontFamily: 'var(--font-body)' }}>
            TBDC sits at the intersection of Ontario's public sector, private capital, innovation institutions, and global founders. We make partnerships productive.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#partner-cta"
              className="pt-hero-cta text-white font-semibold
                h-12 px-7 rounded-full inline-flex items-center gap-2 text-sm transition-colors"
              style={{ fontFamily: 'var(--font-body)', backgroundColor: '#D4A843' }}>
              Partner With TBDC <ArrowRight size={16} />
            </a>
            <a href="#ecosystem"
              className="pt-hero-cta border border-white/30 text-white font-semibold
                h-12 px-7 rounded-full inline-flex items-center gap-2 text-sm
                hover:bg-white/10 transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}>
              Learn About Our Ecosystem
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
