export const GLOBAL_LINKS = [
  { label: 'Scaleup Founders', href: '/scaleup' },
  { label: 'Startup Founders', href: '/startup' },
  { label: 'Partners', href: '/partners' },
  { label: 'Our Team', href: '/team' },
  { label: 'Media', href: '/media' },
];

export const PERSONA_ROUTES = ['/scaleup', '/startup', '/partners'];

export interface ContextualLink {
  label: string;
  anchor: string;
}

export interface ContextualConfig {
  links: ContextualLink[];
  cta: { label: string; href: string };
  ctaVariant: 'teal' | 'gold';
}

export const CONTEXTUAL_NAV_CONFIG: Record<string, ContextualConfig> = {
  '/scaleup': {
    links: [
      { label: 'Our Approach', anchor: 'approach' },
      { label: 'Programs', anchor: 'programs' },
      { label: 'Results', anchor: 'results' },
      { label: 'Why Canada', anchor: 'why-canada' },
    ],
    cta: { label: 'Apply to Horizon or Pivot', href: '#apply' },
    ctaVariant: 'teal',
  },
  '/startup': {
    links: [
      { label: 'Programs', anchor: 'programs' },
      { label: 'Mentorship', anchor: 'mentorship' },
      { label: 'Track Record', anchor: 'track-record' },
    ],
    cta: { label: 'Find Your Program', href: '#apply' },
    ctaVariant: 'teal',
  },
  '/partners': {
    links: [
      { label: 'Ecosystem', anchor: 'ecosystem' },
      { label: 'Partner With Us', anchor: 'partner-with-us' },
      { label: 'Government', anchor: 'government' },
    ],
    cta: { label: 'Partner With TBDC', href: '#partner-cta' },
    ctaVariant: 'gold',
  },
};
