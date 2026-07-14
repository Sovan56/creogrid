import { motion } from 'motion/react';
import { WHY_JOIN_REASONS, WHY_BRANDS_LOVE_US } from '../data';
import { 
  Search, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  BarChart3, 
  SearchCode,
  ArrowRight
} from 'lucide-react';

interface FeaturesProps {
  onOpenOnboarding: () => void;
}

export default function Features({ onOpenOnboarding }: FeaturesProps) {
  
  const getIcon = (name: string) => {
    switch (name) {
      case 'Search': return <Search className="w-6 h-6 text-[#6C63FF]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#A855F7]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#8F7BFF]" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-[#22C55E]" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-[#6C63FF]" />;
      case 'SearchCode': return <SearchCode className="w-6 h-6 text-[#A855F7]" />;
      default: return <Sparkles className="w-6 h-6 text-[#6C63FF]" />;
    }
  };

  return (
    <div className="bg-[#07070A]">
      
      {/* 1. WHY JOIN CREOGRID (Creator Focus) */}
      <section id="why-join" className="py-24 relative overflow-hidden">
        {/* Decorative lighting */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#6C63FF]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold text-[#8F7BFF] uppercase tracking-wider font-mono">
              Designed For High-Growth Creators
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-3 mb-5 leading-tight">
              Why Join the Founding 10,000 Network?
            </h2>
            <p className="text-text-secondary text-base sm:text-lg max-w-xl">
              We don’t act like a talent agency taking a 30% cut. We build high-integrity software that matches you with top-tier brands automatically.
            </p>
          </div>

          {/* Core Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_JOIN_REASONS.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, borderColor: 'rgba(108, 99, 255, 0.3)' }}
                className="glass-panel p-8 rounded-2xl border border-white/10 relative flex flex-col justify-between group overflow-hidden"
              >
                {/* Spotlight background hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6C63FF]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Badge & Icon Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-sm">
                      {getIcon(reason.iconName)}
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded bg-[#6C63FF]/10 text-[#8F7BFF] border border-[#6C63FF]/10">
                      {reason.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-4">
                    {reason.title}
                  </h3>
                  
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-1 text-xs font-semibold text-white group-hover:text-[#8F7BFF] transition-colors cursor-pointer" onClick={onOpenOnboarding}>
                  <span>Get Started Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. WHY BRANDS WILL LOVE CREOGRID (Establishing Trust) */}
      <section id="why-brands" className="py-24 relative overflow-hidden bg-white/[0.01] border-y border-white/5">
        <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-[#A855F7]/3 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-[#8F7BFF] uppercase tracking-wider font-mono">
              The Brand Perspective
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-3 mb-4">
              Why Brands Love Creogrid
            </h2>
            <p className="text-text-secondary text-base">
              Even though we are currently onboarding creators first, establishing verified analytics and bulletproof integrity is why premium brands are already queuing up.
            </p>
          </div>

          {/* Brand Benefits Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_BRANDS_LOVE_US.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-white/5 bg-[#111318]/50 flex gap-4 hover:border-white/10 transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                  {getIcon(benefit.iconName)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
