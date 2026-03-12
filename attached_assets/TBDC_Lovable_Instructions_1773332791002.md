# TBDC Website — Lovable Implementation Brief

> **For the Lovable AI agent.** This document contains the complete architecture, design system, component code, routing logic, and verbatim copy for the TBDC multi-persona website. Implement exactly as specified. **All copy text must be used VERBATIM — zero changes or adaptations.**

---

## Table of Contents

1. [Project Overview & Architecture](#1-project-overview--architecture)
2. [Tech Stack & Setup](#2-tech-stack--setup)
3. [Design Tokens & Global CSS](#3-design-tokens--global-css)
4. [Routing Structure](#4-routing-structure)
5. [Shared Components](#5-shared-components)
6. [Landing Page — Persona Router](#6-landing-page--persona-router)
7. [Page 01 — Scaleup Founders](#7-page-01--scaleup-founders)
8. [Page 02 — Startup Founders](#8-page-02--startup-founders)
9. [Page 03 — Partners & Ecosystem](#9-page-03--partners--ecosystem)
10. [Animation & Motion Guide](#10-animation--motion-guide)
11. [Responsive & Accessibility Notes](#11-responsive--accessibility-notes)

---

## 1. Project Overview & Architecture

### What We're Building

A TBDC website with **four routes**:

| Route | Purpose | Audience |
|-------|---------|----------|
| `/` | Landing page with persona router | All visitors |
| `/scaleup` | Full experience for international scaleup founders | Scaleup founders entering North America |
| `/startup` | Full experience for Ontario startup founders | Early-stage & newcomer entrepreneurs |
| `/partners` | Full experience for ecosystem partners | Government, enterprise, investors, media |

### User Flow

1. Visitor lands on `/` (the router page)
2. They see a brief TBDC intro + three persona cards
3. Optionally, a short intake form (2-3 questions) helps route them
4. They click through or are routed to `/scaleup`, `/startup`, or `/partners`
5. Each page is a complete, self-contained experience with its own hero, content sections, CTAs, and footer

### File Structure

```
src/
├── index.css                    # Tailwind v4 theme + global styles
├── App.jsx                      # React Router setup
├── main.jsx                     # Entry point
├── components/
│   ├── shared/
│   │   ├── Navbar.jsx           # Floating pill navbar (adapts per page)
│   │   ├── Footer.jsx           # Shared footer
│   │   ├── SectionDivider.jsx   # Curved SVG transitions
│   │   ├── ScrollProgress.jsx   # Teal progress bar
│   │   ├── NoiseOverlay.jsx     # SVG noise texture
│   │   ├── HeroSection.jsx      # Reusable hero pattern
│   │   ├── TimelineTable.jsx    # TBDC history timeline (shared)
│   │   └── ProofTicker.jsx      # Scrolling proof bar
│   ├── router/
│   │   ├── RouterPage.jsx       # Landing page with persona selection
│   │   └── PersonaCard.jsx      # Individual persona card
│   ├── scaleup/
│   │   ├── ScaleupPage.jsx      # Main page component
│   │   ├── ScaleupHero.jsx
│   │   ├── MarketGap.jsx
│   │   ├── Approach.jsx
│   │   ├── ThreeStages.jsx
│   │   ├── Programs.jsx
│   │   ├── CaseStudies.jsx
│   │   ├── WhyCanada.jsx
│   │   ├── Qualifications.jsx
│   │   └── ScaleupCTA.jsx
│   ├── startup/
│   │   ├── StartupPage.jsx
│   │   ├── StartupHero.jsx
│   │   ├── BuildAlone.jsx
│   │   ├── ProgramPaths.jsx
│   │   ├── Mentorship.jsx
│   │   ├── TrackRecord.jsx
│   │   └── StartupCTA.jsx
│   └── partners/
│       ├── PartnersPage.jsx
│       ├── PartnersHero.jsx
│       ├── EcosystemRole.jsx
│       ├── PartnerTypes.jsx
│       ├── GovernmentTrust.jsx
│       ├── Workforce.jsx
│       └── PartnersCTA.jsx
```

---

## 2. Tech Stack & Setup

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19+ |
| Build Tool | Vite | 7+ |
| CSS Framework | Tailwind CSS v4 (`@tailwindcss/vite`) | 4.2+ |
| Animation | GSAP + ScrollTrigger | 3.14+ |
| Icons | Lucide React | 0.577+ |
| Routing | React Router | 7+ |
| Fonts | Google Fonts | — |

### Dependencies to Install

```bash
npm install react-router-dom gsap lucide-react
```

### Font Loading (index.html `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Instrument+Serif:ital@1&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
```

---

## 3. Design Tokens & Global CSS

### `src/index.css`

```css
@import "tailwindcss";

@theme {
  --color-navy: #0A1628;
  --color-navy-light: #0f1f38;
  --color-teal: #00A88E;
  --color-teal-dark: #008c76;
  --color-warm-white: #FAF8F5;
  --color-sand: #F0ECE3;
  --color-charcoal: #1E293B;
  --color-slate-custom: #64748B;
  --color-gold: #D4A843;

  --font-heading: "Plus Jakarta Sans", sans-serif;
  --font-serif: "Instrument Serif", serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

/* === Base === */
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  color: var(--color-charcoal);
  background: var(--color-warm-white);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  letter-spacing: -0.02em;
}

/* === Button Slide Effect === */
.btn-slide {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.btn-slide:hover { transform: scale(1.02); }
.btn-slide .btn-bg {
  position: absolute; inset: 0; z-index: -1;
  transform: translateX(-101%);
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.btn-slide:hover .btn-bg { transform: translateX(0); }

/* === Card Hover === */
.card-hover {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(10, 22, 40, 0.12);
}

/* === Link Hover === */
.link-hover:hover { transform: translateY(-1px); }

/* === Logo Runner === */
@keyframes scroll-logos {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.logo-runner { animation: scroll-logos 30s linear infinite; }

/* === Breathing Animation === */
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}

/* === Noise Overlay === */
.noise-overlay {
  position: fixed; inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.04;
}

/* === Custom Scrollbar === */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--color-warm-white); }
::-webkit-scrollbar-thumb { background: var(--color-slate-custom); border-radius: 4px; }
```

---

## 4. Routing Structure

### `src/App.jsx`

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RouterPage from './components/router/RouterPage';
import ScaleupPage from './components/scaleup/ScaleupPage';
import StartupPage from './components/startup/StartupPage';
import PartnersPage from './components/partners/PartnersPage';
import NoiseOverlay from './components/shared/NoiseOverlay';
import ScrollProgress from './components/shared/ScrollProgress';

export default function App() {
  return (
    <BrowserRouter>
      <NoiseOverlay />
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<RouterPage />} />
        <Route path="/scaleup" element={<ScaleupPage />} />
        <Route path="/startup" element={<StartupPage />} />
        <Route path="/partners" element={<PartnersPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### `src/main.jsx`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 5. Shared Components

### `src/components/shared/NoiseOverlay.jsx`

```jsx
export default function NoiseOverlay() {
  return (
    <div className="noise-overlay">
      <svg width="100%" height="100%">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
```

### `src/components/shared/ScrollProgress.jsx`

```jsx
import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (barRef.current) barRef.current.style.width = `${progress}%`;
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[100]">
      <div ref={barRef} className="h-full bg-teal transition-none" style={{ width: '0%' }} />
    </div>
  );
}
```

### `src/components/shared/SectionDivider.jsx`

```jsx
export default function SectionDivider({ fromColor, toColor }) {
  return (
    <div className="relative h-0" style={{ backgroundColor: fromColor }}>
      <svg
        className="absolute -bottom-[1px] left-0 w-full block"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{ height: '60px' }}
      >
        <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z" fill={toColor} />
      </svg>
    </div>
  );
}
```

### `src/components/shared/Navbar.jsx`

```jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar({ links = [], ctaLabel = 'Apply Now', ctaHref = '#' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <Link to="/" className="flex items-center gap-2">
        <span
          className={`text-xl font-extrabold tracking-tight transition-colors duration-500
            ${scrolled ? 'text-navy' : 'text-white'}`}
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          TBDC
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`text-sm font-medium link-hover transition-colors duration-500
              ${scrolled ? 'text-charcoal hover:text-teal' : 'text-white/80 hover:text-white'}`}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {link.label}
          </a>
        ))}
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
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-charcoal text-base font-medium hover:text-teal transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {link.label}
              </a>
            ))}
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
```

### `src/components/shared/Footer.jsx`

```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, MapPin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-navy rounded-t-[3rem] relative pt-16 md:pt-20 pb-6">
      <div className="absolute top-0 left-0 right-0 h-[1px] rounded-t-[3rem] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-teal to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-14">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}>
              TBDC
            </h3>
            <p className="text-white/50 text-sm mb-4"
              style={{ fontFamily: 'var(--font-body)' }}>
              Toronto Business Development Centre
            </p>
            <div className="flex items-start gap-2 text-white/40 text-sm">
              <MapPin size={16} className="shrink-0 mt-0.5" />
              <span style={{ fontFamily: 'var(--font-body)' }}>
                111 Peter St, 9th Floor, Toronto ON M5V 2H1
              </span>
            </div>
            <p className="text-white/40 text-sm mt-2" style={{ fontFamily: 'var(--font-body)' }}>
              (416) 345-9437
            </p>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}>
              Programs
            </h4>
            <ul className="space-y-2">
              {['Horizon', 'Pivot', 'Land & Expand', 'Business Inc.', 'Biz Futures'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/60 hover:text-teal text-sm transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For */}
          <div>
            <h4 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}>
              For
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Scaleup Founders', to: '/scaleup' },
                { label: 'Startup Founders', to: '/startup' },
                { label: 'Partners & Ecosystem', to: '/partners' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-white/60 hover:text-teal text-sm transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}>
              Stay Connected
            </h4>
            <div className="flex mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent border-b border-white/20 px-2 py-2.5 text-sm
                  text-white placeholder:text-white/30 focus:outline-none focus:border-teal transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              />
              <button className="bg-teal hover:bg-teal-dark text-white w-10 h-10 rounded-full
                flex items-center justify-center ml-3 transition-colors shrink-0"
                aria-label="Subscribe">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row
          items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-white/30 text-xs"
            style={{ fontFamily: 'var(--font-body)' }}>
            <span>&copy; 2025 Toronto Business Development Centre. All rights reserved.</span>
            <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms of Use</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal" />
            </span>
            <span className="text-white/40 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
              tbdc.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

### `src/components/shared/ProofTicker.jsx`

```jsx
export default function ProofTicker({ items }) {
  // Duplicate items for seamless infinite scroll
  const doubled = [...items, ...items];

  return (
    <div className="bg-navy-light overflow-hidden py-3">
      <div className="logo-runner flex whitespace-nowrap gap-12">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-white/60 text-sm shrink-0 flex items-center gap-3"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
```

### `src/components/shared/TimelineTable.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '1990', text: 'Founded by the City of Toronto and Province of Ontario at 1071 King St. West —one of Canada\'s first publicly backed startup incubators.' },
  { year: '1993', text: 'Self-Employment Assistance Program launched, building the structured support systems that still anchor our work.' },
  { year: '2003', text: 'National recognition. Awarded Incubator of the Year as Toronto\'s startup ecosystem gained momentum.' },
  { year: '2004', text: 'Youth-At-Risk Self-Employment Program launched, expanding entrepreneurship access to underrepresented communities.' },
  { year: '2005', text: 'Second location opened at 105 Jungle Road in Etobicoke.' },
  { year: '2006', text: 'Summer Company Program and BIZ Futures launched.' },
  { year: '2008', text: 'Canada\'s Top Incubator. Named the country\'s leading incubator for measurable outcomes and program design.' },
  { year: '2009', text: 'Province of Ontario Award of Recognition for measurable economic contribution.' },
  { year: '2010', text: 'Canada\'s Incubator of the Year (CABI).' },
  { year: '2013', text: 'Federal designation. Became one of the first incubators authorized to support Canada\'s Startup Visa program.' },
  { year: '2015', text: 'First unicorn. Turtle Island Recycling Corporation scales to $1B+ valuation, cementing TBDC\'s role in Canada\'s circular economy.' },
  { year: '2019', text: 'Second unicorn. Hydrostor achieves unicorn status, strengthening TBDC\'s role in Canada\'s cleantech economy.' },
  { year: '2020–2021', text: 'Global programming connects 660+ founders from India, CEE, Europe, and Southeast Asia.' },
  { year: '2022', text: 'Horizon and Pivot programs launched for international scaleups entering North America.' },
  { year: '2023', text: '$3.3M federal investment for the Land & Expand program. Moved to 111 Peter St. Recognized by the Prime Minister\'s Office.' },
  { year: '2025', text: 'Province-wide reach. Ontario\'s only province-wide Startup Visa incubator with deepened government and industry partnerships.' },
];

export default function TimelineTable() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-row', {
        scrollTrigger: { trigger: '.timeline-row', start: 'top 85%', toggleActions: 'play none none none' },
        y: 20, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-sand py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            The institution behind the programs.
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}>
            TBDC: Thirty-six years of showing up.
          </h2>
          <p className="text-charcoal/70 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}>
            Founded by the City of Toronto. Backed by three levels of government. Recognized nationally and internationally for measurable economic impact.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {milestones.map((m, i) => (
            <div key={i} className="timeline-row flex gap-6 py-4 border-b border-charcoal/10 last:border-b-0">
              <span className="text-teal font-bold text-sm shrink-0 w-24"
                style={{ fontFamily: 'var(--font-mono)' }}>
                {m.year}
              </span>
              <p className="text-charcoal/80 text-sm leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}>
                {m.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 6. Landing Page — Persona Router

This is the `/` route. It presents a brief TBDC introduction and routes visitors to the correct experience.

### `src/components/router/RouterPage.jsx`

```jsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe, Rocket, Landmark, Users, Building2, ChevronDown } from 'lucide-react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import SectionDivider from '../shared/SectionDivider';

gsap.registerPlugin(ScrollTrigger);

const personas = [
  {
    id: 'scaleup',
    icon: Globe,
    accentColor: '#00A88E',
    eyebrow: 'International Scaleups',
    title: 'Scaleup Founders',
    subtitle: 'Horizon · Pivot · Land & Expand',
    description: 'You have proven traction in your home market and are ready to enter North America. We arrange enterprise meetings, investor introductions, and GTM support — before you land in Toronto.',
    cta: 'Explore Scaleup Programs',
    route: '/scaleup',
    questions: [
      'Do you have proven traction in a market outside North America?',
      'Are you VC-backed or post-revenue?',
      'Is North American expansion your next strategic priority?',
    ],
  },
  {
    id: 'startup',
    icon: Rocket,
    accentColor: '#00A88E',
    eyebrow: 'Ontario Founders',
    title: 'Startup Founders',
    subtitle: 'Business Inc. · Biz Futures · Preparing for Self-Employment · Land & Expand',
    description: 'Whether you\'re at the idea stage or scaling a newcomer-founded business, TBDC gives you structured mentorship, business planning, and networks that used to be reserved for people who already knew the right people.',
    cta: 'Find Your Program',
    route: '/startup',
    questions: [
      'Are you an Ontario-based founder or newcomer entrepreneur?',
      'Are you at the idea, planning, or early revenue stage?',
      'Do you need mentorship, business planning, or capital connections?',
    ],
  },
  {
    id: 'partners',
    icon: Landmark,
    accentColor: '#D4A843',
    eyebrow: 'Ecosystem Partners',
    title: 'Partners & Ecosystem',
    subtitle: 'Government · Enterprise · Investors · Media',
    description: 'TBDC sits at the intersection of Ontario\'s public sector, private capital markets, innovation institutions, and global founders. We translate government mandates into real market outcomes.',
    cta: 'Explore Partnership Options',
    route: '/partners',
    questions: [
      'Are you representing a government body, enterprise, investor group, or media outlet?',
      'Are you looking to source startups, invest, or collaborate on economic development?',
    ],
  },
];

export default function RouterPage() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [activePersona, setActivePersona] = useState(null);
  const [formStep, setFormStep] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.router-hero-line', { y: 40, opacity: 0, stagger: 0.08, duration: 0.9 })
        .from('.router-hero-body', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.router-hero-scroll', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handlePersonaClick = (persona) => {
    navigate(persona.route);
  };

  return (
    <>
      <Navbar
        links={[
          { label: 'Scaleup Founders', href: '#personas' },
          { label: 'Startup Founders', href: '#personas' },
          { label: 'Partners', href: '#personas' },
        ]}
        ctaLabel="Get Started"
        ctaHref="#personas"
      />

      {/* === HERO === */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col justify-center bg-navy"
      >
        {/* Decorative SVG network background */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            <circle cx="200" cy="300" r="150" fill="none" stroke="#00A88E" strokeWidth="0.5" />
            <circle cx="600" cy="200" r="120" fill="none" stroke="#00A88E" strokeWidth="0.5" />
            <circle cx="400" cy="450" r="100" fill="none" stroke="#00A88E" strokeWidth="0.3" />
            <line x1="200" y1="300" x2="600" y2="200" stroke="#00A88E" strokeWidth="0.3" />
            <line x1="600" y1="200" x2="400" y2="450" stroke="#00A88E" strokeWidth="0.3" />
            <line x1="200" y1="300" x2="400" y2="450" stroke="#00A88E" strokeWidth="0.3" />
          </svg>
        </div>

        <div className="relative z-10 px-6 lg:px-16 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <p className="router-hero-line text-teal text-sm font-bold uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}>
              Toronto Business Development Centre
            </p>
            <h1 className="mb-6">
              <span
                className="router-hero-line block text-4xl md:text-5xl lg:text-6xl font-extrabold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Thirty-six years of building
              </span>
              <span
                className="router-hero-line block text-5xl md:text-6xl lg:text-7xl text-teal mt-2"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
              >
                what founders need.
              </span>
            </h1>
            <p
              className="router-hero-body text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              TBDC is Ontario's trusted partner for startup growth and global expansion. We help ambitious founders access customers, capital, and markets. Tell us who you are, and we'll show you exactly how.
            </p>
            <div className="router-hero-scroll">
              <a href="#personas" className="text-white/40 hover:text-white/70
                transition-colors inline-block animate-bounce">
                <ChevronDown size={28} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />

      {/* === PERSONA SELECTOR === */}
      <section id="personas" className="bg-warm-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
              style={{ fontFamily: 'var(--font-mono)' }}>
              Choose Your Path
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}>
              Who are you?
            </h2>
            <p className="text-charcoal/70 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              Select the path that best describes you, and we'll take you to the right experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {personas.map((persona) => (
              <div
                key={persona.id}
                onClick={() => handlePersonaClick(persona)}
                className="group card-hover bg-white rounded-2xl p-8 border border-slate-200/50
                  cursor-pointer relative overflow-hidden"
              >
                {/* Accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
                  style={{ backgroundColor: persona.accentColor }} />

                <div className="w-12 h-12 bg-teal/10 group-hover:bg-teal rounded-xl
                  flex items-center justify-center mb-5 transition-colors duration-300">
                  <persona.icon size={24}
                    className="text-teal group-hover:text-white transition-colors duration-300" />
                </div>

                <p className="text-sm font-bold uppercase tracking-wider mb-1"
                  style={{ fontFamily: 'var(--font-mono)', color: persona.accentColor }}>
                  {persona.eyebrow}
                </p>

                <h3 className="text-xl font-bold text-charcoal mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}>
                  {persona.title}
                </h3>

                <p className="text-xs text-charcoal/50 mb-4"
                  style={{ fontFamily: 'var(--font-mono)' }}>
                  {persona.subtitle}
                </p>

                <p className="text-sm text-charcoal/70 leading-relaxed mb-6"
                  style={{ fontFamily: 'var(--font-body)' }}>
                  {persona.description}
                </p>

                <span className="text-teal text-sm font-semibold inline-flex items-center gap-1 link-hover
                  group-hover:gap-2 transition-all"
                  style={{ fontFamily: 'var(--font-body)' }}>
                  {persona.cta} <ArrowRight size={14} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider fromColor="#FAF8F5" toColor="#0A1628" />

      {/* === QUICK INTAKE (Optional guided routing) === */}
      <section className="bg-navy py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-16 text-center">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Not sure where to start?
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Answer a few questions.{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              We'll point you in the right direction.
            </span>
          </h2>
          <p className="text-white/60 mb-10 leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}>
            Three quick questions to find the TBDC program that fits where you are right now.
          </p>

          <PersonaQuiz navigate={navigate} />
        </div>
      </section>

      <SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />

      <Footer />
    </>
  );
}

/* === Inline Quiz Component === */
function PersonaQuiz({ navigate }) {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);

  const questions = [
    {
      question: 'Where is your business based today?',
      options: [
        { label: 'Outside North America (Europe, Asia, Middle East, etc.)', value: 'international' },
        { label: 'Ontario / Canada', value: 'local' },
        { label: 'I represent an organization (government, enterprise, investor, media)', value: 'partner' },
      ],
    },
    {
      question: 'What stage best describes you?',
      options: [
        { label: 'Post-revenue with proven market traction', value: 'scaleup' },
        { label: 'Idea stage, early planning, or pre-revenue', value: 'startup' },
        { label: 'Looking to partner, invest, or collaborate', value: 'partner' },
      ],
    },
    {
      question: 'What do you need most right now?',
      options: [
        { label: 'Enterprise customer introductions and North American GTM', value: 'scaleup' },
        { label: 'Mentorship, business planning, or early-stage capital', value: 'startup' },
        { label: 'Access to founder pipeline, innovation sourcing, or media opportunities', value: 'partner' },
      ],
    },
  ];

  const scores = useRef({ scaleup: 0, startup: 0, partner: 0 });

  const handleAnswer = (value) => {
    if (value === 'international') scores.current.scaleup += 2;
    else if (value === 'local') scores.current.startup += 2;
    else if (value === 'partner') scores.current.partner += 2;
    else if (value === 'scaleup') scores.current.scaleup += 1;
    else if (value === 'startup') scores.current.startup += 1;

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const s = scores.current;
      if (s.partner >= s.scaleup && s.partner >= s.startup) setResult('partners');
      else if (s.scaleup >= s.startup) setResult('scaleup');
      else setResult('startup');
    }
  };

  const resultMap = {
    scaleup: { label: 'Scaleup Founders', desc: 'Based on your answers, you\'re a great fit for our Horizon or Pivot programs.' },
    startup: { label: 'Startup Founders', desc: 'Based on your answers, our Ontario founder programs are built for where you are.' },
    partners: { label: 'Partners & Ecosystem', desc: 'Based on your answers, our partnership programs align with your goals.' },
  };

  if (result) {
    const r = resultMap[result];
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <p className="text-teal text-sm font-bold uppercase tracking-wider mb-2"
          style={{ fontFamily: 'var(--font-mono)' }}>
          Your best fit
        </p>
        <h3 className="text-2xl font-extrabold text-white mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}>
          {r.label}
        </h3>
        <p className="text-white/70 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
          {r.desc}
        </p>
        <button
          onClick={() => navigate(`/${result}`)}
          className="bg-teal hover:bg-teal-dark text-white font-semibold px-8 py-3 rounded-full
            inline-flex items-center gap-2 transition-colors"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Take me there <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
      <div className="flex items-center justify-center gap-2 mb-6">
        {questions.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-300
            ${i === step ? 'w-8 bg-teal' : i < step ? 'w-4 bg-teal/50' : 'w-4 bg-white/20'}`} />
        ))}
      </div>
      <h3 className="text-xl font-bold text-white mb-6"
        style={{ fontFamily: 'var(--font-heading)' }}>
        {q.question}
      </h3>
      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.value)}
            className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/20
              hover:border-teal/50 rounded-xl px-5 py-4 text-white/80 text-sm
              transition-all duration-300"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

