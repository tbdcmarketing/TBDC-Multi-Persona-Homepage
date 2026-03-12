# TBDC Website — New Pages: Team & Media
## Lovable Implementation Instructions (Addendum)

> **Context:** This document extends the existing TBDC website (React 19 + Vite 7 + Tailwind CSS v4 + GSAP 3 + Lucide React). It adds two new pages — `/team` and `/media` — with full component code, routing updates, and navbar additions. Drop this directly into Lovable alongside the original instructions.

---

## TABLE OF CONTENTS

1. [Router & Navigation Updates](#1-router--navigation-updates)
2. [Team Page — Full Implementation](#2-team-page)
3. [Media Page — Full Implementation](#3-media-page)
4. [Shared Utilities](#4-shared-utilities)
5. [Implementation Order](#5-implementation-order)

---

## 1. Router & Navigation Updates

### 1a. Add Routes to `App.jsx`

Add these two new routes inside your existing `<Routes>`:

```jsx
import TeamPage from './pages/TeamPage';
import MediaPage from './pages/MediaPage';

// Inside <Routes>:
<Route path="/team" element={<TeamPage />} />
<Route path="/media" element={<MediaPage />} />
```

### 1b. Update Navbar Links

In your shared `Navbar` component, add "Our Team" and "Media" to the navigation links array. Insert them before the CTA button:

```jsx
const navLinks = [
  { label: 'Scaleups', href: '/scaleup' },
  { label: 'Startups', href: '/startup' },
  { label: 'Partners', href: '/partners' },
  { label: 'Our Team', href: '/team' },
  { label: 'Media', href: '/media' },
];
```

These should render as `<Link>` components (react-router-dom) inside both the desktop nav and the mobile hamburger menu. Use the same scroll-morph navbar behavior already implemented — starts transparent over hero, morphs to frosted white when scrolled.

### 1c. Update Footer

Add the new pages to the footer's "Quick Links" column:

```jsx
{ label: 'Our Team', href: '/team' },
{ label: 'Media & Press', href: '/media' },
```

---

## 2. Team Page — Full Implementation

### File: `src/pages/TeamPage.jsx`

```jsx
import { useEffect } from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import ScrollProgress from '../components/shared/ScrollProgress';
import NoiseOverlay from '../components/shared/NoiseOverlay';
import TeamHero from '../components/team/TeamHero';
import TeamGrid from '../components/team/TeamGrid';
import TeamCTA from '../components/team/TeamCTA';

export default function TeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ScrollProgress />
      <NoiseOverlay />
      <Navbar />
      <main>
        <TeamHero />
        <TeamGrid />
        <TeamCTA />
      </main>
      <Footer />
    </>
  );
}
```

---

### File: `src/components/team/TeamHero.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TeamHero() {
  const heroRef = useRef(null);

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
      className="relative bg-navy min-h-[60dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Decorative SVG network background */}
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 text-center pt-32 pb-20 md:pb-28">
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
```

---

### File: `src/data/teamData.js`

This is the team data extracted from the CSV. Use exactly as provided:

```js
export const teamMembers = [
  {
    name: 'Vik Khurana',
    title: 'Chairman',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-vik-khurana-headshot-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/vikram-khurana-1aa97b/',
  },
  {
    name: 'Angela Larraguibel',
    title: 'COO',
    image: 'https://tbdc.com/wp-content/uploads/2026/03/Angela-Profile-Picture.png',
    linkedin: 'https://www.linkedin.com/in/alarraguibel/',
  },
  {
    name: 'Kaj Thiru',
    title: 'CFO',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-kaj-thiru-headshot-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/kajananth-thirunavukkarasu-6639b820/',
  },
  {
    name: 'Dharti Chatterjee',
    title: 'CMO',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-dharti-chaterjee-headshot-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/dhartichatterjee/',
  },
  {
    name: 'Sen Sachi',
    title: 'Head of Programming',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-sen-sachi-headshot-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/sensachi/',
  },
  {
    name: 'Rahul George',
    title: 'Director of Programming',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-rahul-george-headshot-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/rahuljgeorge/',
  },
  {
    name: 'Jaghan S',
    title: 'Director of Partnerships',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-headshot-jaghan-s-scaled-e1747760189976-300x270.webp',
    linkedin: 'https://www.linkedin.com/in/jaghan-s/',
  },
  {
    name: 'Dan Flatt',
    title: 'Senior Director of Marketing',
    image: 'https://tbdc.com/wp-content/uploads/2026/03/DanFlattProfile.png',
    linkedin: 'https://www.linkedin.com/in/danielflatt/',
  },
  {
    name: 'Mustafa Ansari',
    title: 'Director of Marketing, Employment Programs',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/headshot-mustafa-ansari-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/mustafa-ansari/',
  },
  {
    name: 'Shaunik Sachdev',
    title: 'Director of Marketing, Sales & Growth',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/headshot-shaunik-sachdev-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/shaunik-sachdev/',
  },
  {
    name: 'Cia Prior',
    title: 'Director of Marketing',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-cia-prior-headshot-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/ciaprior/',
  },
  {
    name: 'Zubair Patel',
    title: 'Director of Strategic Initiatives & Partnerships, BHive',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-zubair-patel-headshot-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/patelzubair/',
  },
  {
    name: 'AJ Sivam',
    title: 'Director, Brand & Public Relations',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-aj-sivam-headshot-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/ajsivam/',
  },
  {
    name: 'Nikhil Sharma',
    title: 'Global Business Lead',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-nikhil-sharma-headshot-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/nikhil-sharma-aa223b40/',
  },
  {
    name: 'Shishir Kanodia',
    title: 'Venture Manager',
    image: 'https://tbdc.com/wp-content/uploads/2025/04/headshot-shishir-kanodia-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/shishirkanodia05/',
  },
  {
    name: 'Jonathan Knott',
    title: 'Program Manager',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-jonathan-knott-headshot-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/jonathan-knott/',
  },
  {
    name: 'Hammad Hassan',
    title: 'Program Manager, Explore Trucking Careers',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-hammad-hassan-headshot-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/hammad-hassan-66257963/',
  },
  {
    name: 'Olga Senko',
    title: 'Strategic Partnerships & Business Development',
    image: 'https://tbdc.com/wp-content/uploads/2025/06/headshot-olga-senko-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/olgasenko/',
  },
  {
    name: 'Olayinka Akindele',
    title: 'Finance Manager',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-olayinka-akindele-headshot-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/olayinka-akindele-19a63b5a/',
  },
  {
    name: 'Lorena Solis',
    title: 'Human Resources Manager',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/headshot-lorena-solis-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/lorena-solis-901187b2/',
  },
  {
    name: 'James Rich',
    title: 'Digital Marketing & Compliance Manager',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-james-rich-headshot-300x300.webp',
    linkedin: 'http://www.linkedin.com/in/jamesrich17',
  },
  {
    name: 'Ira Sharma',
    title: 'Content Marketing Associate',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-ira-sharma-headshot-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/sharma-ira/',
  },
  {
    name: 'Danny Brennan',
    title: 'Community Programs',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-daniel-brennan-headshot-300x300.webp',
    linkedin: null,
  },
  {
    name: 'Yehor Trysh',
    title: 'Digital Designer',
    image: 'https://tbdc.com/wp-content/uploads/2025/05/tbdc-yehor-trysh-headshot-300x300.webp',
    linkedin: 'https://www.linkedin.com/in/yehor-trysh/',
  },
  {
    name: 'Gurpreet Kaur',
    title: 'Graphic Designer',
    image: 'https://tbdc.com/wp-content/uploads/2025/06/headshot-gurpreet-kaur-300x300.webp',
    linkedin: null,
  },
];
```

**Note on ordering:** The array is deliberately ordered with leadership first (Chairman, COO, CFO, CMO), then senior directors, directors, managers, and team members. This creates a natural visual hierarchy in the grid.

**Note on LinkedIn:** Danny Brennan's LinkedIn points to the TBDC company page (not a personal profile), and Gurpreet Kaur has no LinkedIn provided. Both are set to `null` — the card component handles this gracefully by not showing the LinkedIn overlay for these members.

---

### File: `src/components/team/TeamMemberCard.jsx`

This is the core card component with hover/tap LinkedIn overlay:

```jsx
import { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TeamMemberCard({ member, index }) {
  const cardRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay: (index % 4) * 0.1, // stagger within each visual row
        ease: 'power3.out',
      });
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  // Handle mobile tap
  const handleClick = () => {
    if (!member.linkedin) return;
    // On mobile, first tap reveals overlay; second tap navigates
    if (isActive) {
      window.open(member.linkedin, '_blank', 'noopener,noreferrer');
    } else {
      setIsActive(true);
    }
  };

  // Close overlay when clicking outside (mobile)
  useEffect(() => {
    if (!isActive) return;
    const handleOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, [isActive]);

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden cursor-pointer card-hover"
      onClick={handleClick}
      role={member.linkedin ? 'link' : undefined}
      aria-label={member.linkedin ? `View ${member.name} on LinkedIn` : undefined}
    >
      {/* Image container — aspect ratio 3:4 portrait */}
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 
                     group-hover:scale-105"
          loading="lazy"
        />

        {/* Permanent gradient at bottom for name readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent" />

        {/* LinkedIn hover overlay — desktop: hover, mobile: active state */}
        {member.linkedin && (
          <div
            className={`absolute inset-0 bg-teal/85 flex flex-col items-center justify-center
                        transition-all duration-400 
                        ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                        backdrop-blur-sm`}
          >
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-3
                            transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <Linkedin size={28} className="text-[#0A66C2]" />
            </div>
            <p
              className="text-white text-sm font-semibold transform translate-y-4 
                         group-hover:translate-y-0 transition-transform duration-500 delay-75"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              View Profile
            </p>
            {/* On desktop, the anchor handles the click */}
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 hidden md:block"
              aria-label={`View ${member.name} on LinkedIn`}
              onClick={(e) => e.stopPropagation()} // prevent double-fire on desktop
            />
          </div>
        )}

        {/* Name + title overlay at bottom */}
        <div className="absolute bottom-0 inset-x-0 p-4 z-10">
          <h3
            className="text-white text-base font-bold leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {member.name}
          </h3>
          <p
            className="text-white/80 text-xs mt-0.5 leading-snug"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {member.title}
          </p>
        </div>
      </div>
    </div>
  );
}
```

**Key behaviors:**
- **Desktop hover:** Hovering over the card reveals a teal overlay with the LinkedIn icon. The entire card is clickable and opens LinkedIn in a new tab.
- **Mobile tap:** First tap reveals the teal overlay. Second tap navigates to LinkedIn. Tapping elsewhere dismisses the overlay.
- **No LinkedIn:** If `member.linkedin` is `null`, no overlay appears and the card is non-interactive (just displays name/title/photo).
- **Scroll animation:** Each card slides up and fades in when it enters the viewport. Cards stagger within each visual row (`index % 4 * 0.1s` delay) for a wave effect.

---

### File: `src/components/team/TeamGrid.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamMembers } from '../../data/teamData';
import TeamMemberCard from './TeamMemberCard';

gsap.registerPlugin(ScrollTrigger);

export default function TeamGrid() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-section-header', {
        scrollTrigger: {
          trigger: '.team-section-header',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Split into leadership (first 4: Chairman, COO, CFO, CMO) and rest
  const leadership = teamMembers.slice(0, 4);
  const team = teamMembers.slice(4);

  return (
    <section ref={sectionRef} className="bg-warm-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Leadership Section */}
        <div className="team-section-header text-center mb-14">
          <p
            className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Leadership
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Guiding the{' '}
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Vision</span>
          </h2>
          <p
            className="text-lg text-charcoal/60 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            The executive team steering TBDC's mission to transform entrepreneurs into global leaders.
          </p>
        </div>

        {/* Leadership grid — 4 columns on xl, 2 on sm */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-20 md:mb-28">
          {leadership.map((member, i) => (
            <TeamMemberCard key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* Full Team Section */}
        <div className="text-center mb-14">
          <p
            className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            The Team
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The People Who{' '}
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Make It Happen</span>
          </h2>
        </div>

        {/* Team grid — 4 columns on xl, 3 on lg, 2 on sm */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <TeamMemberCard key={member.name} member={member} index={i + 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### File: `src/components/team/TeamCTA.jsx`

```jsx
import { useEffect, useRef } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function TeamCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-cta-content > *', {
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
      {/* Subtle SVG network */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
          <circle cx="700" cy="100" r="150" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <circle cx="100" cy="350" r="100" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <line x1="100" y1="350" x2="700" y2="100" stroke="#00A88E" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 text-center py-24 md:py-32">
        <div className="team-cta-content">
          <p
            className="text-teal text-sm font-bold uppercase tracking-wider mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Join Our Mission
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Want to Work With Us?
          </h2>
          <p
            className="text-lg text-white/70 max-w-2xl mx-auto mb-10"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            We're always looking for passionate people who want to help entrepreneurs
            change the world. Explore opportunities to join the TBDC team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:info@tbdc.com"
              className="btn-slide bg-teal text-white font-semibold px-8 py-4 rounded-full
                         inline-flex items-center gap-2 text-base"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="btn-bg bg-teal-dark" />
              <span className="relative z-10 inline-flex items-center gap-2">
                <Mail size={18} /> Get In Touch
              </span>
            </a>
            <Link
              to="/"
              className="border border-white/30 text-white font-semibold h-[52px] px-7 rounded-full
                         inline-flex items-center gap-2 text-sm hover:bg-white/10 transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Explore Our Programs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 3. Media Page — Full Implementation

### Curated Media Mentions

The media entries below were hand-selected from the research document. They include the strongest external coverage and most impactful TBDC blog posts. The negative investigative piece from The Pointer is intentionally excluded.

### File: `src/data/mediaData.js`

```js
export const mediaEntries = [
  // ─── EXTERNAL PRESS ─────────────────────────────────────────
  {
    id: 'betakit-european-startups',
    category: 'In the News',
    type: 'Feature',
    source: 'BetaKit',
    date: '2026-01-08',
    title: 'Why European Startups Are Coming to Canada',
    description:
      'BetaKit covers TBDC\'s largest Horizon Sprint Week cohort yet — 23 companies from 10 EU countries with over $120M raised collectively. Features founder stories and insights from Chair Vikram Khurana and Marketing Director Cia Prior.',
    url: 'https://betakit.com/why-european-startups-are-coming-to-canada/',
    image: null, // placeholder — use TBDC brand image or BetaKit logo
    featured: true,
  },
  {
    id: 'betakit-new-narrative',
    category: 'In the News',
    type: 'Interview',
    source: 'BetaKit',
    date: '2025-03-11',
    title: 'TBDC Pitches a New Narrative for Canadian Startups',
    description:
      'An in-depth interview with Chair Vikram Khurana on TBDC\'s strategic pivot — repositioning Canada as a sovereign, globally competitive commercial hub rather than a gateway to the U.S. market.',
    url: 'https://betakit.com/tbdc-pitches-a-new-narrative-for-canadian-startups/',
    image: null,
    featured: true,
  },
  {
    id: 'betakit-edtech',
    category: 'In the News',
    type: 'Feature',
    source: 'BetaKit',
    date: '2025-04-10',
    title: 'The Founders Looking to Redefine Learning in Canada',
    description:
      'How TBDC-supported edtech founders like Schoolio and Mintbook are transforming Canadian education through mentorship and ecosystem connections.',
    url: 'https://betakit.com/the-founders-looking-to-redefine-learning-in-canada/',
    image: null,
    featured: false,
  },
  {
    id: 'betakit-mobility',
    category: 'In the News',
    type: 'Feature',
    source: 'BetaKit',
    date: '2025-03-31',
    title: 'Inside the Push to Get Ontario\'s Mobility Startups Moving',
    description:
      'TBDC\'s role in supporting micro-mobility and logistics founders with regulatory navigation, funding pathways, and network connections — including the Scooty success story.',
    url: 'https://betakit.com/tbdc-mobility-ecosystem/',
    image: null,
    featured: false,
  },
  {
    id: 'govt-skills-centre',
    category: 'In the News',
    type: 'Government',
    source: 'Government of Canada',
    date: '2025-03-04',
    title: 'Federal Government Invests $7.25M in Net-Zero Skills Training Centre',
    description:
      'The Government of Canada announces a major investment in TBDC\'s new Skills Training Centre in Scarborough — expanding inclusive trades and trucking training with a net-zero facility.',
    url: 'https://www.canada.ca/en/housing-infrastructure-communities/news/2025/03/federal-government-invests-in-inclusive-skills-development-space-in-scarborough.html',
    image: null,
    featured: true,
  },
  {
    id: 'emea-greek-deeptech',
    category: 'In the News',
    type: 'Interview',
    source: 'EMEA Startups',
    date: '2025-10-18',
    title: 'Canada Is Ready for Greek Deeptech Talent',
    description:
      'Vikram Khurana outlines why Canada is primed to absorb Greek deeptech startups — covering TBDC\'s Horizon program, non-dilutive capital pathways, and the Greek diaspora advantage.',
    url: 'https://emeastartups.com/vikram-khurana-tbdc-canada-is-ready-for-greek-deeptech-talent/15888',
    image: null,
    featured: false,
  },
  {
    id: 'uae-bridge',
    category: 'In the News',
    type: 'Partnership',
    source: 'INTLBM',
    date: '2025-08-11',
    title: 'iACCEL GBI Partners with TBDC to Boost Startups Across UAE and Canada',
    description:
      'A landmark MoU creating the "Toronto-UAE Innovation Bridge" — a dedicated, institutionalized pathway connecting Dubai\'s hyper-growth capital markets with Toronto\'s incubation infrastructure.',
    url: 'https://intlbm.com/2025/08/11/iaccel-gbi-partners-with-tbdc-to-boost-startups-across-uae-and-canada/',
    image: null,
    featured: false,
  },
  {
    id: 'telegraph-india',
    category: 'In the News',
    type: 'Feature',
    source: 'The Telegraph India',
    date: '2025-06-15',
    title: 'Toronto Business Development Centre Helped Indian Start-ups',
    description:
      'How TBDC leverages the Start-Up Visa Program to support over 300 Indian entrepreneurs in establishing their base in Canada — with office space, mentorship, and VC introductions.',
    url: 'https://www.telegraphindia.com/business/toronto-business-development-centre-helped-indian-start-ups-vikram-khurana/cid/1912934',
    image: null,
    featured: false,
  },
  {
    id: 'soulmates-ventures',
    category: 'In the News',
    type: 'Partnership',
    source: 'Soulmates Ventures',
    date: '2025-09-01',
    title: 'Beyond Borders: A New Gateway to Canada for Startups',
    description:
      'Soulmates Ventures announces a strategic collaboration with TBDC for European and Czech startups entering the Canadian market — including meetings with Ontario Minister Victor Fedeli.',
    url: 'https://www.soulmatesventures.com/beyond-borders-a-new-gateway-to-canada-for-startups-in-our-network/',
    image: null,
    featured: false,
  },

  // ─── TBDC THOUGHT LEADERSHIP / BLOG ─────────────────────────
  {
    id: 'tbdc-life-sciences',
    category: 'Thought Leadership',
    type: 'Blog',
    source: 'TBDC',
    date: '2025-11-21',
    title: 'Canada\'s Life Sciences Reset: What a New BDC Fund Means for Healthtech Founders',
    description:
      'A deep analysis of the $100M BDC Life Sciences Fund, the $1B federal VGCCI initiative, and why Canada\'s regulatory architecture creates a unique biotech commercialization runway.',
    url: 'https://tbdc.com/canadas-life-sciences-reset-what-a-new-bdc-fund-means-for-healthtech-founders/',
    image: null,
    featured: false,
  },
  {
    id: 'tbdc-strategic-angels',
    category: 'Thought Leadership',
    type: 'Blog',
    source: 'TBDC',
    date: '2025-10-01',
    title: 'The Rise of Strategic Angels and Operator LPs',
    description:
      'How the collapse of seed-stage VC is driving a shift toward operator-investors who provide capital alongside specialized domain experience, mentorship, and network access.',
    url: 'https://tbdc.com/the-rise-of-strategic-angels-and-operator-lps/',
    image: null,
    featured: true,
  },
  {
    id: 'tbdc-listening-leader',
    category: 'Thought Leadership',
    type: 'Blog',
    source: 'TBDC',
    date: '2025-10-15',
    title: 'The Billionaire\'s Secret: Listening Like a Leader',
    description:
      'Guest strategist Kumutha Ramanathan breaks down the executive communication frameworks used by ultra-wealthy founders — and how TBDC cohorts can operationalize them.',
    url: 'https://tbdc.com/the-billionaires-secret-listening-like-a-leader/',
    image: null,
    featured: false,
  },
  {
    id: 'tbdc-skip-seed',
    category: 'Thought Leadership',
    type: 'Blog',
    source: 'TBDC',
    date: '2025-09-15',
    title: 'Why More Startups Are Skipping the Seed Round Entirely',
    description:
      'As early-stage VC becomes aggressively risk-averse, founders are aligning with individual investors and small syndicates who provide capital alongside hands-on operational support.',
    url: 'https://tbdc.com/why-more-startups-are-skipping-the-seed-round-entirely/',
    image: null,
    featured: false,
  },
  {
    id: 'tbdc-hearable',
    category: 'Thought Leadership',
    type: 'Blog',
    source: 'TBDC',
    date: '2026-02-04',
    title: 'The Hearable Revolution: The Next Big Health Shift Is Happening in Your Ear',
    description:
      'Exploring the convergence of consumer audio and clinical health monitoring — and why hearable technology represents a massive opportunity for Canadian healthtech founders.',
    url: 'https://tbdc.com/the-hearable-revolution/',
    image: null,
    featured: false,
  },
  {
    id: 'tbdc-women-entrepreneurs',
    category: 'Thought Leadership',
    type: 'Blog',
    source: 'TBDC',
    date: '2025-08-20',
    title: 'How Women Entrepreneurs in Canada Can Overcome Barriers and Access Key Funding',
    description:
      'Addressing the systemic exclusion of women from informal power networks and how TBDC engineers curated networking environments to democratize investor access.',
    url: 'https://tbdc.com/how-women-entrepreneurs-in-canada-can-overcome-barriers-and-access-key-funding/',
    image: null,
    featured: false,
  },
  {
    id: 'tbdc-stealth-public',
    category: 'Thought Leadership',
    type: 'Blog',
    source: 'TBDC',
    date: '2025-07-10',
    title: 'Should Your Startup Build in Public or Stay in Stealth Mode?',
    description:
      'A founder\'s guide to the strategic dichotomy of building in public vs. stealth — with frameworks for deciding which approach fits your venture stage and market.',
    url: 'https://tbdc.com/should-your-startup-build-in-public-or-stay-in-stealth-mode-a-founders-guide/',
    image: null,
    featured: false,
  },
];
```

---

### File: `src/pages/MediaPage.jsx`

```jsx
import { useEffect } from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import ScrollProgress from '../components/shared/ScrollProgress';
import NoiseOverlay from '../components/shared/NoiseOverlay';
import MediaHero from '../components/media/MediaHero';
import MediaFeatured from '../components/media/MediaFeatured';
import MediaGrid from '../components/media/MediaGrid';
import MediaCTA from '../components/media/MediaCTA';

export default function MediaPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ScrollProgress />
      <NoiseOverlay />
      <Navbar />
      <main>
        <MediaHero />
        <MediaFeatured />
        <MediaGrid />
        <MediaCTA />
      </main>
      <Footer />
    </>
  );
}
```

---

### File: `src/components/media/MediaHero.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MediaHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.media-hero-eyebrow', { y: 20, opacity: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' });
      gsap.from('.media-hero-title', { y: 30, opacity: 0, duration: 0.8, delay: 0.35, ease: 'power3.out' });
      gsap.from('.media-hero-subtitle', { y: 20, opacity: 0, duration: 0.7, delay: 0.5, ease: 'power3.out' });
      gsap.from('.media-hero-stats > *', {
        y: 20, opacity: 0, stagger: 0.1, duration: 0.6, delay: 0.65, ease: 'power3.out',
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative bg-navy min-h-[60dvh] flex items-center justify-center overflow-hidden"
    >
      {/* SVG network background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <circle cx="200" cy="300" r="150" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <circle cx="600" cy="200" r="100" fill="none" stroke="#00A88E" strokeWidth="0.5" />
          <line x1="200" y1="300" x2="600" y2="200" stroke="#00A88E" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 text-center pt-32 pb-20 md:pb-28">
        <p
          className="media-hero-eyebrow text-teal text-sm font-bold uppercase tracking-wider mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Press & Thought Leadership
        </p>
        <h1
          className="media-hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          TBDC in the{' '}
          <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }} className="text-teal">
            Media
          </span>
        </h1>
        <p
          className="media-hero-subtitle text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Featured articles, press coverage, and insights from Canada's premier
          innovation incubator.
        </p>

        {/* Stats bar */}
        <div className="media-hero-stats flex flex-wrap justify-center gap-8 md:gap-14">
          {[
            { number: '35+', label: 'Years of Impact' },
            { number: '242', label: 'Founders Welcomed in 2025' },
            { number: '19', label: 'Countries Represented' },
            { number: '600+', label: 'Workers Trained in Trades' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-2xl md:text-3xl font-bold text-teal"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {stat.number}
              </p>
              <p
                className="text-xs text-white/50 mt-1"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {stat.label}
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

### File: `src/components/media/MediaCard.jsx`

```jsx
import { useEffect, useRef } from 'react';
import { ArrowUpRight, Newspaper, Mic, Handshake, Landmark, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const typeIcons = {
  Feature: Newspaper,
  Interview: Mic,
  Partnership: Handshake,
  Government: Landmark,
  Blog: BookOpen,
};

const categoryColors = {
  'In the News': 'bg-teal text-white',
  'Thought Leadership': 'bg-navy text-white',
};

export default function MediaCard({ entry, index, variant = 'default' }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay: (index % 3) * 0.1,
        ease: 'power3.out',
      });
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  const Icon = typeIcons[entry.type] || Newspaper;

  const formattedDate = new Date(entry.date).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (variant === 'featured') {
    return (
      <a
        ref={cardRef}
        href={entry.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group card-hover bg-white rounded-2xl overflow-hidden border border-slate-200/50
                   grid lg:grid-cols-2 gap-0"
      >
        {/* Left: color block with icon */}
        <div className="relative bg-navy p-8 md:p-12 flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold ${categoryColors[entry.category]}`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {entry.category}
              </span>
              <span
                className="text-xs text-white/50"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {entry.type}
              </span>
            </div>
            <h3
              className="text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-teal
                         transition-colors duration-300"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {entry.title}
            </h3>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center">
                <Icon size={16} className="text-teal" />
              </div>
              <span
                className="text-sm text-white/70 font-medium"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {entry.source}
              </span>
            </div>
            <span
              className="text-xs text-white/40"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {formattedDate}
            </span>
          </div>
          {/* Subtle SVG decoration */}
          <div className="absolute top-4 right-4 opacity-[0.06]">
            <Icon size={80} className="text-teal" />
          </div>
        </div>

        {/* Right: description */}
        <div className="p-8 md:p-12 flex flex-col justify-between">
          <p
            className="text-charcoal/70 leading-relaxed mb-6"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {entry.description}
          </p>
          <div className="flex items-center gap-2 text-teal font-semibold text-sm
                          group-hover:gap-3 transition-all duration-300"
               style={{ fontFamily: 'var(--font-body)' }}>
            Read Full Article
            <ArrowUpRight size={16} className="transition-transform duration-300
                                                group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </a>
    );
  }

  // Default card variant
  return (
    <a
      ref={cardRef}
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group card-hover bg-white rounded-2xl p-6 border border-slate-200/50
                 flex flex-col h-full relative overflow-hidden"
    >
      {/* Watermark icon */}
      <div className="absolute top-3 right-3 opacity-[0.04] pointer-events-none">
        <Icon size={60} className="text-charcoal" />
      </div>

      {/* Category + type badges */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold ${categoryColors[entry.category]}`}
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {entry.category}
        </span>
        <span
          className="bg-teal/5 text-teal text-xs px-3 py-1 rounded-full"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {entry.type}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-lg font-bold text-charcoal leading-tight mb-3
                   group-hover:text-teal transition-colors duration-300"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {entry.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm text-charcoal/60 leading-relaxed mb-6 flex-grow line-clamp-3"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {entry.description}
      </p>

      {/* Footer: source + date */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-teal/10 flex items-center justify-center">
            <Icon size={14} className="text-teal" />
          </div>
          <span
            className="text-xs text-charcoal/70 font-medium"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {entry.source}
          </span>
        </div>
        <span
          className="text-xs text-charcoal/40"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {formattedDate}
        </span>
      </div>

      {/* Hover arrow indicator */}
      <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-teal/0 group-hover:bg-teal/10
                      flex items-center justify-center transition-all duration-300">
        <ArrowUpRight size={16} className="text-teal opacity-0 group-hover:opacity-100
                                            transition-opacity duration-300" />
      </div>
    </a>
  );
}
```

---

### File: `src/components/media/MediaFeatured.jsx`

This section showcases the 4 "featured" entries in a prominent layout:

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mediaEntries } from '../../data/mediaData';
import MediaCard from './MediaCard';

gsap.registerPlugin(ScrollTrigger);

export default function MediaFeatured() {
  const sectionRef = useRef(null);
  const featured = mediaEntries.filter((e) => e.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.media-featured-header', {
        scrollTrigger: {
          trigger: '.media-featured-header',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-warm-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="media-featured-header text-center mb-14">
          <p
            className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Featured Coverage
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Making{' '}
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Headlines</span>
          </h2>
        </div>

        <div className="space-y-8">
          {featured.map((entry, i) => (
            <MediaCard key={entry.id} entry={entry} index={i} variant="featured" />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### File: `src/components/media/MediaGrid.jsx`

This section shows all non-featured entries in a filterable grid:

```jsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mediaEntries } from '../../data/mediaData';
import MediaCard from './MediaCard';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'In the News', 'Thought Leadership'];

export default function MediaGrid() {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const nonFeatured = mediaEntries.filter((e) => !e.featured);
  const filtered =
    activeFilter === 'All'
      ? nonFeatured
      : nonFeatured.filter((e) => e.category === activeFilter);

  // Sort by date descending
  const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.media-grid-header', {
        scrollTrigger: {
          trigger: '.media-grid-header',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Re-trigger card animations when filter changes
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [activeFilter]);

  return (
    <section ref={sectionRef} className="bg-sand py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="media-grid-header text-center mb-10">
          <p
            className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            All Coverage
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Browse{' '}
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>All Articles</span>
          </h2>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                ${
                  activeFilter === cat
                    ? 'bg-teal text-white shadow-md'
                    : 'bg-white text-charcoal border border-slate-200/50 hover:border-teal/30'
                }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({nonFeatured.filter((e) => e.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((entry, i) => (
            <MediaCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>

        {sorted.length === 0 && (
          <p
            className="text-center text-charcoal/40 py-12"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            No articles found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
```

---

### File: `src/components/media/MediaCTA.jsx`

```jsx
import { useEffect, useRef } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MediaCTA() {
  const sectionRef = useRef(null);

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
```

---

## 4. Shared Utilities

### 4a. CSS Addition — `line-clamp` Utility

The MediaCard uses `line-clamp-3` to truncate descriptions. Tailwind v4 should support this natively. If it doesn't, add this to your global CSS:

```css
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### 4b. SectionDivider Usage

Add curved section dividers between sections with different background colors, following the existing pattern:

**Team Page divider sequence:**
```
TeamHero (navy) → SectionDivider(navy → warm-white) → TeamGrid (warm-white) → TeamCTA (navy)
```

**Media Page divider sequence:**
```
MediaHero (navy) → SectionDivider(navy → warm-white) → MediaFeatured (warm-white) → SectionDivider(warm-white → sand) → MediaGrid (sand) → MediaCTA (navy)
```

Use the existing `SectionDivider` component:
```jsx
<SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />
```

---

## 5. Implementation Order

Follow this sequence to avoid dependency issues:

1. **Data files first:** Create `src/data/teamData.js` and `src/data/mediaData.js`
2. **Team components:** `TeamMemberCard` → `TeamHero` → `TeamGrid` → `TeamCTA`
3. **Media components:** `MediaCard` → `MediaHero` → `MediaFeatured` → `MediaGrid` → `MediaCTA`
4. **Page wrappers:** `TeamPage.jsx` and `MediaPage.jsx`
5. **Routing:** Add routes to `App.jsx`
6. **Navigation:** Update Navbar and Footer with new links
7. **Section dividers:** Add `SectionDivider` components between sections in each page
8. **Test:** Verify scroll animations, mobile LinkedIn tap behavior, filter pills, and external link targets

---

## File Structure (New Files Only)

```
src/
├── data/
│   ├── teamData.js
│   └── mediaData.js
├── pages/
│   ├── TeamPage.jsx
│   └── MediaPage.jsx
├── components/
│   ├── team/
│   │   ├── TeamHero.jsx
│   │   ├── TeamMemberCard.jsx
│   │   ├── TeamGrid.jsx
│   │   └── TeamCTA.jsx
│   └── media/
│       ├── MediaHero.jsx
│       ├── MediaCard.jsx
│       ├── MediaFeatured.jsx
│       ├── MediaGrid.jsx
│       └── MediaCTA.jsx
```

---

## Design System Compliance Checklist

- [x] **Colors:** Navy hero/CTA sections, warm-white/sand alternating content sections
- [x] **Typography:** All 4 font families used correctly (heading, serif accent, body, mono labels)
- [x] **Cards:** `rounded-2xl`, `card-hover` class, `border-slate-200/50`
- [x] **Buttons:** Pill shape (`rounded-full`), `btn-slide` effect on CTAs, ghost buttons on dark backgrounds
- [x] **Animations:** GSAP ScrollTrigger with `power3.out`, `y: 30-40`, `stagger: 0.08-0.12`, proper cleanup via `gsap.context`
- [x] **Responsive:** Mobile-first grid breakpoints (`sm:grid-cols-2` → `lg:grid-cols-3` → `xl:grid-cols-4`)
- [x] **Navbar:** Existing scroll-morph behavior works on new pages (hero section intersection)
- [x] **Accessibility:** `loading="lazy"` on images, `aria-label` on interactive elements, semantic HTML
- [x] **Section dividers:** Curved SVG transitions between background color changes

---

*End of instructions. This document is self-contained and can be dropped directly into Lovable alongside the original TBDC build instructions.*
