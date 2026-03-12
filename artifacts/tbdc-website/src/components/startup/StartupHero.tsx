import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function StartupHero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.st-hero-line', { y: 40, opacity: 0, stagger: 0.08, duration: 0.9 })
        .from('.st-hero-body', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.st-hero-cta', { y: 20, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=0.4');

      if (videoRef.current) {
        gsap.to(videoRef.current, {
          yPercent: 20, ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-[100dvh] flex flex-col justify-end">
      <div className="absolute inset-0 overflow-hidden">
        <video ref={videoRef} autoPlay muted loop playsInline
          className="w-full h-full object-cover brightness-75"
          style={{ willChange: 'transform' }}>
          <source src="/videos/startup-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />
      </div>

      <div className="relative z-10 px-6 lg:px-16 pb-32 md:pb-40 pt-32">
        <div className="max-w-4xl">
          <p className="st-hero-line text-sm font-bold uppercase tracking-wider text-teal mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Ontario Founders · Newcomer Entrepreneurs · Idea to Revenue
          </p>
          <h1 className="mb-6">
            <span className="st-hero-line block text-4xl md:text-5xl lg:text-6xl font-extrabold text-white"
              style={{ fontFamily: 'var(--font-heading)' }}>
              You don't need permission
            </span>
            <span className="st-hero-line block text-5xl md:text-6xl lg:text-7xl text-teal mt-2"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              to build something real.
            </span>
          </h1>
          <p className="st-hero-body text-white/70 text-base md:text-lg max-w-lg leading-relaxed mb-8"
            style={{ fontFamily: 'var(--font-body)' }}>
            Structured mentorship, business planning, and real connections — whether you're starting from scratch or scaling as a newcomer to Canada.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#programs"
              className="st-hero-cta bg-teal hover:bg-teal-dark text-white font-semibold
                h-12 px-7 rounded-full inline-flex items-center gap-2 text-sm transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}>
              Find Your Program <ArrowRight size={16} />
            </a>
            <a href="#mentorship"
              className="st-hero-cta border border-white/30 text-white font-semibold
                h-12 px-7 rounded-full inline-flex items-center gap-2 text-sm
                hover:bg-white/10 transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}>
              Learn About Mentorship
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
