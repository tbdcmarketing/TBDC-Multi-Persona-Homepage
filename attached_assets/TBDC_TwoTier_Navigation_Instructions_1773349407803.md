# TBDC Two-Tier Navigation System — Replit Agent Instructions

## Problem

Currently, each persona page (Scaleup, Startup, Partners) has its own navbar with only page-specific anchor links. When a user is on a persona page, they lose access to navigate to other persona pages, the Our Team page, and the Media page. The footer also needs updating to include these links.

## Goal

Implement a **two-tier navigation system** where:
- **Tier 1 (Global Bar):** Always visible across ALL pages. Contains site-wide navigation to every major page.
- **Tier 2 (Contextual Bar):** Only appears on persona pages. Contains anchor links to sections within that specific page.

Both tiers should feel like a single cohesive navbar — not two disconnected bars.

---

## TIER 1 — Global Navigation Bar (All Pages)

This is the **primary top bar** that appears on every single page of the site.

### Structure

```
[TBDC Logo]                    Scaleup Founders · Startup Founders · Partners · Our Team · Media    [Get Started →]
```

### Links

| Label | Route | Type |
|---|---|---|
| TBDC Logo | `/` | React Router `<Link>` |
| Scaleup Founders | `/scaleup` | React Router `<Link>` |
| Startup Founders | `/startup` | React Router `<Link>` |
| Partners | `/partners` | React Router `<Link>` |
| Our Team | `/team` | React Router `<Link>` |
| Media | `/media` | React Router `<Link>` |
| Get Started → | `/` (scrolls to persona quiz) | Primary CTA button (`btn-primary-teal`) |

### Styling
- Background: transparent on hero, transitions to `bg-brand-navy/95 backdrop-blur-md` on scroll (existing behavior)
- Height: `64px` desktop, `56px` mobile
- Font: DM Sans Medium, `14px`, `tracking-wide`, `uppercase`
- Link color: `text-warm-white/70` default, `text-warm-white` on hover
- **Active page indicator:** The link for the current page should have `text-teal-400` color and a `2px` bottom border in `teal-400`, offset `4px` below the text
- The CTA button should remain the existing teal pill button style with arrow icon
- Sticky: `position: fixed`, `top: 0`, `z-50`

### Behavior
- On the **Landing page (`/`)**: Tier 1 only. No Tier 2.
- On the **Our Team page (`/team`)**: Tier 1 only. No Tier 2.
- On the **Media page (`/media`)**: Tier 1 only. No Tier 2.
- On **persona pages** (`/scaleup`, `/startup`, `/partners`): Both Tier 1 AND Tier 2.

---

## TIER 2 — Contextual Anchor Navigation (Persona Pages Only)

This bar appears **directly below Tier 1** only on the three persona pages. It provides in-page anchor navigation to sections within that page.

### Positioning & Behavior
- Sits directly below Tier 1 with no visual gap — they should appear as one unified navbar with two rows
- Background: `bg-brand-navy/80 backdrop-blur-sm` with a subtle `border-b border-warm-white/10` separator between Tier 1 and Tier 2
- Height: `40px`
- Sticky: `position: fixed`, `top: 64px` (sits below Tier 1), `z-40`
- **On scroll past the hero section**, Tier 2 slides in with a subtle GSAP `y: -40 → 0` animation (it can be hidden while still in the hero viewport, then appears as user scrolls into content)

### Tier 2 Links Per Page

#### Scaleup Founders (`/scaleup`)

```
Our Approach · Programs · Results · Why Canada                    [Apply to Horizon or Pivot →]
```

| Label | Target | Type |
|---|---|---|
| Our Approach | `#approach` | Smooth scroll anchor |
| Programs | `#programs` | Smooth scroll anchor |
| Results | `#results` | Smooth scroll anchor |
| Why Canada | `#why-canada` | Smooth scroll anchor |
| Apply to Horizon or Pivot → | External link (application form) | CTA button (`btn-primary-teal`, smaller variant) |

#### Startup Founders (`/startup`)

```
Programs · Mentorship · Track Record                              [Find Your Program →]
```

| Label | Target | Type |
|---|---|---|
| Programs | `#programs` | Smooth scroll anchor |
| Mentorship | `#mentorship` | Smooth scroll anchor |
| Track Record | `#track-record` | Smooth scroll anchor |
| Find Your Program → | External link (program finder) | CTA button (`btn-primary-teal`, smaller variant) |

#### Partners & Ecosystem (`/partners`)

