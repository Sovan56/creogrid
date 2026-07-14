import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('f1');

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 relative bg-[#07070A] overflow-hidden border-t border-white/5">
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-[#6C63FF]/3 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/8 text-xs font-semibold text-[#8F7BFF] mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#A855F7]" />
            Got Questions?
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-text-secondary text-base">
            Everything you need to know about setting up your Creogrid verified profile and discovering brand sponsorships.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-white/5 bg-[#111318]/50 overflow-hidden transition-all duration-300"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-white pr-4">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#6C63FF]/10 border-[#6C63FF]/20 text-[#8F7BFF]' : 'text-text-secondary'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-0 text-sm text-text-secondary leading-relaxed border-t border-white/5 bg-[#111318]/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer Help */}
        <div className="mt-12 text-center">
          <p className="text-text-secondary text-xs sm:text-sm">
            Still have questions or need custom API setups?{' '}
            <a href="mailto:support@creogrid.in" className="text-[#6C63FF] hover:underline font-semibold">
              Get in touch with support@creogrid.in
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
