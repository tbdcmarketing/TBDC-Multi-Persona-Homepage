import { useEffect, useRef } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MediaCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.media-cta-content > *', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-navy overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
          <circle cx="600" cy="200" r="180" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <circle cx="200" cy="100" r="80" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <line x1="200" y1="100" x2="600" y2="200" stroke="#00A88E" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 text-center py-24 md:py-32">
        <div className="media-cta-content">
          <p
            className="text-teal text-sm font-bold uppercase tracking-wider mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Media Inquiries
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Want to Feature TBDC?
          </h2>
          <p
            className="text-lg text-white/70 max-w-2xl mx-auto mb-10"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            For press inquiries, interview requests, or partnership opportunities,
            reach out to our communications team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:press@tbdc.com"
              className="btn-slide bg-teal text-white font-semibold px-8 py-4 rounded-full
                         inline-flex items-center gap-2 text-base"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="btn-bg bg-teal-dark" />
              <span className="relative z-10 inline-flex items-center gap-2">
                <Send size={18} /> Contact Press Team
              </span>
            </a>
            <a
              href="https://tbdc.com/blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 text-white font-semibold h-[52px] px-7 rounded-full
                         inline-flex items-center gap-2 text-sm hover:bg-white/10 transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Visit Our Blog <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
