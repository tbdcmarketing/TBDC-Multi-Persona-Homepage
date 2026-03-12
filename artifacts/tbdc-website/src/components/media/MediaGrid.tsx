import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mediaEntries } from '../../data/mediaData';
import MediaCard from './MediaCard';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'In the News', 'Thought Leadership'] as const;

export default function MediaGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const nonFeatured = mediaEntries.filter((e) => !e.featured);
  const filtered =
    activeFilter === 'All'
      ? nonFeatured
      : nonFeatured.filter((e) => e.category === activeFilter);

  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
