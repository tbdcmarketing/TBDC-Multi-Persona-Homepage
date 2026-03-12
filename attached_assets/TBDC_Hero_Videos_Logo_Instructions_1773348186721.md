# TBDC Hero Background Videos + Logo Update — Replit Agent Instructions

## Files Being Uploaded to This Project
- `Landing Page.mp4`
- `ScaleUpFounders Page.mp4`
- `Startup Founders Page.mp4`
- `PartnersEcosystem Page.mp4`
- `TBDC Logo (White).png`

---

## TASK 1: Replace the TBDC Logo Site-Wide

Replace every instance of the current TBDC text logo / logo image across the entire site with the uploaded `TBDC Logo (White).png` file. This includes:
- The navbar/header logo on every page (Landing, Scaleup Founders, Startup Founders, Partners & Ecosystem, Team, Media)
- The footer logo on every page
- Any other location the TBDC logo appears

The logo should:
- Be rendered as an `<img>` tag with `alt="TBDC"` and `loading="eager"` in the navbar
- Have a max-height of `36px` on desktop, `28px` on mobile, with `width: auto` to preserve aspect ratio
- Link to the landing page (`/`) when clicked
- Use `object-fit: contain`

---

## TASK 2: Add Looping Background Videos to All Four Hero Sections

Each of the four main pages has a hero banner section at the top. Replace the current static/gradient background of each hero with a looping background video.

### Video-to-Page Mapping

| Page / Route | Video File |
|---|---|
| Landing page (`/`) | `Landing Page.mp4` |
| Scaleup Founders (`/scaleup`) | `ScaleUpFounders Page.mp4` |
| Startup Founders (`/startup`) | `Startup Founders Page.mp4` |
| Partners & Ecosystem (`/partners`) | `PartnersEcosystem Page.mp4` |

### Implementation Pattern

Create a shared `VideoHeroBackground` component (or add directly to each hero) using this structure:

```tsx
// Component: VideoHeroBackground.tsx
interface VideoHeroBackgroundProps {
  src: string;
  posterFallback?: string;
}

export function VideoHeroBackground({ src, posterFallback }: VideoHeroBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={posterFallback}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-brand-navy/60" />
    </div>
  );
}
```

### Hero Section Wrapper Requirements

For each hero section wrapper, ensure:
- The hero container has `position: relative` and `overflow: hidden`
- The `VideoHeroBackground` is the first child (behind all content)
- All hero text content has `position: relative` and `z-10` so it sits above the video and overlay
- The existing background color/gradient classes on the hero container are removed (replaced by the video)

### Per-Page Overlay Adjustments

| Page | Overlay |
|---|---|
| Landing (`/`) | `bg-brand-navy/60` — standard dark overlay |
| Scaleup Founders | `bg-brand-navy/50` mixed with a subtle gradient: `bg-gradient-to-b from-brand-navy/70 via-brand-navy/40 to-brand-navy/70` |
| Startup Founders | Same gradient as Scaleup: `bg-gradient-to-b from-brand-navy/70 via-brand-navy/40 to-brand-navy/70` |
| Partners & Ecosystem | `bg-brand-navy/65` — slightly heavier since the gold text needs more contrast against the architectural footage |

### Video Element Requirements

- `autoPlay` — starts immediately
- `loop` — seamless continuous playback
- `muted` — required for autoplay to work in all browsers
- `playsInline` — prevents fullscreen on iOS
- `preload="auto"` — buffers the video
- `object-cover` on the video element so it fills the hero regardless of viewport aspect ratio
- The video should have no visible controls

### Responsive Behavior

- Videos play on all screen sizes including mobile
- On viewports below `768px`, if performance is a concern, you may optionally add a static poster image fallback and hide the video element with `hidden md:block`, but try with video first since these are short loops

### Do NOT Change

- Any hero text content, copy, or typography
- Button styles or positions
- Navbar transparency/blur behavior
- The scroll-down chevron on the landing page
- Any GSAP animations already applied to hero elements

---

## TASK 3: Verify and Test

After implementation:
1. Confirm all four hero videos autoplay and loop seamlessly on page load
2. Confirm the dark overlay makes all text (white, teal, and gold) clearly legible over every video
3. Confirm the new TBDC logo appears correctly in all navbars and footers
4. Confirm navigation between pages loads each page's unique video
5. Confirm mobile viewports render correctly with no horizontal overflow from the video
