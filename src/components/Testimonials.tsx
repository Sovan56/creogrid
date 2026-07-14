import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { Quote, Instagram, Youtube, Linkedin, Twitter } from 'lucide-react';

export default function Testimonials() {
  
  const getPlatformIcon = (platform: 'instagram' | 'youtube' | 'linkedin' | 'twitter') => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'youtube': return <Youtube className="w-4 h-4 text-red-500" />;
      case 'linkedin': return <Linkedin className="w-4 h-4 text-blue-500" />;
      case 'twitter': return <Twitter className="w-4 h-4 text-white" />;
      default: return null;
    }
  };

  return (
    <section id="testimonials" className="py-24 relative bg-[#07070A] overflow-hidden border-t border-white/5">
      {/* Dynamic gradients in background */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-[#6C63FF]/3 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#A855F7]/3 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#8F7BFF] uppercase tracking-wider font-mono">
            Creator-Endorsed
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-4 mb-4">
            Loved By Top-Tier Adopters
          </h2>
          <p className="text-text-secondary text-base">
            See how early founding members are leveraging their Creogrid verified profiles to level up.
          </p>
        </div>

        {/* Testimonial Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.15)' }}
              className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between relative group"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-6 text-white/5 group-hover:text-[#6C63FF]/10 transition-colors">
                <Quote className="w-12 h-12" />
              </div>

              <div className="space-y-6">
                {/* Creator Quote */}
                <p className="text-sm text-text-secondary leading-relaxed italic relative z-10">
                  "{testimonial.quote}"
                </p>

                {/* Profile Header Block */}
                <div className="flex items-center gap-4 border-t border-white/5 pt-5">
                  <div className="w-11 h-11 rounded-full border border-white/10 overflow-hidden shrink-0">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">{testimonial.name}</h4>
                    <p className="text-xs text-text-secondary">@{testimonial.handle}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer: Metrics & social connection */}
              <div className="flex items-center justify-between mt-6 pt-3 border-t border-white/5 text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-text-secondary">
                  <span>Category:</span>
                  <strong className="text-white">{testimonial.category}</strong>
                </div>
                
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-full px-2.5 py-1 text-white">
                  {getPlatformIcon(testimonial.platform)}
                  <span>{testimonial.followers}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
