import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe, Rocket, Landmark, ChevronDown } from 'lucide-react';
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
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.router-hero-line', { y: 40, opacity: 0, stagger: 0.08, duration: 0.9 })
        .from('.router-hero-body', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.router-hero-scroll', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handlePersonaClick = (persona: typeof personas[0]) => {
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

      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col justify-center bg-navy"
      >
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
                transition-colors inline-block animate-bounce"
                aria-label="Scroll to persona selection">
                <ChevronDown size={28} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider fromColor="#0A1628" toColor="#FAF8F5" />

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
              <button
                key={persona.id}
                onClick={() => handlePersonaClick(persona)}
                className="group card-hover bg-white rounded-2xl p-8 border border-slate-200/50
                  cursor-pointer relative overflow-hidden text-left w-full"
              >
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
              </button>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider fromColor="#FAF8F5" toColor="#0A1628" />

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

function PersonaQuiz({ navigate }: { navigate: (path: string) => void }) {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);

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

  const handleAnswer = (value: string) => {
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

  const resultMap: Record<string, { label: string; desc: string }> = {
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