## 7. Page 01 — Scaleup Founders

### `src/components/scaleup/ScaleupPage.jsx`

**CRITICAL: All copy below is VERBATIM from the approved copy document. Do not modify any text.**

```jsx
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import SectionDivider from '../shared/SectionDivider';
import ProofTicker from '../shared/ProofTicker';
import TimelineTable from '../shared/TimelineTable';
import ScaleupHero from './ScaleupHero';
import MarketGap from './MarketGap';
import Approach from './Approach';
import ThreeStages from './ThreeStages';
import Programs from './Programs';
import CaseStudies from './CaseStudies';
import WhyCanada from './WhyCanada';
import Qualifications from './Qualifications';
import ScaleupCTA from './ScaleupCTA';

gsap.registerPlugin(ScrollTrigger);

export default function ScaleupPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { label: 'Our Approach', href: '#approach' },
    { label: 'Programs', href: '#programs' },
    { label: 'Results', href: '#results' },
    { label: 'Why Canada', href: '#why-canada' },
  ];

  const proofItems = [
    'Romanian robotics co. closes North American contract before return flight',
    'Latvian defence tech: paying customers in 90 days',
    'Healthtech founder meets Canada\'s largest hospital procurement team',
    'Cybersecurity co. builds enterprise pipeline in 4 weeks',
  ];

  return (
    <>
      <Navbar links={navLinks} ctaLabel="Apply to Horizon or Pivot" ctaHref="#apply" />
      <ScaleupHero />
      <ProofTicker items={proofItems} />

      <SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />
      <MarketGap />

      <SectionDivider fromColor="#FAF8F5" toColor="#F0ECE3" />
      <Approach />

      <SectionDivider fromColor="#F0ECE3" toColor="#FAF8F5" />
      <ThreeStages />

      <SectionDivider fromColor="#FAF8F5" toColor="#F0ECE3" />
      <Programs />

      <SectionDivider fromColor="#F0ECE3" toColor="#0A1628" />
      <CaseStudies />

      <SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />
      <WhyCanada />

      <SectionDivider fromColor="#FAF8F5" toColor="#F0ECE3" />
      <Qualifications />

      <SectionDivider fromColor="#F0ECE3" toColor="#0A1628" />
      <ScaleupCTA />

      <SectionDivider fromColor="#0A1628" toColor="#F0ECE3" />
      <TimelineTable />

      <Footer />
    </>
  );
}
```