```
Ecosystem · Partner With Us · Government                          [Partner With TBDC →]
```

| Label | Target | Type |
|---|---|---|
| Ecosystem | `#ecosystem` | Smooth scroll anchor |
| Partner With Us | `#partner-with-us` | Smooth scroll anchor |
| Government | `#government` | Smooth scroll anchor |
| Partner With TBDC → | External link (contact form) | CTA button — **use `btn-primary-gold` (gold variant)** to match Partners page accent color |

### Anchor Scroll Behavior
- All Tier 2 anchor links use `scroll-behavior: smooth` with an offset of `104px` (Tier 1 height 64px + Tier 2 height 40px) so content doesn't get hidden behind the fixed navbar
- Add `scroll-margin-top: 104px` (or `scroll-pt-[104px]` in Tailwind) to each target section on persona pages
- **Active section highlighting:** As the user scrolls, the Tier 2 link for the currently visible section should become `text-teal-400` (or `text-gold-400` on the Partners page). Use an IntersectionObserver or GSAP ScrollTrigger to detect the active section.

### Tier 2 Font Styling
- Font: DM Sans Regular, `13px`, `tracking-wide`
- Link color: `text-warm-white/50` default, `text-warm-white/90` on hover, active color as above
- The Tier 2 CTA button should be slightly smaller than the Tier 1 CTA — use `text-sm py-1.5 px-4` instead of the standard button size

---

## MOBILE NAVIGATION

On viewports below `768px`, the two-tier system should collapse into a single **hamburger menu** (existing mobile nav pattern).

### Mobile Menu Structure

When the hamburger is tapped, a full-screen overlay slides in from the right with:

```
── PAGES ──────────────────
   Scaleup Founders        →
   Startup Founders         →
   Partners & Ecosystem     →
   Our Team                 →
   Media                    →

── ON THIS PAGE ───────────   ← Only shown on persona pages
   Our Approach
   Programs
   Results
   Why Canada

───────────────────────────
   [Get Started →]            ← Full-width CTA at bottom
```

### Mobile Menu Details
- The "PAGES" section header uses `text-teal-400 text-xs tracking-[0.2em] uppercase font-dm-sans`
- The "ON THIS PAGE" section header uses the same style — only rendered when the current route is `/scaleup`, `/startup`, or `/partners`
- Page links are `text-warm-white text-lg font-editorial-new` with a right arrow
- Anchor links are `text-warm-white/70 text-base font-dm-sans`
- Tapping an anchor link closes the mobile menu and smooth-scrolls to the section
- Tapping a page link closes the mobile menu and navigates via React Router
- The overlay background is `bg-brand-navy/98 backdrop-blur-lg`
- Close button: `X` icon (Lucide `X`) in the top-right, same position as the hamburger

---

## FOOTER UPDATE

Update the site-wide footer to include Our Team and Media in the navigation links.

### Footer Link Structure

Add a "Company" or "About" column to the footer (or update the existing link column) to include:

```
COMPANY                    PROGRAMS                   CONNECT
────────                   ────────                   ────────
Scaleup Founders           Horizon                    Book a Discovery Call
Startup Founders           Pivot                      Apply Now
Partners & Ecosystem       Land & Expand              Contact Us
Our Team                   Business Inc.
Media                      Biz Futures

                           WORKFORCE
                           ────────
                           Explore Skilled Trades
                           Explore Trucking Careers
```

### Footer Quick Links
- "Our Team" links to `/team`
- "Media" links to `/media`
- All other page links use their existing routes
- Program links should anchor to the relevant section on the appropriate persona page

---

## COMPONENT ARCHITECTURE

### Recommended File Structure

```
src/components/navigation/
├── GlobalNav.tsx           ← Tier 1 — used on ALL pages
├── ContextualNav.tsx       ← Tier 2 — used on persona pages only
├── NavWrapper.tsx          ← Combines Tier 1 + conditional Tier 2
├── MobileMenu.tsx          ← Full-screen mobile overlay
├── NavLink.tsx             ← Shared link component with active state
└── useActiveSection.ts     ← Hook for scroll-based active section detection
```

### NavWrapper.tsx Logic

