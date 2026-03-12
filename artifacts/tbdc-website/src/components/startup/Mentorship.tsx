import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, MessageSquare, BarChart3, Network } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Users, title: '1:1 Mentor Matching', desc: 'Paired with a mentor who\'s built what you\'re building — in your industry, at your stage.' },
  { icon: MessageSquare, title: 'Peer Cohort Sessions', desc: 'Learn alongside other founders. Shared challenges, honest feedback, real accountability.' },
  { icon: BarChart3, title: 'Milestone-Driven', desc: 'Not open-ended conversations. Every session has deliverables and deadlines that matter.' },
  { icon: Network, title: 'Network Access', desc: 'Your mentor opens their Rolodex. Introductions to buyers, investors, and operators who can help.' },
];

export default function Mentorship() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ms-card', {
        scrollTrigger: { trigger: '.ms-card', start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="mentorship" ref={sectionRef} className="bg-warm-white py-20 md:py-28 scroll-mt-[104px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Mentorship
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Not advice.{' '}
            <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              Accountability.
            </span>
          </h2>
          <p className="text-charcoal/70 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}>
            Every TBDC founder gets paired with a mentor who's actually built something. Not a consultant. Not a coach. A founder or operator who understands what you're going through — and knows how to help you move faster.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i}
              className="ms-card card-hover bg-white rounded-2xl p-8 border border-slate-200/50 text-center">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5 mx-auto">
                <f.icon size={24} className="text-teal" />
              </div>
              <h3 className="text-base font-bold text-charcoal mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {f.title}
              </h3>
              <p className="text-sm text-charcoal/70" style={{ fontFamily: 'var(--font-body)' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
