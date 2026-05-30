/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Mail, Send, Heart, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import Logo from './Logo';

export default function Footer() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product Platform',
      links: [
        { label: 'Platform Features', href: '#features' },
        { label: 'Creator Discovery', href: '#discovery' },
        { label: 'Active Pipeline', href: '#pipeline' },
        { label: 'ROI Estimator', href: '#calculator' },
      ],
    },
    {
      title: 'Resources Sync',
      links: [
        { label: 'FAQ Accordions', href: '#faqs' },
        { label: 'API Integrations', href: '#' },
        { label: 'Audience Demographics', href: '#' },
        { label: 'Contracting Guides', href: '#' },
      ],
    },
    {
      title: 'Trust & Privacy',
      links: [
        { label: 'No locks policy', href: '#' },
        { label: 'SLA Escrow terms', href: '#' },
        { label: 'Cancel policy', href: '#' },
        { label: 'Privacy center', href: '#' },
      ],
    },
  ];

  return (
    <footer
      id="main-app-footer"
      className="relative bg-[#0D0D16] pt-20 pb-10 px-6 border-t border-white/5 overflow-hidden"
    >
      {/* Visual neon floor glow */}
      <div className="absolute bottom-0 left-[20%] w-[60%] h-[300px] bg-[#5B2CFF]/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Foot top layout row splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Col 1 left: Brand detail and brief (4 Column) */}
          <div className="lg:col-span-4 text-left space-y-4">
            <Logo />
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-sm">
              We aggregate and democratize directory search tools, email flows, and analytics pipelines to save brands and creators from enterprise soft monopoly.
            </p>
            <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
              <Flame className="w-3.5 h-3.5 text-[#FF2D7A] shrink-0 animate-pulse" />
              <span>Saves $2,000 every single month.</span>
            </div>
          </div>

          {/* Col 2 center: Links columns lists (5 Column) */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-6 text-left">
            {footerLinks.map((col, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-xs font-bold font-mono tracking-wider text-white uppercase">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-xs text-gray-400 hover:text-[#FF2D7A] transition-colors block font-sans"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Col 3 right: Custom Newsletter Signup (3 Column) */}
          <div className="lg:col-span-3 text-left space-y-4">
            <h4 className="text-xs font-bold font-mono tracking-wider text-white uppercase flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-[#FF2D7A]" /> Subscribe to Creogrid newsletter
            </h4>
            <p className="text-[11px] text-gray-400 leading-normal">
              No sales pitches. Just 1x monthly email detailing high-retention creator indices and campaign tactics.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Submit your email info..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                disabled={subscribed}
                className="bg-white/5 border border-white/5 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-500 w-full focus:outline-none focus:border-[#5B2CFF]/50 transition-colors disabled:opacity-50"
                required
              />
              <button
                type="submit"
                disabled={subscribed}
                className="bg-[#5B2CFF] hover:brightness-110 text-white rounded-lg px-3 flex items-center justify-center transition-all cursor-pointer shadow-md disabled:bg-emerald-600/30"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] text-[#00E5FF] font-semibold flex items-center gap-1"
              >
                <span>✓ Successfully subscribed to creogrid updates!</span>
              </motion.p>
            )}
          </div>
        </div>

        {/* Footer bottom bar layout */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <p>© {currentYear} Creogrid Spot Hub. Clean SaaS Landing page templates.</p>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Crafted with meticulous design and layout</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 shrink-0" />
          </div>
        </div>
      </div>
    </footer>
  );
}
