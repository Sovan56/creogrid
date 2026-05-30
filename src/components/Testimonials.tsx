/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { useMotionSettings } from './MotionContext';
import Reveal from './Reveal';

export default function Testimonials() {
  const { reducedMotion } = useMotionSettings();

  return (
    <section
      id="testimonials"
      className="relative py-24 px-6 overflow-hidden bg-[#0D0D16] border-t border-white/5"
    >
      {/* Background decor lights */}
      <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] bg-[#5B2CFF]/4 rounded-full blur-[90px] -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-[#FF2D7A]/4 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto w-full">
        {/* Header descriptions wrapped in Reveal */}
        <Reveal direction="up" className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono font-bold tracking-wider text-[#FF2D7A] uppercase bg-[#5B2CFF]/10 px-3 py-1 rounded-full border border-[#5B2CFF]/25">
            CLIENT SOCIAL PROOF
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight">
            Loved by modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] via-[#A23CFF] to-[#5B2CFF]">growth</span> brands.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            See how innovative consumer labels are replacing agency retainers and enterprise software with self-serve influencer channels.
          </p>
        </Reveal>

        {/* Testimonial cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-4 text-left">
          {TESTIMONIALS.map((tes, idx) => (
            <Reveal
              key={tes.id}
              direction="up"
              delay={reducedMotion ? 0 : idx * 0.1}
              className="flex font-sans"
            >
              <motion.div
                whileHover={reducedMotion ? {} : { y: -5, borderColor: 'rgba(91, 44, 255, 0.3)', boxShadow: '0 8px 30px rgba(91, 44, 255, 0.08)' }}
                className="glass-panel w-full rounded-2xl p-6 border-white/5 relative flex flex-col justify-between hover:bg-slate-900/40 transition-colors duration-300"
              >
                <div className="space-y-4">
                  {/* Visual styling indicators: stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#FF9A1F] fill-[#FF9A1F]/80 shrink-0" />
                    ))}
                  </div>

                  {/* Main Quote */}
                  <p className="text-sm text-gray-200 leading-relaxed font-normal relative pl-5">
                    <span className="absolute left-0 top-0 text-[#5B2CFF] text-3xl font-serif leading-none select-none">
                      "
                    </span>
                    {tes.quote}
                  </p>
                </div>

                {/* Author info footer detail */}
                <div className="flex items-center gap-3 pt-6 border-t border-white/5 mt-6">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0 bg-zinc-800">
                    <img
                      src={tes.image}
                      alt={tes.author}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{tes.author}</h4>
                    <p className="text-[10px] text-gray-400 mt-1 leading-none font-mono">
                      {tes.role}, <span className="text-[#00E5FF] font-semibold">{tes.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
