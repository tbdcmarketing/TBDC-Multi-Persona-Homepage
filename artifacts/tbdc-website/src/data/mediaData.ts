export interface MediaEntry {
  id: string;
  category: 'In the News' | 'Thought Leadership';
  type: 'Feature' | 'Interview' | 'Partnership' | 'Government' | 'Blog';
  source: string;
  date: string;
  title: string;
  description: string;
  url: string;
  image: string | null;
  featured: boolean;
}

export const mediaEntries: MediaEntry[] = [
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
    image: null,
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
