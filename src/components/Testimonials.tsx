/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-24 px-6 overflow-hidden bg-[#0a0712] border-t border-indigo-500/5"
    >
      {/* Background decor lights */}
      <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[90px] -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-brand-alt/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto w-full">
        {/* Header descriptions */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono font-bold tracking-wider text-brand-accent uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/25">
            CLIENT SOCIAL PROOF
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight">
            Loved by modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">growth</span> brands.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            See how innovative consumer labels are replacing agency retainers and enterprise software with self-serve influencer channels.
          </p>
        </div>

        {/* Testimonial cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-4">
          {TESTIMONIALS.map((tes, idx) => (
            <motion.div
              key={tes.id}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-panel rounded-2xl p-6 border-white/5 relative flex flex-col justify-between text-left"
            >
              <div className="space-y-4">
                {/* Visual styling indicators: stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-brand-accent fill-brand-accent/80 shrink-0" />
                  ))}
                </div>

                {/* Main Quote */}
                <p className="text-sm text-gray-200 leading-relaxed font-sans font-normal relative pl-5">
                  <span className="absolute left-0 top-0 text-brand-primary text-3xl font-serif leading-none">
                    "
                  </span>
                  {tes.quote}
                </p>
              </div>

              {/* Author info footer detail split */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/5 mt-6">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0 bg-zinc-800">
                  <img
                    src={tes.image}
                    alt={tes.author}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left font-sans">
                  <h4 className="text-xs font-bold text-white leading-tight">{tes.author}</h4>
                  <p className="text-[10px] text-gray-400 mt-1 leading-none font-mono">
                    {tes.role}, <span className="text-brand-accent font-semibold">{tes.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
