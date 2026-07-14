import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  ShieldAlert, 
  Search, 
  Mail, 
  DollarSign, 
  Check, 
  ArrowDown, 
  Sparkles,
  TrendingUp
} from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: '01',
      title: 'Create Profile',
      description: 'Sign up in under 60 seconds. Input your active social handles, select your main niche categories, and customize your professional bio.',
      badge: 'Takes 1 min',
      icon: <User className="w-5 h-5" />,
      preview: (
        <div className="p-4 bg-[#07070A] rounded-xl border border-white/5 space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <div className="h-6 bg-white/5 rounded flex items-center px-2 text-[10px] text-text-secondary">
            creogrid.in/yourname
          </div>
          <div className="h-4 bg-white/3 rounded w-3/4" />
          <div className="h-4 bg-white/3 rounded w-1/2" />
        </div>
      )
    },
    {
      number: '02',
      title: 'Get Verified',
      description: 'Connect your YouTube, Instagram, LinkedIn, or Twitter metrics. Our analytics engine verifies your engagement, authenticity, and target location.',
      badge: 'Automated API check',
      icon: <ShieldAlert className="w-5 h-5 text-[#A855F7]" />,
      preview: (
        <div className="p-4 bg-[#07070A] rounded-xl border border-white/5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary font-mono">Authenticity Index</span>
            <span className="text-[#22C55E] font-bold">98.4%</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <div className="w-[98%] h-full bg-gradient-to-r from-[#6C63FF] to-[#22C55E]" />
          </div>
          <div className="flex items-center gap-1 text-[10px] text-white/80 bg-[#22C55E]/10 border border-[#22C55E]/20 px-2 py-1 rounded-lg">
            <Check className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Integrity Badge Issued</span>
          </div>
        </div>
      )
    },
    {
      number: '03',
      title: 'Appear in Brand Search',
      description: 'Your verified card is instantly published to India’s search portal. Verified brands can query by city, niche, audience metrics, and engagement tiers.',
      badge: 'Priority ranking',
      icon: <Search className="w-5 h-5 text-[#6C63FF]" />,
      preview: (
        <div className="p-4 bg-[#07070A] rounded-xl border border-white/5 space-y-2">
          <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Search query:</p>
          <div className="flex gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-[#6C63FF]/20 text-[9px] text-[#8F7BFF] font-bold border border-[#6C63FF]/30">Mumbai</span>
            <span className="px-2 py-0.5 rounded bg-[#A855F7]/20 text-[9px] text-[#A855F7] font-bold border border-[#A855F7]/30">Tech & AI</span>
            <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-white/80 font-mono font-bold">Followers &gt; 100K</span>
          </div>
          <div className="h-[1px] bg-white/5 my-1" />
          <div className="text-[9px] text-[#22C55E] flex items-center gap-1">
            <span>● 45 match results found</span>
          </div>
        </div>
      )
    },
    {
      number: '04',
      title: 'Receive Collaboration Requests',
      description: 'Say goodbye to cold email follow-ups. Brands submit comprehensive campaign briefs and budget bids directly through Creogrid.',
      badge: 'No agency middlemen',
      icon: <Mail className="w-5 h-5 text-[#8F7BFF]" />,
      preview: (
        <div className="p-4 bg-[#07070A] rounded-xl border border-white/5 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-[11px]">Brand Proposal</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#6C63FF]/10 text-[#8F7BFF] font-bold">High Match</span>
          </div>
          <p className="text-[10px] text-text-secondary">"We’d love to sponsor a dedicated YouTube segment about our software launch."</p>
          <div className="flex justify-between items-center bg-white/3 p-1.5 rounded text-[10px]">
            <span className="text-text-secondary">Bid Value:</span>
            <span className="text-[#22C55E] font-bold">₹75,000 INR</span>
          </div>
        </div>
      )
    },
    {
      number: '05',
      title: 'Earn More',
      description: 'Erase payout anxiety. Review digital contract terms, approve creative guidelines, lock payments in escrow, and get paid securely upon completion.',
      badge: 'Guaranteed Payouts',
      icon: <DollarSign className="w-5 h-5 text-[#22C55E]" />,
      preview: (
        <div className="p-4 bg-[#07070A] rounded-xl border border-white/5 space-y-2 text-center">
          <p className="text-[10px] text-text-secondary uppercase">Secure Escrow Wallet</p>
          <h4 className="font-display font-extrabold text-[#22C55E] text-base">₹1,45,000.00</h4>
          <div className="inline-flex items-center gap-1 bg-[#22C55E]/10 border border-[#22C55E]/20 text-[9px] text-[#22C55E] py-0.5 px-2 rounded-full">
            <TrendingUp className="w-3 h-3" />
            <span>Creator Revenue +32% Year-to-date</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative bg-gradient-to-b from-[#07070A] via-[#111318]/20 to-[#07070A] overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6C63FF]/3 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/8 text-xs font-semibold text-[#8F7BFF] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
            Onboarding Timeline
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            How Creogrid Works
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            We've simplified the creator discovery experience into five seamless, direct steps.
          </p>
        </div>

        {/* Timelines Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          
          {/* Left: Detailed Steps List */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((step, index) => {
              const isSelected = activeStep === index;
              return (
                <motion.div
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  onMouseEnter={() => setActiveStep(index)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-5 items-start ${
                    isSelected 
                      ? 'bg-[#111318] border-white/10 shadow-lg glow-primary' 
                      : 'bg-[#111318]/40 border-white/5 opacity-70 hover:opacity-100 hover:border-white/10'
                  }`}
                >
                  {/* Step Number Circle */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-display font-bold text-sm ${
                    isSelected 
                      ? 'bg-[#6C63FF] text-white shadow-md shadow-[#6C63FF]/30' 
                      : 'bg-white/5 text-text-secondary'
                  }`}>
                    {step.number}
                  </div>

                  {/* Step Description */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display font-bold text-lg text-white">
                        {step.title}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/8 text-text-secondary">
                        {step.badge}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Live Mock Preview (Dynamic based on selected step) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="p-8 rounded-3xl border border-white/10 bg-[#111318] relative glow-primary overflow-hidden">
              {/* Background gradient orb */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-tr from-[#6C63FF]/20 to-[#A855F7]/10 blur-[30px] rounded-full pointer-events-none" />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#6C63FF]/15 flex items-center justify-center text-[#8F7BFF]">
                    {steps[activeStep].icon}
                  </div>
                  <span className="font-mono text-xs text-text-secondary uppercase tracking-widest font-bold">Step {steps[activeStep].number} Visualizer</span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-ping" />
              </div>

              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Simulated component state */}
                {steps[activeStep].preview}

                <div className="h-[1px] bg-white/5 w-full" />

                <div className="space-y-2 text-xs">
                  <p className="text-white font-semibold">Creator Milestones Achieved:</p>
                  <ul className="space-y-1 text-text-secondary text-[11px] list-disc list-inside">
                    <li>Dynamic verification token emitted</li>
                    <li>Automatic cross-platform API metric sync</li>
                    <li>Priority indexed in the Creogrid search registry</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Micro-incentive tooltip */}
            <div className="mt-4 text-center">
              <span className="text-[11px] font-mono text-text-secondary">
                ⚡ Need help connecting handles? <strong>Support assistants available 24/7</strong> after onboarding
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
