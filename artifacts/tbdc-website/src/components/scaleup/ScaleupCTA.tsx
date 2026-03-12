import { ArrowRight } from 'lucide-react';

export default function ScaleupCTA() {
  return (
    <section id="apply" className="bg-navy py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-16 text-center">
        <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
          style={{ fontFamily: 'var(--font-mono)' }}>
          Ready?
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}>
          Your market entry starts{' '}
          <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            with one conversation.
          </span>
        </h2>
        <p className="text-white/60 mb-10 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}>
          Apply to Horizon (new to North America) or Pivot (re-entering or recalibrating). Or book a discovery call and we'll help you decide.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#"
            className="bg-teal hover:bg-teal-dark text-white font-semibold px-8 py-3
              rounded-full text-sm inline-flex items-center gap-2 transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}>
            Apply to Horizon or Pivot <ArrowRight size={16} />
          </a>
          <a href="#"
            className="border border-white/30 text-white font-semibold px-8 py-3
              rounded-full text-sm inline-flex items-center gap-2 hover:bg-white/10 transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}>
            Book a Discovery Call
          </a>
        </div>
      </div>
    </section>
  );
}
