import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Laptop, 
  User, 
  BarChart3, 
  Mail, 
  Briefcase, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Twitter, 
  ShieldCheck, 
  ChevronRight, 
  Globe, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'briefs' | 'campaigns'>('overview');

  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: <User className="w-4 h-4" /> },
    { id: 'analytics', label: 'Verified Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'briefs', label: 'Brand Inquiries (3)', icon: <Mail className="w-4 h-4" /> },
    { id: 'campaigns', label: 'Campaign Tracker', icon: <Briefcase className="w-4 h-4" /> },
  ] as const;

  return (
    <section className="py-24 relative bg-[#07070A] overflow-hidden border-t border-white/5">
      {/* Aurora glow in the background */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-[#6C63FF]/3 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#A855F7]/3 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#8F7BFF] uppercase tracking-wider font-mono bg-white/5 px-3 py-1 rounded-full border border-white/8">
            The Creator Workspace Mockup
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-4 mb-4">
            A Premium Dashboard Built For You
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            Say goodbye to clumsy spreadsheets and outdated PDFs. Creogrid provides one unified command center to track your metrics, manage requests, and unlock brand collaborations.
          </p>
        </div>

        {/* Dynamic Tab Selectors (Interactive Controls) */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#6C63FF] to-[#8F7BFF] text-white border-transparent shadow-lg shadow-[#6C63FF]/15'
                    : 'bg-[#111318]/60 text-text-secondary border-white/5 hover:border-white/10 hover:bg-[#111318]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Cinematic Macbook-style Browser Window mockup */}
        <div className="w-full max-w-5xl mx-auto rounded-2xl border border-white/10 bg-[#111318] shadow-2xl overflow-hidden shadow-primary-main/10 relative">
          
          {/* Mock Window Top Bar */}
          <div className="glass-nav px-5 py-3.5 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            {/* Mock Search / URL Field */}
            <div className="w-1/2 max-w-md h-6 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[10px] text-text-secondary font-mono tracking-wide">
              creogrid.in/creator-studio/dashboard
            </div>
            <div className="flex items-center gap-2 text-xs text-[#22C55E] font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Verified Connection</span>
            </div>
          </div>

          {/* Mock Browser Workspace */}
          <div className="p-6 md:p-8 min-h-[420px] text-left">
            
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Top Row Profile Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/3 border border-white/5 rounded-2xl p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl border border-white/10 overflow-hidden relative">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces" 
                          alt="Kabir Sethi" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-bold text-lg text-white">Kabir Sethi</h3>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#6C63FF]/15 text-[10px] font-bold text-[#8F7BFF] border border-[#6C63FF]/20 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            Premium Verified
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary font-mono mt-0.5">@kabir_tech</p>
                        <p className="text-xs text-text-secondary mt-1 flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-[#A855F7]" />
                          Tech & Engineering Creator | Bengaluru, Karnataka
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-text-secondary block uppercase tracking-widest">Creogrid score</span>
                      <h4 className="font-display font-extrabold text-2xl text-white">96 <span className="text-xs text-text-secondary">/ 100</span></h4>
                      <span className="text-[10px] text-[#22C55E]">Top 1.2% in Tech</span>
                    </div>
                  </div>

                  {/* Dynamic stats cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-white/3 border border-white/5 rounded-xl">
                      <div className="flex items-center justify-between text-text-secondary text-xs mb-2">
                        <span>Aggregate Followers</span>
                        <Instagram className="w-4 h-4 text-pink-500" />
                      </div>
                      <h3 className="font-display font-extrabold text-xl text-white">450,000+</h3>
                      <p className="text-[10px] text-[#22C55E] mt-1">+4.2% Growth (30d)</p>
                    </div>

                    <div className="p-4 bg-white/3 border border-white/5 rounded-xl">
                      <div className="flex items-center justify-between text-text-secondary text-xs mb-2">
                        <span>True Engagement</span>
                        <BarChart3 className="w-4 h-4 text-[#6C63FF]" />
                      </div>
                      <h3 className="font-display font-extrabold text-xl text-white">5.82%</h3>
                      <p className="text-[10px] text-[#22C55E] mt-1">Excellent Niche Score</p>
                    </div>

                    <div className="p-4 bg-white/3 border border-white/5 rounded-xl">
                      <div className="flex items-center justify-between text-text-secondary text-xs mb-2">
                        <span>Active Partnerships</span>
                        <Briefcase className="w-4 h-4 text-[#A855F7]" />
                      </div>
                      <h3 className="font-display font-extrabold text-xl text-white">3 Brands</h3>
                      <p className="text-[10px] text-[#8F7BFF] mt-1">2 Pending Review</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Audience Demographics */}
                    <div className="p-5 bg-white/3 border border-white/5 rounded-2xl">
                      <h3 className="font-display font-bold text-sm text-white mb-4">Audience Geography & Cities</h3>
                      <div className="space-y-3.5">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-text-secondary">
                            <span>Bengaluru, India</span>
                            <span className="font-bold text-white">42%</span>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="w-[42%] h-full bg-[#6C63FF]" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-text-secondary">
                            <span>Mumbai, India</span>
                            <span className="font-bold text-white">28%</span>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="w-[28%] h-full bg-[#8F7BFF]" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-text-secondary">
                            <span>Delhi NCR</span>
                            <span className="font-bold text-white">18%</span>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="w-[18%] h-full bg-[#A855F7]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Engagement index chart mockup */}
                    <div className="p-5 bg-white/3 border border-white/5 rounded-2xl flex flex-col justify-between">
                      <div>
                        <h3 className="font-display font-bold text-sm text-white mb-2">Verified Age & Gender Demographics</h3>
                        <p className="text-xs text-text-secondary mb-4">API verified viewer demographics across connected channels.</p>
                      </div>
                      
                      <div className="flex items-end justify-between h-28 pt-4 border-b border-white/5 px-2">
                        <div className="w-1/5 bg-white/5 h-12 rounded-t-lg flex flex-col justify-end text-center">
                          <div className="bg-[#6C63FF] h-6 rounded-t-lg" />
                          <span className="text-[9px] text-text-secondary mt-1">13-17</span>
                        </div>
                        <div className="w-1/5 bg-white/5 h-24 rounded-t-lg flex flex-col justify-end text-center">
                          <div className="bg-gradient-to-t from-[#6C63FF] to-[#A855F7] h-20 rounded-t-lg" />
                          <span className="text-[9px] text-white mt-1">18-24</span>
                        </div>
                        <div className="w-1/5 bg-white/5 h-20 rounded-t-lg flex flex-col justify-end text-center">
                          <div className="bg-[#8F7BFF] h-14 rounded-t-lg" />
                          <span className="text-[9px] text-text-secondary mt-1">25-34</span>
                        </div>
                        <div className="w-1/5 bg-white/5 h-10 rounded-t-lg flex flex-col justify-end text-center">
                          <div className="bg-[#6C63FF]/60 h-4 rounded-t-lg" />
                          <span className="text-[9px] text-text-secondary mt-1">35-44</span>
                        </div>
                        <div className="w-1/5 bg-white/5 h-6 rounded-t-lg flex flex-col justify-end text-center">
                          <div className="bg-white/10 h-2 rounded-t-lg" />
                          <span className="text-[9px] text-text-secondary mt-1">45+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'briefs' && (
                <motion.div
                  key="briefs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="font-display font-bold text-sm text-white mb-2">Incoming Collaboration Briefs</h3>
                  
                  {/* Brief 1 */}
                  <div className="p-4 bg-white/3 border border-white/5 hover:border-white/10 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        <h4 className="font-bold text-white text-sm">HDFC Securities VLOG</h4>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">Requested a dedicated integration covering their smart-basket investments feature.</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono font-bold text-[#22C55E]">₹85,000 INR</span>
                      <button className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/8 text-[11px] font-semibold text-white hover:bg-white/10 cursor-pointer flex items-center gap-1">
                        Accept Deal <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Brief 2 */}
                  <div className="p-4 bg-white/3 border border-white/5 hover:border-white/10 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]" />
                        <h4 className="font-bold text-white text-sm">Intel Gaming Unboxing</h4>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">Looking for a dedicated tech setup unboxing reel focusing on processor upgrades.</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono font-bold text-[#22C55E]">₹1,20,000 INR</span>
                      <button className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/8 text-[11px] font-semibold text-white hover:bg-white/10 cursor-pointer flex items-center gap-1">
                        Accept Deal <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Brief 3 */}
                  <div className="p-4 bg-white/3 border border-white/5 hover:border-white/10 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all opacity-70">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <h4 className="font-bold text-white text-sm">Notion Workspace Integration</h4>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">A newsletter mention detailing engineering workspace architecture setups.</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono font-bold text-text-secondary">₹40,000 INR</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-text-secondary">Closed</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'campaigns' && (
                <motion.div
                  key="campaigns"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-sm text-white">Active Campaign Wallet</h3>
                      <p className="text-xs text-text-secondary">Escrow payments locked for ongoing contracts.</p>
                    </div>
                    <span className="text-xs font-mono text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2.5 py-1 rounded-full font-bold">
                      ₹2,05,000 Escrow Guarded
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 bg-[#07070A]/80 border border-white/5 rounded-xl flex justify-between items-center text-xs">
                      <div className="space-y-1">
                        <p className="font-bold text-white">1. Razorpay Launch Campaign</p>
                        <p className="text-text-secondary text-[11px]">Draft review phase | Due in 3 days</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">₹85,000.00</p>
                        <span className="text-[9px] text-[#22C55E] font-medium bg-[#22C55E]/10 px-1.5 py-0.5 rounded">Funds Secured</span>
                      </div>
                    </div>

                    <div className="p-4 bg-[#07070A]/80 border border-white/5 rounded-xl flex justify-between items-center text-xs">
                      <div className="space-y-1">
                        <p className="font-bold text-white">2. OnePlus 14 Pro Review</p>
                        <p className="text-text-secondary text-[11px]">Video live on YT | Awaiting stats verification</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">₹1,20,000.00</p>
                        <span className="text-[9px] text-yellow-500 font-medium bg-yellow-500/10 px-1.5 py-0.5 rounded">Milestone Reached</span>
                      </div>
                    </div>
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
