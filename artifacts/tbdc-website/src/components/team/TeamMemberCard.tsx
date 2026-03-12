import { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { TeamMember } from '../../data/teamData';

gsap.registerPlugin(ScrollTrigger);

export default function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
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
        delay: (index % 4) * 0.1,
        ease: 'power3.out',
      });
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  const handleClick = () => {
    if (!member.linkedin) return;
    if (isActive) {
      window.open(member.linkedin, '_blank', 'noopener,noreferrer');
    } else {
      setIsActive(true);
    }
  };

  useEffect(() => {
    if (!isActive) return;
    const handleOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, [isActive]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden cursor-pointer card-hover"
      onClick={handleClick}
      onKeyDown={member.linkedin ? handleKeyDown : undefined}
      role={member.linkedin ? 'link' : undefined}
      tabIndex={member.linkedin ? 0 : undefined}
      aria-label={member.linkedin ? `View ${member.name} on LinkedIn` : undefined}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-700
                     group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent" />

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
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 hidden md:block"
              aria-label={`View ${member.name} on LinkedIn`}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

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
