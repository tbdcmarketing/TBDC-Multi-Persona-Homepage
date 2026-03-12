import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mediaEntries } from '../../data/mediaData';
import MediaCard from './MediaCard';

gsap.registerPlugin(ScrollTrigger);

export default function MediaFeatured() {
  const sectionRef = useRef<HTMLElement>(null);
  const featured = mediaEntries.filter((e) => e.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.media-featured-header', {
        scrollTrigger: {
          trigger: '.media-featured-header',
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

  return (
    <section ref={sectionRef} className="bg-warm-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="media-featured-header text-center mb-14">
          <p
            className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Featured Coverage
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Making{' '}
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Headlines</span>
          </h2>
        </div>

        <div className="space-y-8">
          {featured.map((entry, i) => (
            <MediaCard key={entry.id} entry={entry} index={i} variant="featured" />
          ))}
        </div>
      </div>
    </section>
  );
}
