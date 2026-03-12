import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { GLOBAL_LINKS, CONTEXTUAL_NAV_CONFIG, PERSONA_ROUTES } from './navConfig';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  const isPersonaPage = PERSONA_ROUTES.includes(pathname);
  const contextualConfig = isPersonaPage ? CONTEXTUAL_NAV_CONFIG[pathname] : null;

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!visible || !overlayRef.current || !panelRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(panelRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      );
    } else {
      gsap.to(panelRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          document.body.style.overflow = '';
          setVisible(false);
        },
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, visible]);

  const handleAnchorClick = (anchor: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) {
        const offset = isPersonaPage ? 104 : 64;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 350);
  };

  if (!visible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[60] md:hidden">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-navy/50"
        style={{ opacity: 0 }}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="absolute inset-0 bg-navy/[0.98] backdrop-blur-lg flex flex-col"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex items-center justify-between px-6 h-14">
          <img
            src={`${import.meta.env.BASE_URL}tbdc-logo-white.png`}
            alt="TBDC"
            className="h-7 w-auto object-contain"
          />
          <button
            onClick={onClose}
            className="p-2 text-white"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-8">
          <p className="text-teal text-xs tracking-[0.2em] uppercase font-medium mb-4"
            style={{ fontFamily: 'var(--font-body)' }}>
            Pages
          </p>
          <div className="flex flex-col gap-3 mb-8">
            {GLOBAL_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={onClose}
                className="text-warm-white text-lg flex items-center justify-between group"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {link.label}
                <ChevronRight size={18} className="text-warm-white/30 group-hover:text-warm-white/70 transition-colors" />
              </Link>
            ))}
          </div>

          {isPersonaPage && contextualConfig && (
            <>
              <p className="text-teal text-xs tracking-[0.2em] uppercase font-medium mb-4"
                style={{ fontFamily: 'var(--font-body)' }}>
                On This Page
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {contextualConfig.links.map((link) => (
                  <button
                    key={link.anchor}
                    onClick={() => handleAnchorClick(link.anchor)}
                    className="text-warm-white/70 text-base text-left"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="px-6 pb-8">
          <Link
            to="/"
            onClick={onClose}
            className="bg-teal hover:bg-teal-dark text-white font-semibold py-3 rounded-full
              flex items-center justify-center gap-2 transition-colors w-full"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
