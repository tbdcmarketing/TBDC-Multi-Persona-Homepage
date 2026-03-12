import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, MapPin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-navy rounded-t-[3rem] relative pt-16 md:pt-20 pb-6">
      <div className="absolute top-0 left-0 right-0 h-[1px] rounded-t-[3rem] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-teal to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-14">
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}>
              TBDC
            </h3>
            <p className="text-white/50 text-sm mb-4"
              style={{ fontFamily: 'var(--font-body)' }}>
              Toronto Business Development Centre
            </p>
            <div className="flex items-start gap-2 text-white/40 text-sm">
              <MapPin size={16} className="shrink-0 mt-0.5" />
              <span style={{ fontFamily: 'var(--font-body)' }}>
                111 Peter St, 9th Floor, Toronto ON M5V 2H1
              </span>
            </div>
            <p className="text-white/40 text-sm mt-2" style={{ fontFamily: 'var(--font-body)' }}>
              (416) 345-9437
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}>
              Programs
            </h4>
            <ul className="space-y-2">
              {['Horizon', 'Pivot', 'Land & Expand', 'Business Inc.', 'Biz Futures'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/60 hover:text-teal text-sm transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}>
              For
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Scaleup Founders', to: '/scaleup' },
                { label: 'Startup Founders', to: '/startup' },
                { label: 'Partners & Ecosystem', to: '/partners' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-white/60 hover:text-teal text-sm transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}>
              Stay Connected
            </h4>
            <div className="flex mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address for newsletter"
                className="flex-1 bg-transparent border-b border-white/20 px-2 py-2.5 text-sm
                  text-white placeholder:text-white/30 focus:outline-none focus:border-teal transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              />
              <button className="bg-teal hover:bg-teal-dark text-white w-10 h-10 rounded-full
                flex items-center justify-center ml-3 transition-colors shrink-0"
                aria-label="Subscribe">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row
          items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-white/30 text-xs"
            style={{ fontFamily: 'var(--font-body)' }}>
            <span>&copy; 2025 Toronto Business Development Centre. All rights reserved.</span>
            <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms of Use</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal" />
            </span>
            <span className="text-white/40 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
              tbdc.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
