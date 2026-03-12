import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useActiveSection } from './useActiveSection';
import type { ContextualConfig } from './navConfig';

gsap.registerPlugin(ScrollTrigger);

interface ContextualNavProps {
  config: ContextualConfig;
  configKey: string;
}

export default function ContextualNav({ config, configKey }: ContextualNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection(config.links.map((l) => l.anchor));
  const prevKeyRef = useRef(configKey);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#hero',
            start: 'bottom top+=64',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, navRef);
    return () => ctx.revert();
  }, [configKey]);

  useEffect(() => {
    if (prevKeyRef.current !== configKey && contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: 'power1.out' }
      );
      prevKeyRef.current = configKey;
    }
  }, [configKey]);

  const handleAnchorClick = (anchor: string) => {
    const el = document.getElementById(anchor);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 104;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const accentColor = config.ctaVariant === 'gold' ? 'text-gold' : 'text-teal';
  const ctaBg = config.ctaVariant === 'gold'
    ? 'bg-gold hover:bg-gold/90'
    : 'bg-teal hover:bg-teal-dark';

  return (
    <div
      ref={navRef}
      className="fixed top-[64px] left-0 right-0 z-40 bg-navy/80 backdrop-blur-sm border-t border-warm-white/10 hidden md:block"
      style={{ height: '40px' }}
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 lg:px-16 h-full flex items-center justify-between">
        <div className="flex items-center gap-6">
          {config.links.map((link) => {
            const isActive = activeSection === link.anchor;
            return (
              <button
                key={link.anchor}
                onClick={() => handleAnchorClick(link.anchor)}
                className={`text-[13px] tracking-wide transition-colors duration-200
                  ${isActive
                    ? accentColor
                    : 'text-warm-white/50 hover:text-warm-white/90'
                  }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {link.label}
              </button>
            );
          })}
        </div>
        <a
          href={config.cta.href}
          className={`${ctaBg} text-white text-sm font-semibold py-1.5 px-4 rounded-full
            inline-flex items-center gap-1.5 transition-colors shrink-0`}
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {config.cta.label} <ArrowRight size={12} />
        </a>
      </div>
    </div>
  );
}
