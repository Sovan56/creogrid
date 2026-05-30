/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, ArrowRight, ShieldCheck, Play, Heart, Users, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden flex flex-col justify-center bg-brand-bg bg-grid"
    >
      {/* Background gradients and floating bubbles */}
      <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse duration-[8s] -z-10" />
      <div className="absolute bottom-[15%] right-[10%] w-[350px] h-[350px] bg-brand-alt/10 rounded-full blur-[120px] -z-10 animate-pulse duration-[12s]" />
      <div className="absolute top-[40%] right-[30%] w-[200px] h-[200px] bg-brand-accent/10 rounded-full blur-[90px] -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column text details */}
        <div className="lg:col-span-7 flex flex-col text-left space-y-6">
          {/* Tag badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex self-start items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-spin duration-[4s]" />
            <span className="text-xs font-mono font-bold text-indigo-200 tracking-wider uppercase">
              The New Free-To-Use Industry Standard
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-[1.08] text-white tracking-tight"
          >
            Run influencer campaigns that <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-primary to-brand-alt">convert</span> — without $24K platform fees.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-xl"
          >
            Say goodbye to overpriced agency retainers and enterprise software lock-ins. InfluenceFlow aggregates millions of creators, automates pitch sequences, and tracks campaign revenues in one beautiful flow.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#discovery"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-alt hover:brightness-110 transition-all font-medium text-white shadow-[0_0_25px_rgba(99,102,241,0.35)] flex items-center gap-2 group"
            >
              <span>Explore Active Creators</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </a>

            <a
              href="#calculator"
              className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all font-medium text-white flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-brand-accent fill-brand-accent" />
              <span>Try ROI Estimator</span>
            </a>
          </motion.div>

          {/* Features check list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 pt-4 border-t border-white/5 text-xs text-gray-400 font-mono"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-accent shrink-0" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Cancel Anytime Subscription</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-accent shrink-0" />
              <span>150M+ Creators Index</span>
            </div>
          </motion.div>
        </div>

        {/* Right column dashboard design card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, type: 'spring', stiffness: 40 }}
          className="lg:col-span-5 relative"
        >
          {/* Glow backdrop behind the card */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-alt/20 rounded-3xl blur-2xl" />

          {/* Main Glass Dashboard Card Preview */}
          <div className="relative glass-panel rounded-2xl overflow-hidden p-6 shadow-2xl border-white/10">
            {/* Dashboard header bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="text-xs text-gray-400 font-mono ml-2">influenceflow.dashboard</span>
              </div>
              <div className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono text-indigo-300">
                ● LIVE ANALYTICS
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">Reach</span>
                <span className="text-base font-semibold text-white mt-1">4.2M</span>
                <span className="text-[9px] text-brand-success font-mono mt-0.5">+14% vs last week</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">Conversion</span>
                <span className="text-base font-semibold text-white mt-1">5.8%</span>
                <span className="text-[9px] text-brand-success font-mono mt-0.5">+1.2% click-thru</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">ROAS</span>
                <span className="text-base font-semibold text-brand-accent mt-1">4.85x</span>
                <span className="text-[9px] text-gray-400 font-mono mt-0.5">Average return</span>
              </div>
            </div>

            {/* Simulated Live Campaign Feed Card */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1 flex justify-between">
                <span>Active Creators Flow</span>
                <span className="text-brand-accent">3 Online</span>
              </div>

              {/* Creator 1 */}
              <div className="p-3 bg-indigo-950/20 rounded-xl border border-indigo-500/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-brand-accent/30">
                    <img
                      src="https://picsum.photos/seed/influencer_top/100/100"
                      alt="Creator Avatar"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white">Seraphina Lin</p>
                    <p className="text-[10px] text-gray-400 font-mono">TikTok • 245K • Lifestyle</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-brand-success font-mono">
                  <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                  <span>6.8% ER</span>
                </div>
              </div>

              {/* Creator 2 */}
              <div className="p-3 bg-indigo-950/20 rounded-xl border border-pink-500/10 flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-pink-500/30">
                    <img
                      src="https://picsum.photos/seed/influencer_mid/100/100"
                      alt="Creator Avatar"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white">Chloe Rivers</p>
                    <p className="text-[10px] text-gray-400 font-mono">Insta • 1.2M • Health & Fit</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-brand-success font-mono">
                  <Users className="w-3.5 h-3.5 text-brand-accent" />
                  <span>5.1% ER</span>
                </div>
              </div>

              {/* Mini visual SVG graph */}
              <div className="pt-3 border-t border-white/5">
                <p className="text-[10px] font-mono text-gray-400 text-left mb-2 uppercase">Real-Time Revenue Campaign Flow</p>
                <div className="relative h-20 w-full flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="glowGrad" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 18 Q 15 12 30 14 T 60 7 T 90 2 L 100 1 L 100 20 L 0 20 Z"
                      fill="url(#glowGrad)"
                    />
                    <path
                      d="M 0 18 Q 15 12 30 14 T 60 7 T 90 2 L 100 1"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="1"
                    />
                  </svg>
                  {/* Indicator nodes */}
                  <span className="absolute bottom-16 right-5 w-2 h-2 rounded-full bg-brand-accent animate-ping" />
                  <span className="absolute bottom-16 right-5 w-2 h-2 rounded-full bg-brand-accent" />
                  <div className="absolute right-9 bottom-12 px-1.5 py-0.5 rounded bg-brand-accent text-[#07050d] text-[8px] font-bold font-mono">
                    $18,420
                  </div>
                </div>
                <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 mt-2">
                  <span>Mon (Launch)</span>
                  <span>Wed</span>
                  <span>Today (Sync)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floaters decoration */}
          <div className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-[#0F0C1B] border border-white/10 flex items-center gap-2 shadow-2xl">
            <div className="w-8 h-8 rounded bg-brand-accent/20 flex items-center justify-center text-brand-accent font-bold">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white">Avg. Saved</p>
              <p className="text-[10px] text-brand-success font-mono font-bold">$2,000/month</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
