import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamMembers } from '../../data/teamData';
import TeamMemberCard from './TeamMemberCard';

gsap.registerPlugin(ScrollTrigger);

export default function TeamGrid() {
  const sectionRef = useRef<HTMLElement>(null);

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

  const leadership = teamMembers.slice(0, 4);
  const team = teamMembers.slice(4);

  return (
    <section ref={sectionRef} className="bg-warm-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
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

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-20 md:mb-28">
          {leadership.map((member, i) => (
            <TeamMemberCard key={member.name} member={member} index={i} />
          ))}
        </div>

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <TeamMemberCard key={member.name} member={member} index={i + 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