### `src/components/scaleup/ScaleupHero.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ScaleupHero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

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
    <section id="hero" ref={heroRef} className="relative min-h-[100dvh] flex flex-col justify-end">
      <div className="absolute inset-0 overflow-hidden">
        <video ref={videoRef} autoPlay muted loop playsInline
          className="w-full h-full object-cover brightness-75"
          style={{ willChange: 'transform' }}>
          <source src="/videos/scaleup-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />
      </div>

      <div className="relative z-10 px-6 lg:px-16 pb-32 md:pb-40 pt-32">
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
            <a href="#discovery"
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
```

### `src/components/scaleup/MarketGap.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MarketGap() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mg-text', {
        scrollTrigger: { trigger: '.mg-text', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-warm-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 lg:px-16">
        <h2 className="mg-text text-2xl md:text-3xl lg:text-4xl font-extrabold text-charcoal mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}>
          Ontario has world-class universities, deep capital markets, and diverse talent. Market entry is still relationship-driven.
        </h2>

        <h3 className="mg-text text-xl md:text-2xl font-extrabold text-charcoal mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}>
          Founders arrive with traction but often can't break through:
        </h3>

        <div className="space-y-4 mb-8">
          <p className="mg-text text-charcoal/80 leading-relaxed text-lg border-l-[3px] border-l-teal pl-5"
            style={{ fontFamily: 'var(--font-body)' }}>
            A virtual events platform running 3,000+ events across 27 countries couldn't get a single meeting with a North American enterprise buyer.
          </p>
          <p className="mg-text text-charcoal/80 leading-relaxed text-lg border-l-[3px] border-l-teal pl-5"
            style={{ fontFamily: 'var(--font-body)' }}>
            A cybersecurity founder with European clients couldn't convert research calls into commercial conversations.
          </p>
          <p className="mg-text text-charcoal/80 leading-relaxed text-lg border-l-[3px] border-l-teal pl-5"
            style={{ fontFamily: 'var(--font-body)' }}>
            A fintech company spent months decoding Canadian regulatory norms before it could move.
          </p>
        </div>

        <p className="mg-text text-xl md:text-2xl font-extrabold text-charcoal mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}>
          TBDC closes that gap. Cold outreach becomes scheduled meetings with decision-makers who are ready to engage.
        </p>
        <p className="mg-text text-2xl md:text-3xl font-extrabold text-charcoal"
          style={{ fontFamily: 'var(--font-heading)' }}>
          We ensure your expansion lands.
        </p>
      </div>
    </section>
  );
}
```

### `src/components/scaleup/Approach.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Approach() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ap-text', {
        scrollTrigger: { trigger: '.ap-text', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="approach" ref={sectionRef} className="bg-sand py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 lg:px-16">
        <p className="ap-text text-teal text-sm font-bold uppercase tracking-wider mb-3"
          style={{ fontFamily: 'var(--font-mono)' }}>
          Our Approach
        </p>

        <p className="ap-text text-charcoal/80 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
          Our portfolio spans Hydrostor (clean energy storage unicorn), Turtle Island Recycling Corporation (unicorn acquired by GFL Environmental), Bento Sushi, iBentos, and Instron Technologies. Across sectors and stages, the pattern is consistent: ambitious founders, hard problems, structured support.
        </p>

        <p className="ap-text text-charcoal/80 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
          Most incubation programs give you a desk, a mentor, and a list of events. TBDC gives you a feasibility report, fractional C-suite support, and a calendar of qualified meetings with enterprise buyers, investors, and distribution partners — built around your sector and stage.
        </p>

        <p className="ap-text text-charcoal/80 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
          We've been doing this since 1990. Our network spans hospital procurement leaders, energy executives, global investors, and corporate innovation teams. These relationships took 36 years to build. When TBDC introduces a founder, the meeting happens.
        </p>
      </div>
    </section>
  );
}
```

### `src/components/scaleup/ThreeStages.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Users, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    icon: Compass,
    num: '01',
    title: 'Scout: Know before you grow.',
    desc: 'A 4–6 week feasibility engagement. We map your competitive landscape, identify the highest-value entry points, match you with sector-specific advisors, and hand you a GTM foundation you can execute against. No guessing. No wasted runway.',
    label: 'What you get:',
    items: [
      'Market feasibility report with clear entry paths',
      'Risk and regulatory assessment',
      'Industry-expert matching in your sector',
      'Strategic GTM foundation',
    ],
  },
  {
    icon: Users,
    num: '02',
    title: 'Sprint: Five days. The right rooms.',
    desc: 'Sprint Week in Toronto is where research becomes relationships. Before you arrive, we\'ve already matched you with enterprise customers ready to evaluate your product, VCs actively deploying in your sector, and operators who\'ve scaled your exact journey. Every meeting is curated. Nothing left to chance.',
    label: 'What you get:',
    items: [
      'Curated 1:1 meetings with buyers and investors',
      'Sales and GTM clinics led by operators',
      'Compliance and regulatory navigation',
      'Full ecosystem integration across Toronto\'s network',
    ],
  },
  {
    icon: Rocket,
    num: '03',
    title: 'Surge: Execute. With deep confidence.',
    desc: 'Post-Sprint, we match you with fractional C-suite executives who\'ve actually scaled into North America. They work alongside your team to implement your GTM, navigate compliance, prepare you for fundraising, and keep you moving. 3–6 months. Monthly strategy sessions plus on-demand access when it matters.',
    label: 'What you get:',
    items: [
      'Matched fractional executive support',
      'GTM implementation with North American playbooks',
      'Investor readiness coaching',
      'Regulatory and incorporation guidance',
    ],
  },
];

