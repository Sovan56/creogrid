/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, Search, Sparkles, Send, ShieldAlert, BadgeInfo, Play, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CAMPAIGN_STAGES } from '../data';
import { useMotionSettings } from './MotionContext';
import Reveal from './Reveal';

export default function CampaignFlow() {
  const { reducedMotion } = useMotionSettings();
  const [activeStage, setActiveStage] = useState('discovery');
  const [draftApproved, setDraftApproved] = useState<boolean | null>(null);
  const [liveCounter, setLiveCounter] = useState(1452);

  // Helper formatting numbers
  const formatNumber = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Simulating live post counters increment
  const handleLiveCounterTick = () => {
    setLiveCounter((prev) => prev + Math.floor(Math.random() * 25) + 12);
  };

  return (
    <section
      id="pipeline"
      className="relative py-24 px-6 overflow-hidden bg-[#0D0D16] bg-grid"
    >
      {/* Background radial overlays */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[#FF2D7A]/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-[#5B2CFF]/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header details wrapped in Reveal */}
        <Reveal direction="up" className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono font-bold tracking-wider text-[#FF2D7A] uppercase bg-[#5B2CFF]/10 px-3 py-1 rounded-full border border-[#5B2CFF]/25">
            PLATFORM PIPELINE OUTLINE
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight">
            How a campaign <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#FF9A1F]">flows</span> on our platform.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Manage your entire creator lifecycle in one simple, continuous automated workspace. No external software, integrations, or email chains.
          </p>
        </Reveal>

        {/* The horizontal timeline stages board */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-12">
          {CAMPAIGN_STAGES.map((stage) => {
            const isActive = stage.id === activeStage;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`p-4 rounded-xl text-left border transition-all text-xs flex flex-col justify-between relative group ${
                  isActive
                    ? 'bg-indigo-950/40 border-[#5B2CFF] shadow-[0_0_20px_rgba(91,44,255,0.15)] bg-grid'
                    : 'bg-white/5 border-white/5 hover:bg-[#120e20] hover:border-white/10'
                }`}
              >
                <div className="flex justify-between items-center w-full mb-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      isActive ? 'bg-[#5B2CFF]/20 text-indigo-300' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    Stage {CAMPAIGN_STAGES.indexOf(stage) + 1}
                  </span>
                  <span className="text-xs font-mono text-gray-500 group-hover:text-white transition-colors">
                    {stage.count} profiles
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white tracking-tight">{stage.title}</h4>
                  <p className="text-[10px] text-gray-400 leading-tight line-clamp-1">{stage.description}</p>
                </div>

                {/* Progress anchor dash line */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-[#5B2CFF] to-[#FF2D7A] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic preview dashboard window corresponding to selected stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          
          {/* Left panel (Grid 5 column): Explanation of stage with bullet points */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#FF2D7A] uppercase font-bold">
                  <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                  <span>
                    Phase {CAMPAIGN_STAGES.findIndex((s) => s.id === activeStage) + 1} Automation Action
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight">
                  {activeStage === 'discovery' && 'Discover pristine matches and niche leaders.'}
                  {activeStage === 'outreach' && 'Outreach email sequences that reply.'}
                  {activeStage === 'negotiation' && 'Safe, secure multi-party agreements.'}
                  {activeStage === 'content' && 'Painless, visual media kit draft checks.'}
                  {activeStage === 'active' && 'Watch instant conversions accumulate.'}
                </h3>

                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  {activeStage === 'discovery' &&
                    'Stop spending hours digging. Filter across 150M+ creator profiles using demographic splits, engagement analytics, post consistency metrics, and location criteria inside seconds.'}
                  {activeStage === 'outreach' &&
                    'Ditch manual mail clients. Write, sequence, and trigger personalized outreach pitches that auto-populate creator rates, niches, and names to yield a massive 65% inbox click-thru rate.'}
                  {activeStage === 'negotiation' &&
                    'Protect your budgets. Lock standard legal contracts automatically. Multi-party electronic signatures secure deliverables, terms, and funds in automated escrow pipelines prior to postings.'}
                  {activeStage === 'content' &&
                    'Smooth content coordination. Influencers upload drafts directly to your check board. Click to approve final assets or request edits without text message strings or email clusters.'}
                  {activeStage === 'active' &&
                    'Live metrics visualizer. Tracking pixels aggregate creator posts automatically, mapping impression counts, social likes, discount clicks, and direct conversion returns in your summary.'}
                </p>

                {/* Bullets items */}
                <div className="space-y-3 pt-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>
                      {activeStage === 'discovery' && 'Advanced multi-factor niche tagging'}
                      {activeStage === 'outreach' && 'Smart automated pitch writer'}
                      {activeStage === 'negotiation' && 'Signatures matched verified tags'}
                      {activeStage === 'content' && 'Unified client review dashboard'}
                      {activeStage === 'active' && 'Real-time sales ROAS sync'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>
                      {activeStage === 'discovery' && 'Audience gender/age profile divisions'}
                      {activeStage === 'outreach' && 'Integrated drip email sequence schedules'}
                      {activeStage === 'negotiation' && 'Escrow funds matched contract terms'}
                      {activeStage === 'content' && 'One-click feedback review loops'}
                      {activeStage === 'active' && 'Automatic live-track updates'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right panel (Grid 7 column): Fully operational interactive demo of active stage */}
          <div className="lg:col-span-7 bg-[#0D0D16] rounded-2xl p-6 border border-white/5 overflow-hidden shadow-xl min-h-[350px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {/* Stage 1 Demo: Discovery Grid mockup */}
              {activeStage === 'discovery' && (
                <motion.div
                  key="demo-discovery"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4 text-left"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-xs font-mono text-gray-400 uppercase">Interactive Query Window</span>
                    <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded font-mono">
                      150M+ INDEX MATCH
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <p className="text-xs font-semibold text-white">#AestheticTravel</p>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">12,422 entries</span>
                    </div>
                    <div className="p-3 bg-[#141424] border border-[#5B2CFF]/20 rounded-xl flex items-center justify-between shadow-lg">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#FF9A1F] animate-ping" />
                        <p className="text-xs font-semibold text-white">#CleanBeautyLifestyle</p>
                      </div>
                      <span className="text-[10px] font-mono text-[#FF9A1F]">8,210 entries (98% match)</span>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#f97316]" />
                        <p className="text-xs font-semibold text-white">#SmartFitnessHabits</p>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">4,152 entries</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#5B2CFF]/10 rounded-xl border border-[#5B2CFF]/20 flex gap-2.5 items-start text-xs text-indigo-200 mt-2">
                    <BadgeInfo className="w-4 h-4 mt-0.5 shrink-0 text-[#5B2CFF]" />
                    <p className="leading-relaxed">
                      Creogrid sorts profiles by **active consistency**, skipping empty profiles to locate high-retention influencers.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Stage 2 Demo: Active Outreach sequence timeline */}
              {activeStage === 'outreach' && (
                <motion.div
                  key="demo-outreach"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4 text-left font-mono text-xs"
                >
                  <div className="flex justify-between border-b border-white/5 pb-2 text-gray-500">
                    <span>OUTBOX drip sequences</span>
                    <span className="text-indigo-400 font-bold">● ACTIVE TRIGGER</span>
                  </div>

                  {/* Mail step item */}
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex justify-between items-center text-[11px]">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle className="w-4 h-4 shrink-0" />
                        <span>Step 1: First Pitch (Day 1)</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold">✓ DELIVERED</span>
                    </div>

                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex justify-between items-center text-[11px]">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle className="w-4 h-4 shrink-0" />
                        <span>Step 2: Friendly Follow Up (Day 3)</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold">✓ OPENED & REPLY</span>
                    </div>

                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex justify-between items-center text-[11px] animate-pulse">
                      <div className="flex items-center gap-2 text-emerald-300">
                        <Send className="w-4 h-4 shrink-0" />
                        <span>Step 3: Campaign Active Brief (Day 5)</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold">⌛ BREEZE INITIATE</span>
                    </div>
                  </div>

                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-[10px] text-gray-400">
                    <p className="font-semibold text-white mb-1 uppercase font-sans">Automatic Reply Triggered:</p>
                    <p className="leading-relaxed">
                      "I'd love to partner up. Your brief details are secure. Let's arrange terms!" — Seraphina Lin (@seraphina.style)
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Stage 3 Demo: Escrow contract locker */}
              {activeStage === 'negotiation' && (
                <motion.div
                  key="demo-negotiation"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4 text-left"
                >
                  <div className="flex justify-between border-b border-white/5 pb-2 text-xs font-mono text-gray-500">
                    <span>Campaign Escrow Lock</span>
                    <span className="text-emerald-400">✓ ESCROW SECURED</span>
                  </div>

                  {/* Escrow display block */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>Total locked deposit value (Campaign Fee)</span>
                      <span className="font-bold text-white font-mono">$1,200.00</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>Interactions escrow platform fee (0%)</span>
                      <span className="font-bold text-brand-success font-mono">FREE</span>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between text-[11px] gap-2">
                      <div className="flex items-center gap-1.5 text-brand-success">
                        <CheckCircle className="w-4 h-4 shrink-0" />
                        <span>Brand Terms Signed (Jessica M.)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-brand-success">
                        <CheckCircle className="w-4 h-4 shrink-0" />
                        <span>Creator Terms Signed (Chloe Rivers)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-xs text-cyan-200 flex gap-2.5 items-start">
                    <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" />
                    <p className="leading-relaxed leading-normal">
                      **Escrow Promise**: Funds are only released to the creator after content draft verification post-schedule.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Stage 4 Demo: Visual media draft check */}
              {activeStage === 'content' && (
                <motion.div
                  key="demo-content"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4 text-left"
                >
                  <div className="flex justify-between border-b border-white/5 pb-2 text-xs font-mono text-gray-500">
                    <span>Influencer Upload Center</span>
                    <span>Draft Status</span>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-16 rounded-md bg-zinc-800 relative overflow-hidden flex items-center justify-center border border-white/10">
                        <img
                          src="https://picsum.photos/seed/draft_top/150/200"
                          alt="Video thumbnail draft"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                          <Play className="w-5 h-5 opacity-90" />
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Seraphina_Style_LumiSkin_v1.mp4</p>
                        <p className="text-[10px] text-gray-400 mt-1">TikTok draft • 22.4MB • Unedited</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {draftApproved === null && (
                        <>
                          <button
                            onClick={() => setDraftApproved(false)}
                            className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 transition-all cursor-pointer"
                          >
                            Edit Request
                          </button>
                          <button
                            onClick={() => setDraftApproved(true)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:brightness-110 text-[#0D0D16] text-xs font-bold transition-all cursor-pointer"
                          >
                            Approve Draft
                          </button>
                        </>
                      )}
                      {draftApproved === true && (
                        <span className="text-xs text-brand-success font-bold font-mono">
                          ✓ APPROVED FOR PUBLISHING
                        </span>
                      )}
                      {draftApproved === false && (
                        <div className="flex flex-col text-right">
                          <span className="text-xs text-red-400 font-bold font-mono">
                            ✕ CORRECTION NOTIFIED
                          </span>
                          <button
                            onClick={() => setDraftApproved(null)}
                            className="text-[9px] text-[#A23CFF] hover:underline mt-1 cursor-pointer"
                          >
                            Undo action
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-[#5B2CFF]/10 rounded-xl border border-[#5B2CFF]/20 text-xs text-indigo-200">
                    <p className="leading-relaxed font-sans">
                      Once approved, posting schedule instructions are released to the marketer's calendar system instantly.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Stage 5 Demo: Live conversion analytics tracking ticker */}
              {activeStage === 'active' && (
                <motion.div
                  key="demo-active"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-5 text-left"
                >
                  <div className="flex justify-between border-b border-white/5 pb-2 text-xs font-mono text-gray-500">
                    <span>Direct Tracking metrics feed</span>
                    <span className="text-brand-success font-bold">● ACTIVE SYNC</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 flex flex-col justify-between">
                      <span className="text-[10px] font-mono text-gray-400 uppercase">Live Reach impressions</span>
                      <span className="text-lg font-bold text-white mt-1.5 font-mono">
                        {formatNumber(liveCounter * 82)}
                      </span>
                    </div>

                    <div className="p-3.5 bg-[#141424] rounded-xl border border-[#FF2D7A]/20 flex flex-col justify-between shadow-lg">
                      <span className="text-[10px] font-mono text-[#FF2D7A] uppercase">Influence Sales conversions</span>
                      <span className="text-lg font-bold text-[#FF2D7A] mt-1.5 font-mono">
                        {formatNumber(liveCounter)} order
                      </span>
                    </div>

                    <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 flex flex-col justify-between col-span-2 md:col-span-1">
                      <span className="text-[10px] font-mono text-gray-400 uppercase">Interactive Revenue Track</span>
                      <span className="text-lg font-bold text-brand-success mt-1.5 font-mono">
                        ${formatNumber(liveCounter * 42)}
                      </span>
                    </div>
                  </div>

                  {/* Trigger loop */}
                  <div className="flex justify-between items-center bg-[#5B2CFF]/10 p-3.5 rounded-xl border border-[#5B2CFF]/20">
                    <p className="text-xs text-indigo-200 max-w-xs leading-normal">
                      Click the simulated tracking button to update analytics in real-time.
                    </p>
                    <button
                      onClick={handleLiveCounterTick}
                      className="px-4 py-2 bg-[#5B2CFF] hover:brightness-110 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-md shadow-[#5B2CFF]/10 select-none text-center"
                    >
                      🚀 Tick Feed Counter
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
