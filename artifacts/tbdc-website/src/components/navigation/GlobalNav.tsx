import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu } from 'lucide-react';
import { GLOBAL_LINKS } from './navConfig';

interface GlobalNavProps {
  onMenuOpen: () => void;
}

export default function GlobalNav({ onMenuOpen }: GlobalNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) { setScrolled(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? 'bg-navy/95 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between h-14 md:h-16">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={`${import.meta.env.BASE_URL}tbdc-logo-white.png`}
            alt="TBDC"
            loading="eager"
            className="h-7 md:h-9 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {GLOBAL_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 relative pb-1
                  ${isActive
                    ? 'text-teal'
                    : 'text-warm-white/70 hover:text-warm-white'
                  }`}
                style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-teal rounded-full" />
                )}
              </Link>
            );
          })}
          <Link
            to="/"
            className="bg-teal hover:bg-teal-dark text-white text-sm font-semibold px-5 py-2 rounded-full
              inline-flex items-center gap-2 transition-colors shrink-0"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Get Started <ArrowRight size={14} />
          </Link>
        </div>

        <button
          onClick={onMenuOpen}
          className="md:hidden p-2 text-white"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}
