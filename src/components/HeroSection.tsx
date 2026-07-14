import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Twitter, 
  Sparkles, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Briefcase 
} from 'lucide-react';

interface HeroSectionProps {
  onOpenOnboarding: () => void;
  joinedCount: number;
}

export default function HeroSection({ onOpenOnboarding, joinedCount }: HeroSectionProps) {
  const goalCount = 10000;
  const progressPercent = Math.min((joinedCount / goalCount) * 100, 100);

  // Avatars for the social counter
  const avatarUrls = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=faces'
  ];

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden bg-[#07070A] min-h-screen flex flex-col justify-center">
      {/* Cinematic Aurora Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#6C63FF]/10 blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] rounded-full bg-[#A855F7]/10 blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[200px] h-[200px] rounded-full bg-[#8F7BFF]/8 blur-[80px] pointer-events-none" />

      {/* Grid Pattern overlay for depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 w-full">
        
        {/* Left Column: Title & Onboarding Hook */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/8 text-sm font-medium text-[#8F7BFF] mb-6 shadow-sm shadow-[#8F7BFF]/5"
          >
            <Sparkles className="w-4 h-4 text-[#A855F7] animate-pulse" />
            <span>Join India's Next-Gen Creator Directory</span>
          </motion.div>

          {/* Huge Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.05] tracking-tight text-white mb-6"
          >
            Join India's Next <br />
            <span className="gradient-text-hero">Creator Network.</span>
          </motion.h1>

          {/* Bulleted descriptive Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-3 mb-10 max-w-xl text-text-secondary text-base sm:text-lg"
          >
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-1" />
              <span>Build <strong>one professional, verified profile</strong> that integrates all your accounts.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-1" />
              <span>Get discovered by premium brands without chasing cold agency deals.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-1" />
              <span>Receive qualified collaboration requests direct to your dashboard.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-1" />
              <span>Grow your creator career with authentic audience verification.</span>
            </div>
          </motion.div>

          {/* Core Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12"
          >
            <button
              onClick={onOpenOnboarding}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#A855F7] font-semibold text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#6C63FF]/30 hover:shadow-[#6C63FF]/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-base"
              id="hero-primary-cta"
            >
              Join the First 10,000 Creators
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 font-semibold text-white flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-base"
            >
              See How It Works
            </a>
          </motion.div>

          {/* Trusted Creator Community Counter Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-xl glass-panel p-5 rounded-2xl border border-white/10"
            id="creators-onboard-counter"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3.5 overflow-hidden">
                  {avatarUrls.map((url, i) => (
                    <img
                      key={i}
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-[#111318] object-cover"
                      src={url}
                      alt="Creator Avatar"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-lg text-white">
                      {joinedCount.toLocaleString()}
                    </span>
                    <span className="text-text-secondary text-sm">/ 10,000</span>
                  </div>
                  <p className="text-xs text-text-secondary">Founding Creators Joined</p>
                </div>
              </div>
              <div className="text-right sm:text-right">
                <span className="inline-block px-2.5 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-xs font-semibold text-[#22C55E] animate-pulse">
                  Early Entry Perks Active
                </span>
              </div>
            </div>

            {/* Premium Animated Progress Bar */}
            <div className="space-y-1.5">
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#6C63FF] via-[#8F7BFF] to-[#A855F7] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-text-secondary font-mono">
                <span>0 Creators</span>
                <span>{progressPercent.toFixed(1)}% Onboarding Target Met</span>
                <span>10,000 Goal</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Cinematic 3D Floating Mockup */}
        <div className="lg:col-span-5 relative flex justify-center items-center py-10 lg:py-0">
          
          {/* Subtle Ambient Spinning Glow Backdrop */}
          <div className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-[#6C63FF]/20 to-[#A855F7]/10 blur-[60px] animate-pulse pointer-events-none" />

          {/* Main Mockup Container */}
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[32px] border border-white/10 bg-[#111318]/90 p-6 shadow-2xl glow-primary overflow-hidden flex flex-col justify-between">
            {/* Mockup Header */}
            <div className="flex items-center justify-between border-bottom border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                    alt="Riya Sen"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Riya Sen</h4>
                  <p className="text-[11px] text-text-secondary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                    riyasen.styles
                  </p>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[10px] font-bold text-[#8F7BFF]">
                Verified Premium
              </div>
            </div>

            {/* Mockup Core Data */}
            <div className="space-y-4 my-4 flex-1 flex flex-col justify-center">
              
              {/* Profile Score Meter */}
              <div className="bg-white/3 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-text-secondary font-medium">Creogrid Profile Score</p>
                  <h3 className="font-display font-extrabold text-2xl text-white mt-1">98/100</h3>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-dashed border-[#6C63FF] flex items-center justify-center font-bold text-xs text-white">
                  A++
                </div>
              </div>

              {/* Verified Audience reach statistics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/3 border border-white/5 rounded-xl p-3 text-center">
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider block">Audience Reach</span>
                  <span className="font-display font-bold text-lg text-white">410K+</span>
                </div>
                <div className="bg-white/3 border border-white/5 rounded-xl p-3 text-center">
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider block">Engagement Rate</span>
                  <span className="font-display font-bold text-[#22C55E] text-lg">7.12%</span>
                </div>
              </div>

              {/* Active Brand Requests */}
              <div className="space-y-2">
                <p className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold">Live Collaboration Requests</p>
                
                <div className="bg-[#111318] border border-white/10 rounded-xl p-3 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#EF4444]/10 flex items-center justify-center border border-[#EF4444]/20 text-xs font-bold text-[#EF4444]">
                      N
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Nykaa Beauty</p>
                      <p className="text-[10px] text-[#22C55E] font-medium">₹45,000 Campaign Budget</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-mono">
                    Pending
                  </span>
                </div>

                <div className="bg-[#111318] border border-white/10 rounded-xl p-3 flex items-center justify-between shadow-sm opacity-60">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center border border-[#3B82F6]/20 text-xs font-bold text-[#3B82F6]">
                      M
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Myntra Fashion</p>
                      <p className="text-[10px] text-[#22C55E] font-medium">₹65,000 Campaign Budget</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] font-mono">
                    Signed
                  </span>
                </div>
              </div>

            </div>

            {/* Platform Badges Footer */}
            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <span className="text-[10px] text-text-secondary font-medium">Connected Networks</span>
              <div className="flex gap-2">
                <span className="w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500 hover:scale-110 transition-transform">
                  <Instagram className="w-4 h-4" />
                </span>
                <span className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:scale-110 transition-transform">
                  <Youtube className="w-4 h-4" />
                </span>
                <span className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 hover:scale-110 transition-transform">
                  <Linkedin className="w-4 h-4" />
                </span>
                <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Twitter className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Decorative Floating Glass elements using Framer Motion */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center shadow-lg pointer-events-none"
            >
              <TrendingUp className="w-6 h-6 text-[#22C55E]" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-1/3 -left-6 px-3 py-1.5 bg-[#111318]/90 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-1.5 shadow-lg pointer-events-none text-xs font-mono font-medium"
            >
              <DollarSign className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Earnings UP 45%</span>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
