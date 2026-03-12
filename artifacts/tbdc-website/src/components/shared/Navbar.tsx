import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

const defaultNavLinks = [
  { label: 'Scaleups', href: '/scaleup' },
  { label: 'Startups', href: '/startup' },
  { label: 'Partners', href: '/partners' },
  { label: 'Our Team', href: '/team' },
  { label: 'Media', href: '/media' },
];

export default function Navbar({ links, ctaLabel = 'Apply Now', ctaHref = '#' }: { links?: { label: string; href: string }[]; ctaLabel?: string; ctaHref?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = links ?? defaultNavLinks;
  const useRouterLinks = !links;

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) { setScrolled(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50
        w-[calc(100%-2rem)] max-w-5xl transition-all duration-500
        rounded-full px-6 py-3 flex items-center justify-between
        ${scrolled
          ? 'bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-lg'
          : 'bg-transparent'
        }`}
    >
      <Link to="/" className="flex items-center">
        <img
          src={`${import.meta.env.BASE_URL}tbdc-logo-white.png`}
          alt="TBDC"
          loading="eager"
          className={`h-7 md:h-9 w-auto object-contain transition-all duration-500
            ${scrolled ? 'brightness-0' : ''}`}
        />
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) =>
          useRouterLinks ? (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-medium link-hover transition-colors duration-500
                ${scrolled ? 'text-charcoal hover:text-teal' : 'text-white/80 hover:text-white'}`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium link-hover transition-colors duration-500
                ${scrolled ? 'text-charcoal hover:text-teal' : 'text-white/80 hover:text-white'}`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {link.label}
            </a>
          )
        )}
        <a
          href={ctaHref}
          className="bg-teal hover:bg-teal-dark text-white text-sm font-semibold px-5 py-2 rounded-full
            inline-flex items-center gap-2 transition-colors"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {ctaLabel} <ArrowRight size={14} />
        </a>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`md:hidden p-2 transition-colors ${scrolled ? 'text-charcoal' : 'text-white'}`}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl
          rounded-2xl shadow-xl border border-slate-200/50 p-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) =>
              useRouterLinks ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-charcoal text-base font-medium hover:text-teal transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-charcoal text-base font-medium hover:text-teal transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {link.label}
                </a>
              )
            )}
            <a
              href={ctaHref}
              className="bg-teal text-white text-sm font-semibold px-5 py-3 rounded-full
                text-center transition-colors hover:bg-teal-dark"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
