import { ArrowRight } from 'lucide-react';

export default function PartnersCTA() {
  return (
    <section id="partner-cta" className="bg-navy py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-16 text-center">
        <p className="text-sm font-bold uppercase tracking-wider mb-3"
          style={{ fontFamily: 'var(--font-mono)', color: '#D4A843' }}>
          Let's work together
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}>
          The best partnerships{' '}
          <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#D4A843' }}>
            start with a conversation.
          </span>
        </h2>
        <p className="text-white/60 mb-10 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}>
          Whether you represent a government body, enterprise, investor group, or media outlet — we'd love to explore how TBDC can support your mandate.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#"
            className="text-white font-semibold px-8 py-3
              rounded-full text-sm inline-flex items-center gap-2 transition-opacity hover:opacity-90"
            style={{ fontFamily: 'var(--font-body)', backgroundColor: '#D4A843' }}>
            Contact Our Partnerships Team <ArrowRight size={16} />
          </a>
          <a href="#"
            className="border border-white/30 text-white font-semibold px-8 py-3
              rounded-full text-sm inline-flex items-center gap-2 hover:bg-white/10 transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}>
            Download Partnership Overview
          </a>
        </div>
      </div>
    </section>
  );
}
