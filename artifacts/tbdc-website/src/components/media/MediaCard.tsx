import { useEffect, useRef } from 'react';
import { ArrowUpRight, Newspaper, Mic, Handshake, Landmark, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MediaEntry } from '../../data/mediaData';

gsap.registerPlugin(ScrollTrigger);

const typeIcons: Record<string, typeof Newspaper> = {
  Feature: Newspaper,
  Interview: Mic,
  Partnership: Handshake,
  Government: Landmark,
  Blog: BookOpen,
};

const categoryColors: Record<string, string> = {
  'In the News': 'bg-teal text-white',
  'Thought Leadership': 'bg-navy text-white',
};

export default function MediaCard({ entry, index, variant = 'default' }: { entry: MediaEntry; index: number; variant?: 'default' | 'featured' }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

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
          <div className="absolute top-4 right-4 opacity-[0.06]">
            <Icon size={80} className="text-teal" />
          </div>
        </div>

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

  return (
    <a
      ref={cardRef}
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group card-hover bg-white rounded-2xl p-6 border border-slate-200/50
                 flex flex-col h-full relative overflow-hidden"
    >
      <div className="absolute top-3 right-3 opacity-[0.04] pointer-events-none">
        <Icon size={60} className="text-charcoal" />
      </div>

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

      <h3
        className="text-lg font-bold text-charcoal leading-tight mb-3
                   group-hover:text-teal transition-colors duration-300"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {entry.title}
      </h3>

      <p
        className="text-sm text-charcoal/60 leading-relaxed mb-6 flex-grow line-clamp-3"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {entry.description}
      </p>

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

      <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-teal/0 group-hover:bg-teal/10
                      flex items-center justify-center transition-all duration-300">
        <ArrowUpRight size={16} className="text-teal opacity-0 group-hover:opacity-100
                                            transition-opacity duration-300" />
      </div>
    </a>
  );
}
