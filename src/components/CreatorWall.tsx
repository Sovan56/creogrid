import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Creator } from '../types';
import { Search, MapPin, Award, ShieldCheck, Instagram, Youtube, Linkedin, Twitter, Sparkles } from 'lucide-react';

interface CreatorWallProps {
  creators: Creator[];
}

export default function CreatorWall({ creators }: CreatorWallProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Tech', 'Travel', 'Finance', 'Fitness', 'Education', 'Photography'];

  const filteredCreators = creators.filter((creator) => {
    const matchesSearch = 
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || creator.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-3.5 h-3.5" />;
      case 'youtube': return <Youtube className="w-3.5 h-3.5" />;
      case 'linkedin': return <Linkedin className="w-3.5 h-3.5" />;
      case 'twitter': return <Twitter className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  return (
    <section id="creators-wall" className="py-24 relative bg-[#07070A] overflow-hidden">
      {/* Light glow grids */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#6C63FF]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#A855F7]/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/8 text-xs font-semibold text-[#8F7BFF] mb-4">
            <Award className="w-3.5 h-3.5 text-[#A855F7]" />
            Founding Member Roster
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            The Founding 10,000 Directory
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            Meet a few of India's premium creators who have already claimed their Creogrid profile. Build yours to get featured here.
          </p>
        </div>

        {/* Directory Controls (Search & Category Buttons) */}
        <div className="flex flex-col gap-6 mb-12">
          {/* Search and Filters Layout */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-secondary" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search creators by name, handle, or city..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-text-secondary text-sm focus:border-[#6C63FF] focus:bg-white/10 outline-none transition-all"
              />
            </div>

            {/* Total Badge */}
            <div className="shrink-0 text-sm font-mono text-text-secondary flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A855F7]" />
              <span>Showing <strong>{filteredCreators.length}</strong> Verified Profiles</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none scroll-smooth">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#6C63FF] to-[#8F7BFF] text-white border-transparent'
                    : 'bg-white/3 text-text-secondary border-white/5 hover:bg-white/5 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Creator Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCreators.map((creator) => (
              <motion.div
                layout
                key={creator.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5, borderColor: 'rgba(108, 99, 255, 0.4)' }}
                className="glass-panel p-6 rounded-2xl relative border border-white/10 flex flex-col justify-between group overflow-hidden"
              >
                {/* Decorative glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6C63FF]/3 to-[#A855F7]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top line: Category badge & score */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-[11px] font-semibold text-text-secondary">
                      {creator.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                      <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                        Score {creator.profileScore}
                      </span>
                    </div>
                  </div>

                  {/* Creator Info Header */}
                  <div className="flex gap-3.5 mb-5">
                    <div className="relative w-14 h-14 rounded-2xl border border-white/10 overflow-hidden bg-white/5 shrink-0">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-white group-hover:text-[#8F7BFF] transition-colors">
                        {creator.name}
                      </h3>
                      <p className="text-xs text-text-secondary font-mono">@{creator.handle}</p>
                      
                      <div className="flex items-center gap-1 text-[11px] text-text-secondary mt-1">
                        <MapPin className="w-3 h-3 text-[#A855F7]" />
                        <span>{creator.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  {creator.bio && (
                    <p className="text-xs text-text-secondary line-clamp-2 mb-6">
                      {creator.bio}
                    </p>
                  )}
                </div>

                {/* Platform metrics */}
                <div className="border-t border-white/5 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Verified Networks</span>
                    <span className="text-[10px] text-text-secondary">Engagement: <strong className="text-[#22C55E]">{creator.engagementRate}%</strong></span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(creator.platforms).map(([platform, data]) => {
                      if (!data) return null;
                      return (
                        <div
                          key={platform}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#07070A]/50 border border-white/5 text-[11px] text-white"
                        >
                          <span className="text-text-secondary">
                            {getPlatformIcon(platform)}
                          </span>
                          <span className="font-mono font-bold">
                            {formatFollowers(data.followers)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Custom founding badge indicator */}
                <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="text-[9px] font-mono text-white/20">
                    FOUNDING#{creator.passId || `00127${creator.id}`}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredCreators.length === 0 && (
            <div className="col-span-full py-16 text-center glass-panel rounded-2xl border border-white/10">
              <p className="text-text-secondary mb-3">No founding creators found matching your search.</p>
              <button 
                onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                className="text-xs font-semibold text-[#6C63FF] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
