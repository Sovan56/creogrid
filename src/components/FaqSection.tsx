/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { animate, motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faqs"
      className="relative py-24 px-6 overflow-hidden bg-brand-bg bg-grid"
    >
      {/* Background lights decor */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-brand-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-[#a855f7]/5 rounded-full blur-[80px] -z-10" />

      <div className="max-w-4xl mx-auto w-full">
        {/* Title elements */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono font-bold tracking-wider text-brand-accent uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/25">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight animate-fade-in">
            Looking for answers? <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-brand-accent">We got you</span>.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Can’t find what you are looking for? Reach out to support anywhere inside the platform console.
          </p>
        </div>

        {/* FAQ Accordion container */}
        <div className="space-y-4 pt-2">
          {FAQS.map((faq) => {
            const isOpen = faq.id === openId;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-indigo-950/20 border-brand-primary/30 shadow-[0_0_15px_rgba(99,102,241,0.06)]'
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                }`}
              >
                {/* Accordion header button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 md:p-6 text-left flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-brand-accent' : 'text-gray-400'}`} />
                    <span className="text-sm md:text-base font-semibold text-white tracking-tight">
                      {faq.question}
                    </span>
                  </div>
                  <span className="shrink-0 p-1 rounded-lg bg-white/5 border border-white/5 text-gray-400">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {/* Collapsible response body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-xs md:text-sm text-gray-300 leading-relaxed max-w-3xl pr-8 text-left border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
