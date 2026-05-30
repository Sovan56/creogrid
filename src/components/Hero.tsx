/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Play, Heart, Users, BarChart3, Instagram, Youtube, Compass } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useMotionSettings } from './MotionContext';
import Reveal from './Reveal';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionSettings();

  // Initialize scroll tracking for parallax effects
  const { scrollY } = useScroll();

  // Create different movement rates for layered elements
  const scrollY1 = useTransform(scrollY, [0, 800], [0, -140]);
  const scrollY2 = useTransform(scrollY, [0, 800], [0, 70]);
  const scrollY3 = useTransform(scrollY, [0, 800], [0, -50]);
  const scrollY4 = useTransform(scrollY, [0, 800], [0, 110]);

  // Smooth out the parallax using springs (safely deactivated via conditional styling)
  const springConfig = { stiffness: 180, damping: 45, mass: 0.8 };
  const yParallaxBackground = useSpring(scrollY1, springConfig);
  const yParallaxForegroundFast = useSpring(scrollY2, springConfig);
  const yParallaxForegroundMid = useSpring(scrollY3, springConfig);
  const yParallaxForegroundSlow = useSpring(scrollY4, springConfig);

  // Creative brand partnership logos list for marquee strip
  const PARTNER_LOGOS = [
    { brand: 'LUMI SKIN', niche: 'Beauty' },
    { brand: 'VELVET FIT', niche: 'Athleisure' },
    { brand: 'GLOW LAB', niche: 'Cosmetics' },
    { brand: 'SOLIS APPAREL', niche: 'Fashion' },
    { brand: 'APEX NUTRITION', niche: 'Wellness' },
    { brand: 'FROST BAR', niche: 'Beverages' },
    { brand: 'KINETIC PLAY', niche: 'Lifestyle' },
  ];

  // Tripled logos array for continuous infinite loop effect
  const marqueeLogos = [...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative min-h-screen pt-32 pb-12 px-6 overflow-hidden flex flex-col justify-center bg-[#0D0D16] bg-grid"
    >
      {/* Background orbs with parallax translation */}
      <motion.div
        style={{ y: reducedMotion ? 0 : yParallaxBackground }}
        className="absolute top-[8%] left-[15%] w-[480px] h-[480px] bg-[#5B2CFF]/8 rounded-full blur-[110px] -z-10"
      />
      <motion.div
        style={{ y: reducedMotion ? 0 : yParallaxForegroundMid }}
        className="absolute bottom-[22%] right-[8%] w-[400px] h-[400px] bg-[#FF2D7A]/8 rounded-full blur-[130px] -z-10"
      />
      <motion.div
        style={{ y: reducedMotion ? 0 : yParallaxForegroundSlow }}
        className="absolute top-[35%] right-[25%] w-[250px] h-[250px] bg-[#FF9A1F]/6 rounded-full blur-[100px] -z-10"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        {/* Left column text details */}
        <div className="lg:col-span-7 flex flex-col text-left space-y-7 z-10">
          {/* Tag badge with micro animated sparkle icon */}
          <Reveal direction="down" duration={0.8}>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5B2CFF]/10 border border-[#5B2CFF]/25 shadow-[0_0_15px_rgba(91,44,255,0.08)]">
              <Sparkles className={`w-3.5 h-3.5 text-[#FF2D7A] ${!reducedMotion ? 'animate-spin duration-[5s]' : ''}`} />
              <span className="text-[10px] font-mono font-bold text-indigo-200 tracking-wider uppercase">
                The New Free-To-Use Industry Standard
              </span>
            </div>
          </Reveal>

          {/* Headline heading with scroll reveal */}
          <Reveal direction="up" duration={0.8} delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-[1.08] text-white tracking-tight">
              Run influencer campaigns that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] via-[#A23CFF] to-[#5B2CFF] drop-shadow-[0_0_15px_rgba(162,60,255,0.1)]">convert</span> — without $24K platform fees.
            </h1>
          </Reveal>

          {/* Subtitle description with scroll reveal */}
          <Reveal direction="up" duration={0.8} delay={0.2}>
            <p className="text-gray-300 text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-xl">
              Say goodbye to overpriced agency retainers and enterprise software lock-ins. Creogrid aggregates millions of creators, automating pitch sequences and tracking campaign revenues in one beautiful flow.
            </p>
          </Reveal>

          {/* CTA Buttons with reveal */}
          <Reveal direction="up" duration={0.8} delay={0.3}>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#discovery"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#5B2CFF] to-[#A23CFF] hover:brightness-110 hover:scale-[1.02] transition-all font-medium text-white shadow-[0_0_25px_rgba(91,44,255,0.35)] flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Active Creators</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a
                href="#calculator"
                className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all font-medium text-white flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#FF9A1F] fill-[#FF9A1F]" />
                <span>Try ROI Estimator</span>
              </a>
            </div>
          </Reveal>

          {/* Features check list with delay reveal */}
          <Reveal direction="up" duration={1} delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-6 pt-5 border-t border-white/5 text-xs text-gray-400 font-mono">
              <div className="flex items-center gap-1.5 group">
                <ShieldCheck className="w-4 h-4 text-[#FF2D7A] group-hover:text-[#FF2D7A] transition-colors shrink-0" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5 group">
                <ShieldCheck className="w-4 h-4 text-[#FF2D7A] shrink-0" />
                <span>Cancel Anytime Subscription</span>
              </div>
              <div className="flex items-center gap-1.5 group">
                <ShieldCheck className="w-4 h-4 text-[#FF2D7A] shrink-0" />
                <span>150M+ Creators Index</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right column with interactive mockup elements AND floating creator college parallax */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0">
          
          {/* Parallax Layer 1: Left conversion node badge */}
          <motion.div
            style={{ y: reducedMotion ? 0 : yParallaxForegroundMid }}
            className="absolute -left-10 top-10 p-3.5 rounded-xl bg-[#0D0D16]/95 border border-white/10 flex items-center gap-3 shadow-2xl backdrop-blur z-20 pointer-events-none hover:border-[#FF2D7A]/50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FF2D7A]/10 flex items-center justify-center text-[#FF2D7A]">
              <Compass className="w-4 h-4" />
            </div>
            <div className="text-left font-sans">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider leading-none">Best Niche</p>
              <p className="text-xs font-bold text-white mt-1 leading-none">Skincare & Beauty</p>
            </div>
          </motion.div>

          {/* Parallax Layer 2: Top Right high-engagement creator badge */}
          <motion.div
            style={{ y: reducedMotion ? 0 : yParallaxForegroundFast }}
            className="absolute -right-6 -top-12 p-3.5 rounded-xl bg-[#0D0D16]/95 border border-white/10 flex items-center gap-3 shadow-2xl backdrop-blur z-20 pointer-events-none hover:border-[#A23CFF]/50 transition-colors"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#A23CFF]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Creator avatar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#0D0D16]" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-mono text-[#A23CFF] uppercase leading-none font-bold">● High Engagement</p>
              <p className="text-xs font-bold text-white mt-1 leading-none">Maya Styles</p>
            </div>
          </motion.div>

          {/* Parallax Layer 3: Secondary creator follower bubble */}
          <motion.div
            style={{ y: reducedMotion ? 0 : yParallaxForegroundSlow }}
            className="absolute -right-12 bottom-1/4 p-3 rounded-xl bg-[#0D0D16]/90 border border-white/5 flex items-center gap-2.5 shadow-xl backdrop-blur z-20 pointer-events-none hover:border-[#FF9A1F]/50 transition-colors"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#FF9A1F]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Creator avatar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-left font-mono">
              <p className="text-[9px] text-gray-400 uppercase leading-none">Insta • Lifestyle</p>
              <p className="text-[10px] font-bold text-[#FF9A1F] mt-0.5 leading-none">820K Followers</p>
            </div>
          </motion.div>

          {/* Glow backdrop behind the card */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#5B2CFF]/20 to-[#FF2D7A]/20 rounded-3xl blur-2xl -z-10" />

          {/* Main Glass Dashboard Card Preview */}
          <Reveal direction="none" duration={1} delay={0.2} className="relative">
            <div className="relative glass-panel rounded-2xl overflow-hidden p-6 shadow-2xl border-white/10">
              {/* Dashboard header bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/60" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="text-xs text-gray-400 font-mono ml-2">creogrid.dashboard</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-[#5B2CFF]/10 border border-[#5B2CFF]/20 text-[10px] font-mono text-indigo-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span>● LIVE ANALYTICS</span>
                </div>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col hover:border-[#5B2CFF]/30 transition-colors">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">Reach</span>
                  <span className="text-base font-semibold text-white mt-1">4.2M</span>
                  <span className="text-[9px] text-emerald-400 font-mono mt-0.5">+14% vs last wk</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col hover:border-[#FF2D7A]/30 transition-colors">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">Conversion</span>
                  <span className="text-base font-semibold text-white mt-1">5.8%</span>
                  <span className="text-[9px] text-emerald-400 font-mono mt-0.5">+1.2% click</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col hover:border-[#FF9A1F]/30 transition-colors">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">ROAS</span>
                  <span className="text-base font-semibold text-[#FF9A1F] mt-1">4.85x</span>
                  <span className="text-[9px] text-gray-400 font-mono mt-0.5">Avg. return</span>
                </div>
              </div>

              {/* Simulated Live Campaign Feed Card */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1 flex justify-between">
                  <span>Active Creators Flow</span>
                  <span className="text-[#FF2D7A] font-bold">★ Selected Spot</span>
                </div>

                {/* Creator 1 */}
                <div className="p-3 bg-[#141424]/40 rounded-xl border border-[#5B2CFF]/10 flex items-center justify-between hover:bg-[#141424]/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#FF2D7A]/30">
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80"
                        alt="Seraphina Lin"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left font-sans">
                      <p className="text-xs font-semibold text-white">Seraphina Lin</p>
                      <p className="text-[10px] text-gray-400 font-mono">TikTok • 245K • Beauty</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <Heart className="w-3 h-3 text-[#FF2D7A] fill-[#FF2D7A]" />
                    <span>6.8% ER</span>
                  </div>
                </div>

                {/* Creator 2 */}
                <div className="p-3 bg-[#141424]/40 rounded-xl border border-[#FF2D7A]/10 flex items-center justify-between hover:bg-[#141424]/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#FF2D7A]/30">
                      <img
                        src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&h=100&q=80"
                        alt="Chloe Rivers"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover animate-pulse"
                      />
                    </div>
                    <div className="text-left font-sans">
                      <p className="text-xs font-semibold text-white">Chloe Rivers</p>
                      <p className="text-[10px] text-gray-400 font-mono">Insta • 1.2M • Health</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <Users className="w-3 h-3 text-[#FF9A1F]" />
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
                          <stop offset="0%" stopColor="#5B2CFF" stopOpacity="0.05" />
                          <stop offset="100%" stopColor="#FF2D7A" stopOpacity="0.3" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 18 Q 15 12 30 14 T 60 7 T 90 2 L 100 1 L 100 20 L 0 20 Z"
                        fill="url(#glowGrad)"
                      />
                      <path
                        d="M 0 18 Q 15 12 30 14 T 60 7 T 90 2 L 100 1"
                        fill="none"
                        stroke="#FF2D7A"
                        strokeWidth="1.2"
                      />
                    </svg>
                    {/* Indicator nodes */}
                    <span className="absolute bottom-16 right-5 w-2 h-2 rounded-full bg-[#FF9A1F] animate-ping" />
                    <span className="absolute bottom-16 right-5 w-2 h-2 rounded-full bg-[#FF9A1F]" />
                    <div className="absolute right-9 bottom-12 px-1.5 py-0.5 rounded bg-[#FF9A1F] text-[#0D0D16] text-[8px] font-bold font-mono">
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
          </Reveal>

          {/* Floaters decoration */}
          <motion.div
            style={{ y: reducedMotion ? 0 : yParallaxForegroundMid }}
            className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-[#0D0D16]/90 border border-white/10 flex items-center gap-2.5 shadow-2xl backdrop-blur"
          >
            <div className="w-8 h-8 rounded bg-[#FF9A1F]/20 flex items-center justify-center text-[#FF9A1F] font-bold">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div className="text-left font-sans">
              <p className="text-[10px] text-gray-400 leading-none">Avg. Weekly Saved</p>
              <p className="text-sm text-emerald-400 font-mono font-bold mt-1 leading-none">$2,000 / month</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee partner brand strip with fade overlays (Cinematic marquee) */}
      <div className="mt-20 relative w-full overflow-hidden py-6 border-t border-b border-white/5 bg-[#0D0D16]/30 backdrop-blur-sm">
        {/* Deep shadows fade masking over both ends */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#0D0D16] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#0D0D16] to-transparent z-10 pointer-events-none" />

        {/* Floating animated track sliding horizontally */}
        <motion.div
          animate={reducedMotion ? {} : { x: [0, -700] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            },
          }}
          className="flex whitespace-nowrap gap-12 text-gray-400/70 items-center w-max"
        >
          {marqueeLogos.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 select-none">
              <div className="w-2 h-2 rounded bg-gradient-to-tr from-[#FF2D7A] to-[#5B2CFF]" />
              <span className="font-display font-semibold text-sm md:text-base text-white/50 tracking-wider hover:text-white transition-colors duration-200">
                {item.brand}
              </span>
              <span className="text-[10px] font-mono uppercase text-[#A23CFF] bg-[#A23CFF]/5 px-2 py-0.5 rounded border border-[#A23CFF]/10">
                {item.niche}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
