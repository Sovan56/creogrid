/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Search, MapPin, Sparkles, Filter, ChevronRight, MessageSquare, Flame, TrendingUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CREATORS } from '../data';
import { Creator, Platform } from '../types';

export default function DiscoveryEngine() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [generatedPitch, setGeneratedPitch] = useState('');
  const [selectedNiche, setSelectedNiche] = useState<string>('all');

  // Gather unique niches
  const niches = ['all', ...Array.from(new Set(CREATORS.map((c) => c.niche.split(' & ')[0])))];

  const filteredCreators = CREATORS.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.niche.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlatform = selectedPlatform === 'all' || c.platform === selectedPlatform;
    const matchesNiche = selectedNiche === 'all' || c.niche.startsWith(selectedNiche);

    return matchesSearch && matchesPlatform && matchesNiche;
  });

  const getPlatformColors = (platform: Platform) => {
    switch (platform) {
      case 'tiktok':
        return 'bg-black text-white hover:bg-zinc-900 border-zinc-800';
      case 'instagram':
        return 'bg-gradient-to-tr from-pink-500 to-amber-500 text-white hover:brightness-110 border-pink-500/10';
      case 'youtube':
        return 'bg-gradient-to-b from-red-600 to-red-700 text-white hover:brightness-110 border-red-600/10';
    }
  };

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'tiktok':
        return (
          <span className="font-bold tracking-tight text-[10px] font-mono leading-none flex items-center">
            TIK<span className="text-cyan-400">TOK</span>
          </span>
        );
      case 'instagram':
        return <span className="font-bold text-[10px] uppercase font-mono tracking-wider">INSTA</span>;
      case 'youtube':
        return <span className="font-bold text-[10px] uppercase font-mono tracking-wider">YOUTUBE</span>;
    }
  };

  // Helper formatting numbers
  const formatFollowers = (count: number) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(0) + 'K';
    return count.toString();
  };

  // Automated custom outreach pitch writer
  const handleGeneratePitch = (creator: Creator) => {
    const n = creator.niche.split(' & ')[0];
    const pitch = `Hi ${creator.name},\n\nHope this is finding you well!\n\nI was looking through our influencer directory on InfluenceFlow and absolutely loved your content under the ${n} category. Your engagement rates are extraordinary (hitting around ${creator.engagement}%), particularly with your audience hub in New York/Austin!\n\nWe are launching a specialized campaign for a premium lifestyle label and think your unique aesthetic matches perfectly. Based on your rate of $${creator.costPerPost} per post, we would love to secure a pilot feature.\n\nLet me know if you would be open to reviewing the brief details!\n\nBest,\nCampaign Team`;
    setGeneratedPitch(pitch);
  };

  return (
    <section
      id="discovery"
      className="relative py-24 px-6 overflow-hidden bg-[#0a0712] border-t border-indigo-500/5"
    >
      {/* Visual lighting rings */}
      <div className="absolute top-[15%] right-[5%] w-[450px] h-[450px] bg-brand-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[20%] left-[10%] w-[380px] h-[380px] bg-brand-accent/5 rounded-full blur-[100px] -z-10 animate-pulse duration-[10s]" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Head description */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono font-bold tracking-wider text-brand-accent uppercase bg-indigo-500/10 px-3 py-1 bg-grid rounded-full border border-indigo-500/25">
            CREATOR DISCOVERY EXPERIMENT
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight">
            Our real-time creator <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-alt">directory</span>.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Instantly search over 150 million creators. Filter by platform, category, engagement spikes, and geographical hubs with zero gatekeeping.
          </p>
        </div>

        {/* Input filters search panel */}
        <div className="glass-panel rounded-2xl p-4 md:p-6 mb-8 flex flex-col gap-4 border-white/10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Search Input bar */}
            <div className="relative lg:col-span-6">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Search className="w-5 h-5 text-indigo-400" />
              </span>
              <input
                type="text"
                placeholder="Search creator name, handles, or specialized niches (e.g., Fashion, Tech, Baking...)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-primary/50 text-white placeholder-gray-400 focus:outline-none transition-all text-sm font-sans"
              />
            </div>

            {/* Platform filter tabs */}
            <div className="flex flex-wrap items-center gap-2 lg:col-span-4">
              <span className="text-xs font-mono text-gray-400 mr-1 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" /> Platform:
              </span>
              {(['all', 'tiktok', 'instagram', 'youtube'] as const).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all uppercase ${
                    selectedPlatform === platform
                      ? 'bg-brand-primary text-white border-brand-primary/30 shadow-[0_0_12px_rgba(99,102,241,0.3)]'
                      : 'bg-white/5 text-gray-300 border-white/5 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>

            {/* Niche selector layout */}
            <div className="flex items-center gap-2 lg:col-span-2">
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-xs text-gray-300 focus:outline-none focus:border-brand-primary/50 cursor-pointer"
              >
                <option value="all" className="bg-[#0f0c1b] text-gray-300">
                  All Categories
                </option>
                {niches
                  .filter((n) => n !== 'all')
                  .map((niche) => (
                    <option key={niche} value={niche} className="bg-[#0f0c1b] text-gray-300">
                      {niche}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* Creator List Grid Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCreators.map((creator, index) => (
              <motion.div
                layout
                key={creator.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden p-5 flex flex-col justify-between border-white/10 relative group"
              >
                {/* Floating platform label indicator badge */}
                <div className="absolute top-4 right-4 flex gap-1">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-[9px] font-bold border ${getPlatformColors(
                      creator.platform,
                    )}`}
                  >
                    {getPlatformIcon(creator.platform)}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Top card description */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-white group-hover:text-brand-accent transition-colors">
                        {creator.name}
                      </h4>
                      <p className="text-xs font-mono text-gray-400">{creator.handle}</p>
                    </div>
                  </div>

                  {/* Niche tag and Location details */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-300">
                      {creator.niche}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px]">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      {creator.location}
                    </span>
                  </div>

                  {/* Key Stats rows */}
                  <div className="grid grid-cols-3 gap-3 border-y border-white/5 py-4">
                    <div className="text-left">
                      <p className="text-[10px] font-mono text-gray-500 uppercase">Followers</p>
                      <p className="text-base font-bold text-white mt-0.5">
                        {formatFollowers(creator.followers)}
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-mono text-gray-500 uppercase">Engage Rate</p>
                      <p className="text-base font-bold text-brand-success mt-0.5">
                        {creator.engagement}%
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-mono text-gray-500 uppercase">Est. Cost</p>
                      <p className="text-base font-bold text-brand-accent mt-0.5">
                        ${creator.costPerPost}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card footer CTA button */}
                <div className="mt-5 pt-1">
                  <button
                    onClick={() => {
                      setSelectedCreator(creator);
                      handleGeneratePitch(creator);
                    }}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-brand-primary text-white border border-white/10 hover:border-brand-primary/30 text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Analyze Profile & Pitch</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredCreators.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-400">
              <p className="text-lg">No creators found matching those parameters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedPlatform('all');
                  setSelectedNiche('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-300 font-semibold border border-indigo-500/20 text-xs"
              >
                Clear Search Controls
              </button>
            </div>
          )}
        </div>

        {/* Modal Overlay: Selected Creator Details */}
        <AnimatePresence>
          {selectedCreator && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Blur backdrop backing */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCreator(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />

              {/* Modal window container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative bg-[#0d0a19]/95 border border-indigo-500/20 rounded-2xl max-w-4xl w-full p-6 md:p-8 overflow-y-auto max-h-[90vh] shadow-[0_0_50px_rgba(99,102,241,0.25)] flex flex-col gap-6"
              >
                {/* Close Button top-right */}
                <button
                  onClick={() => setSelectedCreator(null)}
                  className="absolute top-5 right-5 p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Profile Header Block */}
                <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between pb-6 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 shrink-0">
                      <img
                        src={selectedCreator.avatar}
                        alt={selectedCreator.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-display font-bold text-white">
                          {selectedCreator.name}
                        </h3>
                        <span
                          className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${getPlatformColors(
                            selectedCreator.platform,
                          )}`}
                        >
                          {getPlatformIcon(selectedCreator.platform)}
                        </span>
                      </div>
                      <p className="text-sm font-mono text-gray-400">{selectedCreator.handle}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-center">
                      <p className="text-[9px] font-mono text-gray-500 uppercase leading-none">
                        Avg Posts Views
                      </p>
                      <p className="text-base font-bold text-white mt-1.5 font-mono">
                        {formatFollowers(selectedCreator.views)}
                      </p>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-center">
                      <p className="text-[9px] font-mono text-gray-500 uppercase leading-none font-sans">
                        Est CPM Cost
                      </p>
                      <p className="text-base font-bold text-brand-accent mt-1.5 font-mono">
                        ${(selectedCreator.costPerPost / (selectedCreator.views / 1000)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub Body Layout Splits */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                  
                  {/* Left demographics block (Grid 5 column) */}
                  <div className="lg:col-span-5 space-y-6 text-left">
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                        <Flame className="w-4 h-4" /> Audience Demographics
                      </h4>
                      <div className="space-y-3">
                        {selectedCreator.demographics.map((dem, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-300 font-medium">{dem.label}</span>
                              <span className="text-white font-semibold font-mono">{dem.percentage}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${dem.percentage}%` }}
                                transition={{ duration: 0.8, delay: 0.1 * i }}
                                className="h-full bg-gradient-to-r from-brand-primary to-brand-accent rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance previews */}
                    <div className="space-y-4 pt-2">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4" /> Recent Performance Grids
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedCreator.recentPosts.map((post, index) => (
                          <div
                            key={index}
                            className="aspect-[3/4] rounded-lg overflow-hidden relative border border-white/10 group cursor-pointer"
                          >
                            <img
                              src={post.thumbnail}
                              alt="Post thumbnail"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 duration-200"
                            />
                            {/* Stats Overlay on Hover */}
                            <div className="absolute inset-0 bg-black/60 opacity-100 flex flex-col justify-end p-2 text-[10px] text-white">
                              <p className="font-bold leading-tight">{post.views} views</p>
                              <p className="text-[8px] text-brand-success font-mono">
                                ER: {post.engagement}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right outreach flow panel (Grid 7 column) */}
                  <div className="lg:col-span-7 space-y-4 text-left">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4" /> InfluenceFlow AI Pitch Sequence
                      </h4>
                      <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        HIGH RESPONSE COPY
                      </span>
                    </div>

                    <div className="relative">
                      <textarea
                        value={generatedPitch}
                        onChange={(e) => setGeneratedPitch(e.target.value)}
                        className="w-full h-[280px] bg-white/[0.04] border border-white/10 rounded-xl p-4 text-xs font-mono text-gray-200 focus:outline-none focus:border-emerald-500/50 leading-relaxed"
                      />
                      <div className="absolute bottom-3 right-3 text-[10px] text-gray-500 bg-[#0d0a19] px-2 py-1 rounded">
                        Press CTA to copy or edit
                      </div>
                    </div>

                    {/* Copy flow button CTA */}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedPitch);
                        alert(`Pitch template customized for ${selectedCreator.name} is successfully copied to clipboard!`);
                      }}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-emerald-600/10"
                    >
                      ✓ Copy Customized Outreach Proposal
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