export default function ThreeStages() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stage-card', {
        scrollTrigger: { trigger: '.stage-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-warm-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Three stages. One outcome:{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              traction.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {stages.map((stage, i) => (
            <div key={i}
              className="stage-card card-hover bg-white rounded-2xl p-8 border border-slate-200/50
                border-t-[3px] border-t-teal relative overflow-hidden">
              <span className="absolute top-2 right-3 text-6xl font-extrabold text-charcoal/[0.03] pointer-events-none"
                style={{ fontFamily: 'var(--font-mono)' }}>
                {stage.num}
              </span>

              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5">
                <stage.icon size={24} className="text-teal" />
              </div>

              <p className="text-teal text-xs font-bold uppercase tracking-wider mb-2"
                style={{ fontFamily: 'var(--font-mono)' }}>
                Stage {stage.num}
              </p>

              <h3 className="text-lg font-bold text-charcoal mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {stage.title}
              </h3>

              <p className="text-sm text-charcoal/70 leading-relaxed mb-4"
                style={{ fontFamily: 'var(--font-body)' }}>
                {stage.desc}
              </p>

              <p className="text-sm font-bold text-charcoal mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {stage.label}
              </p>

              <ul className="space-y-2">
                {stage.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-charcoal/70"
                    style={{ fontFamily: 'var(--font-body)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### `src/components/scaleup/Programs.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, ArrowRightLeft, Landmark } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    icon: Globe,
    title: 'TBDC Horizon',
    body: 'For European deep tech, industrial, and B2B SaaS companies entering North America through Canada\'s most stable regulatory and commercial environment. Cohort-based, with Sprint Week running multiple times per year.',
  },
  {
    icon: ArrowRightLeft,
    title: 'TBDC Pivot',
    body: 'The same structured market entry framework, calibrated for founders from India, UAE, UK, and high-growth emerging markets. VC-backed or post-revenue. Serious operators only.',
  },
  {
    icon: Landmark,
    title: 'Land & Expand',
    body: 'Federally backed. Sector-specific to cleantech, healthtech, fintech, and advanced manufacturing. Designed for immigrant entrepreneurs establishing and scaling businesses in Ontario, with direct access to capital, customers, and industry networks.',
  },
];

export default function Programs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.prog-card', {
        scrollTrigger: { trigger: '.prog-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="programs" ref={sectionRef} className="bg-sand py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Our Programs
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Three programs. One standard:{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              results.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((prog, i) => (
            <div key={i}
              className="prog-card card-hover bg-white rounded-2xl p-8 border border-slate-200/50">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5">
                <prog.icon size={24} className="text-teal" />
              </div>

              <p className="text-teal text-xs font-bold uppercase tracking-wider mb-2"
                style={{ fontFamily: 'var(--font-mono)' }}>
                Program 0{i + 1}
              </p>

              <h3 className="text-xl font-bold text-charcoal mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {prog.title}
              </h3>

              <p className="text-sm text-charcoal/70 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}>
                {prog.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### `src/components/scaleup/CaseStudies.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    region: 'Romania · Advanced Manufacturing',
    headline: 'Contract closed before the return flight.',
    body: 'A Romanian robotics company joined Sprint Week with zero North American commercial relationships. TBDC matched them with enterprise buyers in their sector. They left Toronto with a signed contract.',
    result: 'Result: 0 → 1 commercial contract, North America.',
  },
  {
    region: 'Latvia · Defence Technology',
    headline: 'Paying customers in 90 days.',
    body: 'A Latvian defence tech startup entered the Horizon program with zero North American revenue. Through curated customer introductions and GTM coaching, they had revenue-generating clients within three months of starting.',
    result: 'Result: 90 days to first North American revenue.',
  },
  {
    region: 'Central Europe · Healthtech',
    headline: 'In the room with Canada\'s largest hospital network.',
    body: 'A healthtech founder from Central Europe needed access to enterprise healthcare buyers — one of the hardest doors to open in any market. TBDC arranged direct meetings with hospital procurement leadership. Two months in.',
    result: 'Result: 8 weeks to enterprise hospital meeting.',
  },
];

export default function CaseStudies() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.case-card', {
        scrollTrigger: { trigger: '.case-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="results" ref={sectionRef} className="bg-navy py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Real companies. Real results.
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Some meetings change{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              everything.
            </span>
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}>
            The best proof comes from the founders themselves. Watch how companies entering Canada through TBDC built partnerships, customers, and investor relationships that accelerated their growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <div key={i}
              className="case-card bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <p className="text-teal text-xs font-bold uppercase tracking-wider mb-3"
                style={{ fontFamily: 'var(--font-mono)' }}>
                {c.region}
              </p>

              <h3 className="text-xl font-bold text-white mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {c.headline}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-4"
                style={{ fontFamily: 'var(--font-body)' }}>
                {c.body}
              </p>

              <p className="text-sm font-bold text-teal"
                style={{ fontFamily: 'var(--font-mono)' }}>
                {c.result}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-white/60 mt-10"
          style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
          That's not luck. That's 36 years of relationship infrastructure working for you.
        </p>
      </div>
    </section>
  );
}
```

### `src/components/scaleup/WhyCanada.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    num: '01',
    title: 'Trade access that no other market offers',
    body: 'CETA, CUSMA, and CPTPP together give Canadian-based operations preferential access to 1.5B+ consumers. Ontario is the staging ground for all of it.',
  },
  {
    num: '02',
    title: 'The most stable business environment in the G7',
    body: 'Ranked #1 in banking stability, #3 in financial market sophistication. When markets get volatile, founders anchored in Canada move faster than everyone else.',
  },
  {
    num: '03',
    title: 'Talent that\'s genuinely diverse',
    body: '34.7% of Ontario\'s entrepreneurs are first or second-generation immigrants. The people who understand your product, your market, and your culture are already here.',
  },
  {
    num: '04',
    title: 'Government that\'s an active participant',
    body: 'TBDC is backed by the federal government, Province of Ontario, and City of Toronto. When we make introductions, we\'re a 36-year institution with standing — not a startup accelerator asking a favour.',
  },
];

export default function WhyCanada() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-card', {
        scrollTrigger: { trigger: '.why-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why-canada" ref={sectionRef} className="bg-warm-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            You picked the right market. Here's why the numbers agree.
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Why Canada.{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              Why now.
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <div key={i}
              className="why-card bg-white rounded-2xl p-8 border border-slate-200/50
                border-l-4 border-l-teal relative overflow-hidden">
              <span className="absolute top-2 right-3 text-6xl font-extrabold text-charcoal/[0.03] pointer-events-none"
                style={{ fontFamily: 'var(--font-mono)' }}>
                {r.num}
              </span>
              <h3 className="text-lg font-bold text-charcoal mb-3 relative z-10"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {r.title}
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed relative z-10"
                style={{ fontFamily: 'var(--font-body)' }}>
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### `src/components/scaleup/Qualifications.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, TrendingUp, Cpu, Zap, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const qualItems = [
  { icon: TrendingUp, text: 'Proven traction in your home market' },
  { icon: Shield, text: 'VC backing or post-revenue capital to execute' },
  { icon: Cpu, text: 'A scalable business model that crosses markets' },
  { icon: Zap, text: 'A team that can move fast when doors open' },
  { icon: Building2, text: 'Commitment to Ontario as your North American base' },
];

export default function Qualifications() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.qual-item', {
        scrollTrigger: { trigger: '.qual-item', start: 'top 85%', toggleActions: 'play none none none' },
        y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-sand py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}>
            This is not for everyone.{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              That's why it is for you.
            </span>
          </h2>
          <p className="text-charcoal/70 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}>
            Horizon and Pivot are built for founders who have proven traction in their home market and are ready to execute North American expansion in a structured, accountable way. If you're still searching for product-market fit, come back when you've found it. If you've found it — we're ready when you are.
          </p>
        </div>

        <h3 className="text-lg font-bold text-charcoal mb-6 text-center"
          style={{ fontFamily: 'var(--font-heading)' }}>
          You should have:
        </h3>

        <div className="space-y-4 max-w-2xl mx-auto">
          {qualItems.map((item, i) => (
            <div key={i} className="qual-item flex items-center gap-4 bg-white rounded-xl p-4 border border-slate-200/50">
              <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center shrink-0">
                <item.icon size={20} className="text-teal" />
              </div>
              <p className="text-charcoal/80 text-sm font-medium"
                style={{ fontFamily: 'var(--font-body)' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### `src/components/scaleup/ScaleupCTA.jsx`

```jsx
import { ArrowRight } from 'lucide-react';

export default function ScaleupCTA() {
  return (
    <section id="apply" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <circle cx="200" cy="300" r="150" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <circle cx="600" cy="200" r="120" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <line x1="200" y1="300" x2="600" y2="200" stroke="#00A88E" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 text-center py-24 md:py-32">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}>
          You've built something real.{' '}
          <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            animation: 'breathe 3s ease-in-out infinite', display: 'inline-block' }}>
            Now expand it here.
          </span>
        </h2>

        <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ fontFamily: 'var(--font-body)' }}>
          Apply to Horizon, Pivot, or Land & Expand — or start with a 30-minute discovery call. We'll tell you exactly which program fits where you are and what you're trying to do.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="#"
            className="btn-slide bg-teal text-white font-semibold px-10 py-5 rounded-full
              inline-flex items-center gap-2 text-lg"
            style={{ fontFamily: 'var(--font-body)' }}>
            <span className="btn-bg bg-teal-dark" />
            <span className="relative z-10 inline-flex items-center gap-2">
              Apply Now <ArrowRight size={20} />
            </span>
          </a>
          <a href="#"
            className="border border-white/30 text-white font-semibold px-10 py-5 rounded-full
              inline-flex items-center gap-2 text-lg hover:bg-white/10 transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}>
            Book a 30-Minute Call
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

## 8. Page 02 — Startup Founders

### `src/components/startup/StartupPage.jsx`

```jsx
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import SectionDivider from '../shared/SectionDivider';
import TimelineTable from '../shared/TimelineTable';
import StartupHero from './StartupHero';
import BuildAlone from './BuildAlone';
import ProgramPaths from './ProgramPaths';
import Mentorship from './Mentorship';
import TrackRecord from './TrackRecord';
import StartupCTA from './StartupCTA';

gsap.registerPlugin(ScrollTrigger);

export default function StartupPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { label: 'Programs', href: '#programs' },
    { label: 'Mentorship', href: '#mentorship' },
    { label: 'Track Record', href: '#track-record' },
  ];

  return (
    <>
      <Navbar links={navLinks} ctaLabel="Find Your Program" ctaHref="#programs" />
      <StartupHero />

      <SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />
      <BuildAlone />

      <SectionDivider fromColor="#FAF8F5" toColor="#F0ECE3" />
      <ProgramPaths />

      <SectionDivider fromColor="#F0ECE3" toColor="#0A1628" />
      <Mentorship />

      <SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />
      <TrackRecord />

      <SectionDivider fromColor="#FAF8F5" toColor="#0A1628" />
      <StartupCTA />

      <SectionDivider fromColor="#0A1628" toColor="#F0ECE3" />
      <TimelineTable />

      <Footer />
    </>
  );
}
```

### `src/components/startup/StartupHero.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function StartupHero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

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
            Ontario Founders · Newcomer Entrepreneurs · Early Stage
          </p>
          <h1 className="mb-6">
            <span className="st-hero-line block text-4xl md:text-5xl lg:text-6xl font-extrabold text-white"
              style={{ fontFamily: 'var(--font-heading)' }}>
              You have the idea.
            </span>
            <span className="st-hero-line block text-5xl md:text-6xl lg:text-7xl text-teal mt-2"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              We have everything else.
            </span>
          </h1>
          <div className="st-hero-body max-w-lg mb-8">
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-2"
              style={{ fontFamily: 'var(--font-body)' }}>
              Some founders build unicorn companies. Others build steady businesses employing hundreds of people across Ontario.
            </p>
            <p className="text-white/70 text-base md:text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}>
              Different outcomes. The same starting point: access to mentorship, capital, and networks that make growth possible.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#programs"
              className="st-hero-cta bg-teal hover:bg-teal-dark text-white font-semibold
                h-12 px-7 rounded-full inline-flex items-center gap-2 text-sm transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}>
              Find Your Program <ArrowRight size={16} />
            </a>
            <a href="#advisor"
              className="st-hero-cta border border-white/30 text-white font-semibold
                h-12 px-7 rounded-full inline-flex items-center gap-2 text-sm
                hover:bg-white/10 transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}>
              Talk to an Advisor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### `src/components/startup/BuildAlone.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BuildAlone() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ba-text', {
        scrollTrigger: { trigger: '.ba-text', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-warm-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 lg:px-16">
        <h2 className="ba-text text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}>
          The best founders don't build alone.
        </h2>

        <p className="ba-text text-charcoal/70 mb-6 leading-relaxed"
          style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
          Founders should not have to rely on luck or insider access to build successful companies. Structured support levels the playing field.
        </p>

        <p className="ba-text text-charcoal/80 leading-relaxed mb-6"
          style={{ fontFamily: 'var(--font-body)' }}>
          TBDC exists to give every Ontario founder — whether you were born here or arrived last year — access to the structure, mentorship, and networks that used to be reserved for people who already knew the right people.
        </p>

        <p className="ba-text text-charcoal/80 leading-relaxed mb-6"
          style={{ fontFamily: 'var(--font-body)' }}>
          10,000+ founders have come through our programs. Some built unicorns. Most built steady, sustainable businesses that employ real people and create lasting economic value. All needed the same thing: someone to believe in what they were building and give them the tools to execute.
        </p>

        <p className="ba-text text-charcoal/80 leading-relaxed mb-8"
          style={{ fontFamily: 'var(--font-body)' }}>
          That's what we've been doing since 1990. That's what we're here to do for you.
        </p>

        {/* Stat callout */}
        <div className="ba-text bg-sand rounded-2xl p-6 inline-flex items-center gap-4">
          <span className="text-3xl font-bold text-teal" style={{ fontFamily: 'var(--font-mono)' }}>
            XXX+
          </span>
          <div>
            <p className="text-sm font-bold text-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>
              Active Mentors
            </p>
            <p className="text-xs text-charcoal/60" style={{ fontFamily: 'var(--font-body)' }}>
              Operators, investors, and executives from Ontario's private and academic sectors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### `src/components/startup/ProgramPaths.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Landmark, ClipboardList, Compass, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    icon: Landmark,
    badge: 'Federally Backed',
    title: 'Land & Expand',
    subtitle: 'Built for newcomer founders ready to scale.',
    body: 'Federally backed with a $3.3M investment, Land & Expand is built for immigrant entrepreneurs establishing businesses in Ontario\'s priority sectors: cleantech, healthtech, fintech, and advanced manufacturing. Not generic newcomer support — a focused market entry program for founders already moving, who need structured pathways to capital, customers, and industry networks.',
    sectors: 'Sectors: Cleantech · Healthtech · Fintech · Advanced Manufacturing · Emerging Technologies',
    items: [
      'Sector-specific mentorship from active operators',
      'Capital connections and investor introductions',
      'Direct customer and procurement introductions',
      'Market expansion strategy and execution support',
    ],
  },
  {
    icon: ClipboardList,
    badge: 'City of Toronto Partnership',
    title: 'Business Inc.',
    subtitle: 'Eight weeks that turn an idea into a plan.',
    body: 'An eight-week foundational program covering everything you need to start: idea validation, business planning, market research, financials, regulatory basics, and launch preparation. Led by experienced operators, not academics. Free for eligible Toronto residents.',
    forLine: 'For: Anyone at the idea or early planning stage who wants structured guidance before they commit.',
    items: [
      'Eight weeks of execution-focused curriculum',
      'Expert-led sessions and peer accountability',
      'Business planning tools you keep after the program',
    ],
  },
  {
    icon: Compass,
    badge: null,
    title: 'Preparing for Self-Employment',
    subtitle: 'Clarity before the leap.',
    body: 'Not everyone who considers entrepreneurship should start a business. This five-week program helps you make that decision with clarity, not pressure. Themed group sessions, a self-assessment workbook, and 1:1 advisor meetings that end with a concrete recommendation. Free for eligible Toronto residents.',
    forLine: 'For: Anyone seriously considering self-employment who wants honest guidance before they leap.',
    items: [
      'Career clarity through structured self-assessment',
      '1:1 advisor meetings with concrete next steps',
      'Referrals into entrepreneurship or employment pathways',
    ],
  },
  {
    icon: Users,
    badge: 'ODSP Partnership',
    title: 'Biz Futures',
    subtitle: 'For founders building on their own terms.',
    body: 'One-on-one advisory support for founders sponsored by the Ontario Disability Support Program. Personalized, flexible, and built around your specific situation and business goals — not a standardized curriculum.',
    items: [],
  },
];

export default function ProgramPaths() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pp-card', {
        scrollTrigger: { trigger: '.pp-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="programs" ref={sectionRef} className="bg-sand py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Every founder starts somewhere different.
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Find the path that{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              fits you.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((prog, i) => (
            <div key={i}
              className="pp-card card-hover bg-white rounded-2xl p-8 border border-slate-200/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center shrink-0">
                  <prog.icon size={24} className="text-teal" />
                </div>
                <div>
                  {prog.badge && (
                    <span className="bg-teal text-white text-xs px-3 py-1 rounded-full font-semibold mb-2 inline-block"
                      style={{ fontFamily: 'var(--font-mono)' }}>
                      {prog.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-charcoal"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                    {prog.title}
                  </h3>
                </div>
              </div>

              <p className="text-charcoal font-bold text-base mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {prog.subtitle}
              </p>

              <p className="text-sm text-charcoal/70 leading-relaxed mb-3"
                style={{ fontFamily: 'var(--font-body)' }}>
                {prog.body}
              </p>

              {prog.sectors && (
                <p className="text-xs text-teal font-bold mb-3"
                  style={{ fontFamily: 'var(--font-mono)' }}>
                  {prog.sectors}
                </p>
              )}

              {prog.forLine && (
                <p className="text-sm text-charcoal/60 mb-3"
                  style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
                  {prog.forLine}
                </p>
              )}

              {prog.items.length > 0 && (
                <ul className="space-y-2 mt-4">
                  {prog.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-charcoal/70"
                      style={{ fontFamily: 'var(--font-body)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### `src/components/startup/Mentorship.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mentorBlocks = [
  {
    title: 'They\'ll tell you when you\'re wrong.',
    body: 'TBDC mentors are not speakers. They\'re operators — executives, founders, and investors who work directly with program participants on real business problems. They\'ll tell you if your pricing is wrong, your model has a hole, or your pitch will get rejected before you finish the first slide.',
  },
  {
    title: 'They\'ll open doors you can\'t reach cold.',
    body: 'They\'ll open a door to a buyer you couldn\'t reach cold. An introduction from a TBDC mentor carries institutional weight. When they make the call, the meeting happens. That\'s the difference between a great idea that stalls and a company that gets traction.',
  },
  {
    title: 'They\'ll hold you accountable.',
    body: 'They\'ll sit across from your pitch deck, tell you what a VC will actually think, and show up to the next session to see if you acted on any of it. That accountability loop — specific, repeated, and honest — is what 36 years of building a mentor network produces.',
  },
];

export default function Mentorship() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mentor-card', {
        scrollTrigger: { trigger: '.mentor-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="mentorship" ref={sectionRef} className="bg-navy py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            The mentorship that actually changes your trajectory.
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Mentorship from people who've{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              scaled companies.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {mentorBlocks.map((block, i) => (
            <div key={i}
              className="mentor-card bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {block.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}>
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### `src/components/startup/TrackRecord.jsx`

```jsx
import { useEffect, useRef, useState } from 'react';

const stats = [
  { number: '10,000+', label: 'Founders supported since 1990' },
  { number: '14', label: 'Sectors represented across our portfolio' },
  { number: '70+', label: 'Countries in our founder community' },
  { number: '2', label: 'Unicorn alumni — Hydrostor & Turtle Island Recycling Corporation' },
  { number: '10,000+', label: 'Sustainable jobs created across Ontario' },
  { number: '$X+', label: 'Capital Raised by TBDC Alumni' },
];

export default function TrackRecord() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="track-record" ref={sectionRef} className="bg-warm-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            The numbers behind the work.
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal"
            style={{ fontFamily: 'var(--font-heading)' }}>
            36 years isn't a number.{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              It's a track record.
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i}
              className={`bg-white rounded-2xl p-6 border border-slate-200/50 text-center
                transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-teal mb-2"
                style={{ fontFamily: 'var(--font-mono)' }}>
                {stat.number}
              </div>
              <p className="text-sm text-charcoal/70" style={{ fontFamily: 'var(--font-body)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-charcoal/50 mt-4" style={{ fontFamily: 'var(--font-body)' }}>
          Angels, venture capital, and institutional investors.
        </p>
      </div>
    </section>
  );
}
```

### `src/components/startup/StartupCTA.jsx`

```jsx
import { ArrowRight } from 'lucide-react';

export default function StartupCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <circle cx="200" cy="300" r="150" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <circle cx="600" cy="200" r="120" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <line x1="200" y1="300" x2="600" y2="200" stroke="#00A88E" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 text-center py-24 md:py-32">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}>
          Start somewhere.{' '}
          <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            animation: 'breathe 3s ease-in-out infinite', display: 'inline-block' }}>
            Start here.
          </span>
        </h2>

        <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ fontFamily: 'var(--font-body)' }}>
          Your first step doesn't have to be a leap. Talk to an advisor, find the program that fits where you are right now, and start moving. 10,000+ founders before you did exactly that.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="#"
            className="btn-slide bg-teal text-white font-semibold px-10 py-5 rounded-full
              inline-flex items-center gap-2 text-lg"
            style={{ fontFamily: 'var(--font-body)' }}>
            <span className="btn-bg bg-teal-dark" />
            <span className="relative z-10 inline-flex items-center gap-2">
              Apply to a Program <ArrowRight size={20} />
            </span>
          </a>
          <a href="#"
            className="border border-white/30 text-white font-semibold px-10 py-5 rounded-full
              inline-flex items-center gap-2 text-lg hover:bg-white/10 transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}>
            Speak With an Advisor
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

## 9. Page 03 — Partners & Ecosystem

### `src/components/partners/PartnersPage.jsx`

```jsx
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import SectionDivider from '../shared/SectionDivider';
import TimelineTable from '../shared/TimelineTable';
import PartnersHero from './PartnersHero';
import EcosystemRole from './EcosystemRole';
import PartnerTypes from './PartnerTypes';
import GovernmentTrust from './GovernmentTrust';
import Workforce from './Workforce';
import PartnersCTA from './PartnersCTA';

gsap.registerPlugin(ScrollTrigger);

export default function PartnersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { label: 'How We Work', href: '#how-we-work' },
    { label: 'Government Trust', href: '#government-trust' },
    { label: 'Workforce', href: '#workforce' },
  ];

  return (
    <>
      <Navbar links={navLinks} ctaLabel="Explore Partnership Options" ctaHref="#how-we-work" />
      <PartnersHero />

      <SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />
      <EcosystemRole />

      <SectionDivider fromColor="#FAF8F5" toColor="#F0ECE3" />
      <PartnerTypes />

      <SectionDivider fromColor="#F0ECE3" toColor="#FAF8F5" />
      <GovernmentTrust />

      <SectionDivider fromColor="#FAF8F5" toColor="#F0ECE3" />
      <Workforce />

      <SectionDivider fromColor="#F0ECE3" toColor="#0A1628" />
      <PartnersCTA />

      <SectionDivider fromColor="#0A1628" toColor="#F0ECE3" />
      <TimelineTable />

      <Footer />
    </>
  );
}
```

### `src/components/partners/PartnersHero.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PartnersHero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.pt-hero-line', { y: 40, opacity: 0, stagger: 0.08, duration: 0.9 })
        .from('.pt-hero-body', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.pt-hero-cta', { y: 20, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=0.4');

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
          <source src="/videos/partners-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />
      </div>

      <div className="relative z-10 px-6 lg:px-16 pb-32 md:pb-40 pt-32">
        <div className="max-w-4xl">
          <p className="pt-hero-line text-sm font-bold uppercase tracking-wider text-teal mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Government · Enterprise · Investors · Media
          </p>
          <h1 className="mb-6">
            <span className="pt-hero-line block text-4xl md:text-5xl lg:text-6xl font-extrabold text-white"
              style={{ fontFamily: 'var(--font-heading)' }}>
              Ontario's innovation economy runs on
            </span>
            <span className="pt-hero-line block text-5xl md:text-6xl lg:text-7xl text-teal mt-2"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              what we build together.
            </span>
          </h1>
          <div className="pt-hero-body max-w-lg mb-8">
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-2"
              style={{ fontFamily: 'var(--font-body)' }}>
              TBDC sits at the intersection of Ontario's public sector, private capital markets, innovation institutions, and global founders.
            </p>
            <p className="text-white/70 text-base md:text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}>
              This position allows us to translate government mandates into real market outcomes.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#how-we-work"
              className="pt-hero-cta bg-teal hover:bg-teal-dark text-white font-semibold
                h-12 px-7 rounded-full inline-flex items-center gap-2 text-sm transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}>
              Explore Partnership Options <ArrowRight size={16} />
            </a>
            <a href="#contact"
              className="pt-hero-cta border border-white/30 text-white font-semibold
                h-12 px-7 rounded-full inline-flex items-center gap-2 text-sm
                hover:bg-white/10 transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}>
              Contact Our Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### `src/components/partners/EcosystemRole.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EcosystemRole() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.eco-text', {
        scrollTrigger: { trigger: '.eco-text', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-warm-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 lg:px-16">
        <p className="eco-text text-teal text-sm font-bold uppercase tracking-wider mb-3"
          style={{ fontFamily: 'var(--font-mono)' }}>
          What TBDC Does at the Ecosystem Level
        </p>

        <h2 className="eco-text text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}>
          We build what companies need to survive.
        </h2>

        <p className="eco-text text-lg text-charcoal/70 mb-6"
          style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
          "Most incubators serve founders. TBDC serves the ecosystem."
        </p>

        <p className="eco-text text-charcoal/80 leading-relaxed mb-6"
          style={{ fontFamily: 'var(--font-body)' }}>
          That means running programs that produce measurable economic outcomes — companies launched, jobs created, investment attracted, markets entered. It means operating under public accountability because our funders include three levels of government.
        </p>

        <p className="eco-text text-charcoal/80 leading-relaxed mb-6"
          style={{ fontFamily: 'var(--font-body)' }}>
          And it means building long-term relationships with enterprise buyers, institutional investors, and sector associations who become part of the infrastructure that makes our founder programs work.
        </p>

        <p className="eco-text text-charcoal/80 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}>
          When a hospital procurement head takes a meeting with one of our healthtech founders, that's not a favour. That's 36 years of demonstrated value to that institution.
        </p>
      </div>
    </section>
  );
}
```

### `src/components/partners/PartnerTypes.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Landmark, Building2, TrendingUp, Users, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const partnerSections = [
  {
    icon: Landmark,
    accentColor: '#D4A843',
    title: 'For Government',
    subtitle: 'Public trust. Auditable outcomes.',
    body: 'For government partners at the federal, provincial, and municipal level, TBDC is a proven delivery mechanism for economic development programming. Our outcomes align with yours: sustainable job creation, inclusive entrepreneurship, regional economic development, and global competitiveness built through innovation.',
    items: [
      '$3.3M federal investment in Land & Expand, recognized by the Prime Minister\'s Office',
      'Ontario\'s only province-wide Startup Visa incubator',
      'Active partner: Toronto Economic Development Office and Toronto District School Board',
      '36 years of government-backed programming with auditable outcomes',
    ],
    cta: 'Contact Our Government Partnerships Team',
  },
  {
    icon: Building2,
    accentColor: '#00A88E',
    title: 'For Enterprise',
    subtitle: 'The deal flow you can\'t find elsewhere.',
    body: 'TBDC\'s founder network is one of the most diverse, high-quality pipelines in Ontario. 70+ countries represented. 14 sectors. Founders who\'ve demonstrated the discipline to seek structured support — the strongest early signal of execution capability.',
    extraHeading: 'Corporate partners use TBDC in three ways:',
    extraItems: [
      'As a sourcing channel — Early visibility on emerging companies in your sector before they become competitive threats or acquisition targets.',
      'As an innovation conduit — Pilot programs and POC arrangements with vetted startups, structured by TBDC to reduce friction for both sides.',
      'As a talent signal — Access to entrepreneurial talent that\'s been through structured mentorship and has demonstrated commercial judgment.',
    ],
    disclaimer: 'We don\'t do logo partnerships. If you\'re interested in working with TBDC, it means your organization is willing to show up — as a mentor, a buyer, a pilot partner, or a connector. Founders notice the difference.',
    cta: 'Talk to Our Enterprise Team',
  },
  {
    icon: TrendingUp,
    accentColor: '#00A88E',
    title: 'For Investors',
    subtitle: 'First look. Before everyone else is looking.',
    body: 'TBDC gives investors early, structured visibility into Ontario\'s next generation of high-growth companies. Our Horizon and Pivot programs specifically target VC-backed or investment-ready international scaleups entering North America — companies that have already proven traction in their home market and are now executing expansion with government backing and institutional support behind them.',
    extraBody: 'TBDC\'s portfolio spans cleantech, healthtech, AI, advanced manufacturing, fintech, and emerging technologies, reflecting Ontario\'s most strategic growth sectors.',
    items: [
      'Pre-seed and seed Ontario founders, investment-ready from structured programming',
      'International scaleups entering North America through Horizon and Pivot',
      'Deal flow across 14 sectors including cleantech, healthtech, AI, and advanced manufacturing',
    ],
    cta: 'Join Our Investor Network',
  },
  {
    icon: Users,
    accentColor: '#00A88E',
    title: 'For Media',
    subtitle: '36 years of building Ontario\'s economy.',
    body: 'TBDC has produced two unicorn alumni companies, $3.3M in federal investment, and 10,000+ supported founders across three decades. Our programs intersect immigration policy, economic development, workforce transformation, and global competitiveness — across 14 sectors and 70+ countries.',
    items: [
      'Access to program graduates, government partners, and sector experts',
      'Data on Ontario founder trends across industries and geographies',
      'Dedicated press contact for inquiries and embargoed announcements',
    ],
    cta: 'Press & Media Contact',
  },
];

export default function PartnerTypes() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.partner-card', {
        scrollTrigger: { trigger: '.partner-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how-we-work" ref={sectionRef} className="bg-sand py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            How We Work With Partners
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Early access to Ontario's{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              best companies.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {partnerSections.map((ps, i) => (
            <div key={i}
              className="partner-card card-hover bg-white rounded-2xl p-8 border border-slate-200/50
                border-t-[3px]"
              style={{ borderTopColor: ps.accentColor }}>

              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${ps.accentColor}15` }}>
                <ps.icon size={24} style={{ color: ps.accentColor }} />
              </div>

              <h3 className="text-xl font-bold text-charcoal mb-1"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {ps.title}
              </h3>
              <p className="text-charcoal font-bold text-base mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {ps.subtitle}
              </p>

              <p className="text-sm text-charcoal/70 leading-relaxed mb-4"
                style={{ fontFamily: 'var(--font-body)' }}>
                {ps.body}
              </p>

              {ps.extraHeading && (
                <p className="text-sm font-bold text-charcoal mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}>
                  {ps.extraHeading}
                </p>
              )}

              {ps.extraItems && (
                <ul className="space-y-2 mb-4">
                  {ps.extraItems.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-charcoal/70"
                      style={{ fontFamily: 'var(--font-body)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {ps.extraBody && (
                <p className="text-sm text-charcoal/70 leading-relaxed mb-4"
                  style={{ fontFamily: 'var(--font-body)' }}>
                  {ps.extraBody}
                </p>
              )}

              {ps.disclaimer && (
                <p className="text-sm text-charcoal/60 leading-relaxed mb-4"
                  style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
                  {ps.disclaimer}
                </p>
              )}

              {ps.items && !ps.extraItems && (
                <ul className="space-y-2 mb-4">
                  {ps.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-charcoal/70"
                      style={{ fontFamily: 'var(--font-body)' }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                        style={{ backgroundColor: ps.accentColor }} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <a href="#"
                className="text-sm font-semibold inline-flex items-center gap-1 link-hover transition-colors"
                style={{ fontFamily: 'var(--font-body)', color: ps.accentColor }}>
                {ps.cta} <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### `src/components/partners/GovernmentTrust.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const levels = [
  {
    level: 'Federal — Government of Canada',
    body: '$3.3M investment in Land & Expand. Federally designated Startup Visa organization. Recognized by the Prime Minister\'s Office for attracting global entrepreneurial talent to Canada.',
  },
  {
    level: 'Provincial — Province of Ontario',
    body: 'Ontario\'s only province-wide Startup Visa incubator. Recipient of the Province of Ontario Award of Recognition for economic contribution.',
  },
  {
    level: 'Municipal — City of Toronto',
    body: 'Founded by the City of Toronto in 1990. Active partner with the Toronto Economic Development Office and Toronto District School Board.',
  },
];

const foundation = [
  { label: 'Vision', text: 'Ontario\'s trusted partner for startup growth and global expansion.' },
  { label: 'Mission', text: 'Building the infrastructure that helps ambitious founders access customers, capital, and markets.' },
  { label: 'Values', text: 'Access · Execution · Accountability · Ecosystem' },
];

export default function GovernmentTrust() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gov-card', {
        scrollTrigger: { trigger: '.gov-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="government-trust" ref={sectionRef} className="bg-warm-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Thirty-six years of public trust.{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              Earned one outcome at a time.
            </span>
          </h2>
          <p className="text-charcoal/70 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}>
            TBDC has been a delivery partner for economic development programming at the federal, provincial, and municipal level for over three decades. That's a solid track record of showing up, delivering measurable outcomes, and being trusted with public investment again and again.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {levels.map((l, i) => (
            <div key={i}
              className="gov-card bg-white rounded-2xl p-8 border border-slate-200/50 border-l-4 border-l-gold">
              <h3 className="text-lg font-bold text-charcoal mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {l.level}
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}>
                {l.body}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-sand rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 className="text-lg font-bold text-charcoal mb-4 text-center"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Our Foundation
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {foundation.map((f, i) => (
              <div key={i} className="text-center">
                <p className="text-teal text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ fontFamily: 'var(--font-mono)' }}>
                  {f.label}
                </p>
                <p className="text-sm text-charcoal/70 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}>
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

### `src/components/partners/Workforce.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Wrench, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    icon: Users,
    title: 'Employability and Workforce · Youth Program',
    body: 'Annual summer program for Toronto youth in partnership with the Toronto District School Board. Focused on employability skills, workplace readiness, and exposure to skilled trades careers. Free for participants.',
  },
  {
    icon: Wrench,
    title: 'Explore Skilled Trades · 2–8 Week Retraining',
    body: 'Structured retraining program for workers transitioning into construction and skilled trades careers. Addresses Ontario\'s acute skilled trades shortage through upskilling and certification pathways. Directly feeds the talent pipeline that Ontario\'s growing manufacturing and construction sectors depend on.',
  },
  {
    icon: Building2,
    title: 'Explore Trucking Careers · Logistics Sector',
    body: 'Career pathway and onboarding support for workers entering or re-entering the trucking and logistics industry — one of Ontario\'s most critical and chronically understaffed sectors. Structured for rapid entry with practical certification and placement support.',
  },
];

export default function Workforce() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wf-card', {
        scrollTrigger: { trigger: '.wf-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="workforce" ref={sectionRef} className="bg-sand py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Workforce & Skills Development
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Workforce development for a{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              stronger economy.
            </span>
          </h2>
          <p className="text-charcoal/70 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}>
            TBDC's mandate includes workforce development and entrepreneurship development. Since 1990, we've run programs that strengthen Ontario's workforce at every stage — because the ecosystem only works when builders have builders to hire.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((prog, i) => (
            <div key={i}
              className="wf-card card-hover bg-white rounded-2xl p-8 border border-slate-200/50">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5">
                <prog.icon size={24} className="text-teal" />
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {prog.title}
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}>
                {prog.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### `src/components/partners/PartnersCTA.jsx`

```jsx
import { ArrowRight } from 'lucide-react';

export default function PartnersCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <circle cx="200" cy="300" r="150" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <circle cx="600" cy="200" r="120" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <line x1="200" y1="300" x2="600" y2="200" stroke="#00A88E" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 text-center py-24 md:py-32">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}>
          The next great Ontario company is in our program{' '}
          <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            animation: 'breathe 3s ease-in-out infinite', display: 'inline-block' }}>
            right now.
          </span>
        </h2>

        <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ fontFamily: 'var(--font-body)' }}>
          Be part of what happens next. Whether you fund, procure, mentor, or report on Ontario's innovation economy — the conversation starts here.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="#"
            className="btn-slide bg-teal text-white font-semibold px-10 py-5 rounded-full
              inline-flex items-center gap-2 text-lg"
            style={{ fontFamily: 'var(--font-body)' }}>
            <span className="btn-bg bg-teal-dark" />
            <span className="relative z-10 inline-flex items-center gap-2">
              Explore Partnership Options <ArrowRight size={20} />
            </span>
          </a>
          <a href="#"
            className="border border-white/30 text-white font-semibold px-10 py-5 rounded-full
              inline-flex items-center gap-2 text-lg hover:bg-white/10 transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}>
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

## 10. Animation & Motion Guide

### Summary of GSAP Patterns Used

All components follow the same GSAP setup:

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Component() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animations scoped to sectionRef
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return <section ref={sectionRef}>...</section>;
}
```

### Standard Values

| Property | Value | Notes |
|----------|-------|-------|
| `y` | 20–40px | Slide-up distance |
| `opacity` | 0 | Always fade in |
| `stagger` | 0.08–0.12s | Between sibling elements |
| `duration` | 0.5–1.0s | Shorter for smaller elements |
| `ease` | `power3.out` | Universal easing |
| `start` | `top 85%` | When trigger enters viewport |

### CSS Transitions (Non-GSAP)

- Card hover: `transition: transform 0.3s, box-shadow 0.3s` with `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Color transitions: `transition-colors duration-300`
- Navbar morph: `transition-all duration-500`
- Image zoom: `group-hover:scale-105 transition-transform duration-500`

---

## 11. Responsive & Accessibility Notes

### Breakpoints (Tailwind defaults)

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | 2-column grids |
| `md` | 768px | Desktop nav, 3-column grids |
| `lg` | 1024px | Full layouts, wider padding |
| `xl` | 1280px | 4-5 column grids |

### Accessibility Checklist

- All decorative images: `alt=""`
- Content images: descriptive `alt` text
- Interactive icons: `aria-label`
- Color contrast: White on navy/teal meets WCAG AA
- `loading="lazy"` on below-fold images
- Semantic HTML: `<nav>`, `<section>`, `<footer>`, heading hierarchy
- Focus states: Tailwind defaults

### Asset Placeholders

The following assets need to be sourced/created:

| Asset | Used In | Notes |
|-------|---------|-------|
| `/videos/scaleup-hero.mp4` | Scaleup hero | Background video |
| `/videos/startup-hero.mp4` | Startup hero | Background video |
| `/videos/partners-hero.mp4` | Partners hero | Background video |
| Logo SVG/image | Navbar | Replace "TBDC" text with actual logo |
| Founder video carousel | Scaleup case studies | Optional enhancement |
| Startup logo strip | Scaleup case studies | Optional logo runner |

---

## Implementation Order (Recommended)

1. **Global setup**: `index.css`, fonts, Tailwind theme, App.jsx routing
2. **Shared components**: Navbar, Footer, SectionDivider, ScrollProgress, NoiseOverlay
3. **Router page** (`/`): Landing page with persona cards + quiz
4. **Scaleup page** (`/scaleup`): All sections with verbatim copy
5. **Startup page** (`/startup`): All sections with verbatim copy
6. **Partners page** (`/partners`): All sections with verbatim copy
7. **Polish**: Animations, video assets, responsive testing

---

**IMPORTANT REMINDERS:**
- All copy text is VERBATIM from the approved document. Do not modify, rephrase, or adapt any text.
- Follow the TBDC Design System exactly: colors, fonts, spacing, border radius, shadows.
- Use the Component Reference patterns for all UI elements.
- Maintain the background color alternation pattern between sections.
- All GSAP animations should be scoped to component refs and cleaned up on unmount.