```tsx
// NavWrapper.tsx — renders on every page
import { useLocation } from 'react-router-dom';
import { GlobalNav } from './GlobalNav';
import { ContextualNav } from './ContextualNav';

const PERSONA_ROUTES = ['/scaleup', '/startup', '/partners'];

// Contextual nav config per persona page
const CONTEXTUAL_NAV_CONFIG: Record<string, { links: Array<{ label: string; anchor: string }>; cta: { label: string; href: string }; ctaVariant: 'teal' | 'gold' }> = {
  '/scaleup': {
    links: [
      { label: 'Our Approach', anchor: '#approach' },
      { label: 'Programs', anchor: '#programs' },
      { label: 'Results', anchor: '#results' },
      { label: 'Why Canada', anchor: '#why-canada' },
    ],
    cta: { label: 'Apply to Horizon or Pivot', href: '#apply' },
    ctaVariant: 'teal',
  },
  '/startup': {
    links: [
      { label: 'Programs', anchor: '#programs' },
      { label: 'Mentorship', anchor: '#mentorship' },
      { label: 'Track Record', anchor: '#track-record' },
    ],
    cta: { label: 'Find Your Program', href: '#apply' },
    ctaVariant: 'teal',
  },
  '/partners': {
    links: [
      { label: 'Ecosystem', anchor: '#ecosystem' },
      { label: 'Partner With Us', anchor: '#partner-with-us' },
      { label: 'Government', anchor: '#government' },
    ],
    cta: { label: 'Partner With TBDC', href: '#partner' },
    ctaVariant: 'gold',
  },
};

export function NavWrapper() {
  const { pathname } = useLocation();
  const isPersonaPage = PERSONA_ROUTES.includes(pathname);
  const contextualConfig = CONTEXTUAL_NAV_CONFIG[pathname];

  return (
    <>
      <GlobalNav currentPath={pathname} />
      {isPersonaPage && contextualConfig && (
        <ContextualNav config={contextualConfig} />
      )}
    </>
  );
}
```

### useActiveSection.ts Hook

```tsx
// useActiveSection.ts — tracks which section is currently in viewport
import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: '-120px 0px -60% 0px', // accounts for navbar height
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
```

---

## HERO SECTION PADDING ADJUSTMENT

Since the navbar is now taller on persona pages (Tier 1 + Tier 2 = 104px total), update the hero section top padding on persona pages:

- **Landing, Team, Media pages** (Tier 1 only): `padding-top: 64px` (unchanged)
- **Persona pages** (Tier 1 + Tier 2): `padding-top: 104px`

This ensures hero content does not get hidden behind the two-tier navbar.

---

## ANIMATION

### Tier 2 Entrance
When the user scrolls past the hero section on a persona page, Tier 2 should animate in:

```tsx
// Use GSAP ScrollTrigger
gsap.fromTo('.contextual-nav', 
  { y: -40, opacity: 0 },
  { 
    y: 0, 
    opacity: 1, 
    duration: 0.3, 
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'bottom top+=64', // when hero bottom hits top of viewport + Tier 1 height
      toggleActions: 'play none none reverse',
    }
  }
);
```

### Mobile Menu
- Open: Slide in from right, `x: '100%' → '0%'`, duration `0.4s`, `power3.out`
- Close: Slide out to right, `x: '0%' → '100%'`, duration `0.3s`, `power2.in`
- Background overlay fades in `opacity: 0 → 1` with `0.3s` duration

---

## TRANSITION BEHAVIOR BETWEEN PAGES

When navigating from one persona page to another (e.g., Scaleup → Startup):
1. Tier 1 remains fixed and does not re-render — only the active link highlight changes
2. Tier 2 crossfades its content — old links fade out, new links fade in (`opacity` transition, `0.2s`)
3. The page scrolls to top (`window.scrollTo(0, 0)`)
4. The Tier 2 CTA button updates to match the new page's CTA and color variant

---

## DO NOT CHANGE
- Any page content, copy, or typography below the hero sections
- The video hero backgrounds (from previous instructions)
- GSAP scroll animations on page content sections
- The TBDC logo implementation (from previous instructions)
- Card components, section dividers, or any other existing components

---

## IMPLEMENTATION ORDER

1. Create the `useActiveSection` hook
2. Create `NavLink` shared component
3. Build `GlobalNav` (Tier 1) as a standalone component
4. Build `ContextualNav` (Tier 2) as a standalone component
5. Build `NavWrapper` to combine them
6. Build `MobileMenu` with both sections
7. Replace the existing per-page navbars with the single `NavWrapper` in the app layout
8. Add `id` attributes to all section headings on persona pages (matching the anchor targets)
9. Add `scroll-margin-top: 104px` to all anchor target sections on persona pages
10. Update hero padding on persona pages to `104px`
11. Update the footer to include Our Team and Media links
12. Test all routes, anchor scrolling, active states, and mobile menu
