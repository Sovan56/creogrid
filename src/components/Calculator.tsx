/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { DollarSign, Percent, Eye, ShoppingCart, Info, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function Calculator() {
  const [budget, setBudget] = useState(5000); // Default $5,000
  const [platform, setPlatform] = useState<'tiktok' | 'instagram' | 'youtube'>('tiktok');
  const [niche, setNiche] = useState<string>('Fashion');

  // Multiplier variables corresponding to selected filters
  const getPlatformMultipliers = () => {
    switch (platform) {
      case 'tiktok':
        return { views: 22, engagement: 6.8, conversion: 0.015, roas: 3.8 };
      case 'instagram':
        return { views: 14, engagement: 4.8, conversion: 0.024, roas: 4.5 };
      case 'youtube':
        return { views: 8, engagement: 3.5, conversion: 0.038, roas: 5.2 };
    }
  };

  const getNicheMultiplier = () => {
    switch (niche) {
      case 'Fitness':
        return 1.15;
      case 'Tech':
        return 1.35;
      case 'Gaming':
        return 1.1;
      case 'Food':
        return 1.25;
      case 'Fashion':
      default:
        return 1.0;
    }
  };

  const calculateMetrics = () => {
    const pm = getPlatformMultipliers();
    const nm = getNicheMultiplier();

    // Raw metrics math
    const views = Math.round(budget * pm.views * nm);
    const engagementRate = Number((pm.engagement * nm).toFixed(1));
    const conversions = Math.round(budget * pm.views * pm.conversion * nm);
    const revenue = Math.round(budget * pm.roas * nm);
    const roas = Number((revenue / budget).toFixed(2));
    const enterpriseCost = 24000; // Annual enterprise platform fee

    return {
      views,
      engagementRate,
      conversions,
      revenue,
      roas,
      enterpriseSaved: Math.round(2000), // Saving ~$2000/month
    };
  };

  const { views, engagementRate, conversions, revenue, roas, enterpriseSaved } = calculateMetrics();

  // Helper formatting numbers
  const formatCompact = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <section
      id="calculator"
      className="relative py-24 px-6 overflow-hidden bg-[#07050d] border-t border-indigo-500/5"
    >
      {/* Background glow structures */}
      <div className="absolute top-[25%] left-[20%] w-[450px] h-[450px] bg-brand-primary/5 rounded-full blur-[100px] -z-10 animate-pulse duration-[12s]" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto w-full">
        {/* Title elements */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono font-bold tracking-wider text-brand-accent uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/25">
            PLATFORM ROI FORMULATOR
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight">
            Influence Campaign <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400">Estimator</span>.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Input your budget constraints, pick your platform channel, and calculate your simulated campaign view counts, conversion, and cash saved.
          </p>
        </div>

        {/* Dual grid split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          
          {/* Left panel: sliders and filters (6 Column) */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 md:p-8 space-y-8 border-white/10 text-left">
            
            {/* Input Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-white">Estimated Campaign Budget</label>
                <span className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 font-bold font-mono text-brand-accent text-sm md:text-base">
                  {formatCurrency(budget)}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-accent transition-all"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>Min: $500</span>
                <span>Mid: $50,000</span>
                <span>Max: $100,000</span>
              </div>
            </div>

            {/* Platform Selector buttons */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white block">Select Campaign Channel</label>
              <div className="grid grid-cols-3 gap-3">
                {(['tiktok', 'instagram', 'youtube'] as const).map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setPlatform(ch)}
                    className={`py-3.5 rounded-xl border text-xs font-bold transition-all uppercase tracking-wider ${
                      platform === ch
                        ? 'bg-brand-primary/25 border-brand-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            {/* Niche Selector */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white block">Select Focus Niche</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Fashion', 'Tech', 'Fitness', 'Food', 'Gaming'].map((n) => (
                  <button
                    key={n}
                    onClick={() => setNiche(n)}
                    className={`py-3 rounded-lg border text-xs font-semibold transition-all ${
                      niche === n
                        ? 'bg-indigo-500/10 border-brand-accent text-white shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Mini explanatory banner */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex gap-2.5 items-start text-xs text-gray-400">
              <Info className="w-4 h-4 mt-0.5 shrink-0 text-brand-accent" />
              <p className="leading-relaxed leading-normal">
                Multipliers are calculated based on public 2026 engagement and standard brand conversion statistics. Actual campaign returns can vary.
              </p>
            </div>
          </div>

          {/* Right panel: Metric Outputs cards (6 Column) */}
          <div className="lg:col-span-6 bg-[#0c0919] rounded-2xl p-6 md:p-8 border border-white/5 flex flex-col justify-between text-left relative overflow-hidden shadow-2xl">
            {/* Top glass lighting decoration overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl" />

            {/* Campaign Output summary */}
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
                  ESTIMATED STATISTICAL OUTPUT
                </span>
                <span className="text-xs text-brand-success font-semibold px-2 py-0.5 rounded bg-brand-success/10 border border-brand-success/20 font-mono">
                  ● SYNC ACCELERATE
                </span>
              </div>

              {/* Grid block metrics split */}
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                
                {/* Views Card */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-brand-primary">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-500 uppercase">Impressions views</p>
                    <p className="text-xl font-bold font-mono text-white mt-0.5 mt-1">{formatCompact(views)}</p>
                  </div>
                </div>

                {/* Engagement Card */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 text-yellow-400">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-400 uppercase leading-snug">Engagement rate</p>
                    <p className="text-xl font-bold font-mono text-white mt-1">{engagementRate}%</p>
                  </div>
                </div>

                {/* Conversion Card */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-400 uppercase leading-snug">Conversions Sales</p>
                    <p className="text-xl font-bold font-mono text-white mt-1">{conversions}</p>
                  </div>
                </div>

                {/* ROAS Indicator */}
                <div className="p-4 bg-[#110e20] rounded-2xl border border-brand-accent/25 flex items-center gap-3 shadow-lg">
                  <div className="w-9 h-9 rounded-lg bg-brand-accent/10 flex items-center justify-center border border-brand-accent/20 text-brand-accent">
                    <TrendingUp className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-brand-accent uppercase leading-snug">Estimated ROAS</p>
                    <p className="text-xl font-bold font-mono text-brand-accent mt-0.5 mt-1">{roas}x</p>
                  </div>
                </div>

              </div>

              {/* Total revenue generated output block */}
              <div className="bg-indigo-950/20 p-5 rounded-2xl border border-brand-primary/25 mt-4 text-left">
                <span className="text-[10px] font-mono text-indigo-400 uppercase">Estimated campaign sales yield</span>
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1.5 mt-1.5">
                  <span className="text-3xl font-black font-mono text-white">
                    {formatCurrency(revenue)}
                  </span>
                  <span className="text-xs text-brand-success font-bold font-mono leading-none">
                    Net profit: {formatCurrency(revenue - budget)}
                  </span>
                </div>
              </div>
            </div>

            {/* Savings highlight comparison */}
            <div className="pt-6 border-t border-white/5 mt-8 flex flex-col md:flex-row md:items-center justify-between text-xs gap-3">
              <div className="text-left">
                <p className="font-semibold text-white font-sans">Enterprise Platform saved with us:</p>
                <p className="text-gray-400 mt-0.5">Saves $2,000/mo by skipping enterprise software licenses.</p>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-brand-success/10 border border-brand-success/20 text-brand-success font-bold font-mono text-center shrink-0">
                ✓ SAVES $24,000/YR
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
