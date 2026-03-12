import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import VideoHeroBackground from '../shared/VideoHeroBackground';

gsap.registerPlugin(ScrollTrigger);

export default function ScaleupHero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.su-hero-line', { y: 40, opacity: 0, stagger: 0.08, duration: 0.9 })
        .from('.su-hero-body', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.su-hero-cta', { y: 20, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=0.4');

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
    <section id="hero" ref={heroRef} className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden">
      <VideoHeroBackground
        ref={videoRef}
        src={`${import.meta.env.BASE_URL}videos/scaleup-hero.mp4`}
        overlayClassName="bg-gradient-to-b from-navy/70 via-navy/40 to-navy/70"
      />

      <div className="relative z-10 px-6 lg:px-16 pb-32 md:pb-40 pt-[104px]">
        <div className="max-w-4xl">
          <p className="su-hero-line text-sm font-bold uppercase tracking-wider text-teal mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Market Entry · North America · Canada's Proven Gateway
          </p>
          <h1 className="mb-6">
            <span className="su-hero-line block text-4xl md:text-5xl lg:text-6xl font-extrabold text-white"
              style={{ fontFamily: 'var(--font-heading)' }}>
              You bring the ambition to scale.
            </span>
            <span className="su-hero-line block text-5xl md:text-6xl lg:text-7xl text-teal mt-2"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              We open North America.
            </span>
          </h1>
          <p className="su-hero-body text-white/70 text-base md:text-lg max-w-lg leading-relaxed mb-8"
            style={{ fontFamily: 'var(--font-body)' }}>
            Curated meetings with enterprise buyers, investors, and partners — arranged before you land in Toronto.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#apply"
              className="su-hero-cta bg-teal hover:bg-teal-dark text-white font-semibold
                h-12 px-7 rounded-full inline-flex items-center gap-2 text-sm transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}>
              Apply to Horizon or Pivot <ArrowRight size={16} />
            </a>
            <a href="#apply"
              className="su-hero-cta border border-white/30 text-white font-semibold
                h-12 px-7 rounded-full inline-flex items-center gap-2 text-sm
                hover:bg-white/10 transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}>
              Book a Discovery Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
