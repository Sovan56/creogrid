/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { XCircle, CheckCircle2, ShieldX, TrendingDown, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';
import { useMotionSettings } from './MotionContext';
import Reveal from './Reveal';

export default function CompareSection() {
  const { reducedMotion } = useMotionSettings();

  const oldWay = [
    { text: 'Forced annual lock-ins of $12K - $24K/year', icon: ShieldX },
    { text: 'Manual spreadsheets, email threads, and delays', icon: XCircle },
    { text: 'Limited search queries per month (paywalls)', icon: XCircle },
    { text: 'Slow, nerve-wracking budget negotiations', icon: DollarSign },
    { text: 'Delayed tracking updates (1-2 weeks post-pub)', icon: TrendingDown },
  ];

  const creogridWay = [
    { text: '100% Free basic plan, easily upgrade to Pro for $49/mo', icon: CheckCircle2 },
    { text: 'Automated outreach, brief tracking, and contracts in one dashboard', icon: CheckCircle2 },
    { text: 'Unlimited, real-time searches across 150M+ creators', icon: CheckCircle2 },
    { text: 'Transparent escrow agreements and automated creator payouts', icon: CheckCircle2 },
    { text: 'Instant live posts integration and real-time ROAS counters', icon: CheckCircle2 },
  ];

  return (
    <section
      id="features"
      className="relative py-24 px-6 overflow-hidden bg-[#0D0D16] border-t border-white/5"
    >
      {/* Background soft lighting details */}
      <div className="absolute top-[30%] left-[5%] w-[400px] h-[400px] bg-[#FF2D7A]/4 rounded-full blur-[110px] -z-10" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-[#5B2CFF]/4 rounded-full blur-[110px] -z-10" />

      <div className="max-w-5xl mx-auto w-full text-center">
        {/* Section title wrapped in Scroll Reveal */}
        <Reveal direction="up" className="space-y-4 mb-16">
          <span className="text-xs font-mono font-bold tracking-wider text-[#FF2D7A] uppercase bg-[#5B2CFF]/10 px-3 py-1 rounded-full border border-[#5B2CFF]/25">
            THE HIDDEN COST OF "ENTERPRISE" PLATFORMS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight">
            Sound familiar? Let's check the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#A23CFF]">numbers</span>.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Enterprise influencer platforms lock small-to-mid brands into expensive contract retainers before they even hire their first creator. We rebuilt the flow for simplicity.
          </p>
        </Reveal>

        {/* Dynamic Dual Grid Card Panel wrapped in Stagger reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4 text-left">
          
          {/* Section 1: The Old Enterprise Way */}
          <Reveal direction="left" delay={0.1} className="flex">
            <motion.div
              whileHover={reducedMotion ? {} : { y: -5, borderColor: 'rgba(239, 68, 68, 0.4)' }}
              className="p-6 md:p-8 w-full rounded-2xl bg-red-950/10 border border-red-500/20 relative overflow-hidden flex flex-col justify-between transition-colors duration-300"
            >
              {/* Soft decorative glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold tracking-widest text-red-500 uppercase">
                      LEGACY COMPILATIONS
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-white">
                      The $24K Enterprise Plan
                    </h3>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 font-mono">
                    ❌ OVERPRICED
                  </div>
                </div>

                <p className="text-xs md:text-sm text-gray-400 leading-relaxed mb-4">
                  Enterprise systems rely heavily on top-heavy agency fees, outbound sales team markups, and artificial feature paywalls to force users into annual commitments.
                </p>

                {/* Old way bulletins list */}
                <ul className="space-y-4">
                  {oldWay.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <item.icon className="w-5 h-5 text-red-500/80 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300/90">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-white/5 mt-8 flex flex-col gap-1">
                <span className="text-xs font-mono text-gray-500">Average cost of onboarding</span>
                <span className="text-2xl font-bold font-mono text-red-400">$2,000 / month</span>
              </div>
            </motion.div>
          </Reveal>

          {/* Section 2: Pure Creogrid */}
          <Reveal direction="right" delay={0.2} className="flex">
            <motion.div
              whileHover={reducedMotion ? {} : { y: -5, borderColor: 'rgba(91, 44, 255, 0.5)', boxShadow: '0 0 30px rgba(91, 44, 255, 0.15)' }}
              className="p-6 md:p-8 w-full rounded-2xl bg-indigo-950/15 border border-[#5B2CFF]/30 relative overflow-hidden flex flex-col justify-between transition-colors duration-300"
            >
              {/* Accent neon highlight flare */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF9A1F]/5 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#FF2D7A] uppercase">
                      THE CREOGRID STANDARD
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-white">
                      A Clean, Transparent Flow
                    </h3>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-xs font-bold text-[#00E5FF] font-mono">
                    ✓ DEMOCRATIC
                  </div>
                </div>

                <p className="text-xs md:text-sm text-gray-400 leading-relaxed mb-4">
                  We believe in self-serve software. Free tools for basic directory searches, automated campaign outlines, and direct integrations with creators. Try it risk-free.
                </p>

                {/* Our way bulletins list */}
                <ul className="space-y-4 font-normal">
                  {creogridWay.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <item.icon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-200">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-[#5B2CFF]/10 mt-8 flex flex-col gap-1">
                <span className="text-xs font-mono text-[#FF9A1F]">Basic search is free, Pro scale is</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-mono text-white">$49 / month</span>
                  <span className="text-xs text-[#00E5FF] font-bold font-mono">(Saves $23.4K/yr!)</span>
                </div>
              </div>
            </motion.div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
