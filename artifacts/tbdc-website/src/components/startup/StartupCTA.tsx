import { ArrowRight } from 'lucide-react';

export default function StartupCTA() {
  return (
    <section id="apply" className="bg-warm-white py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-16 text-center">
        <p className="text-teal text-sm font-bold uppercase tracking-wider mb-3"
          style={{ fontFamily: 'var(--font-mono)' }}>
          Ready to start?
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}>
          Your first step is{' '}
          <span className="text-teal" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            showing up.
          </span>
        </h2>
        <p className="text-charcoal/60 mb-10 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}>
          Find the program that fits your stage. Apply in minutes. We'll take it from there.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#"
            className="bg-teal hover:bg-teal-dark text-white font-semibold px-8 py-3
              rounded-full text-sm inline-flex items-center gap-2 transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}>
            Apply Now <ArrowRight size={16} />
          </a>
          <a href="#"
            className="border border-charcoal/30 text-charcoal font-semibold px-8 py-3
              rounded-full text-sm inline-flex items-center gap-2 hover:bg-charcoal/5 transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}>
            Talk to an Advisor
          </a>
        </div>
      </div>
    </section>
  );
}
