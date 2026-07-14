import { Shield, Instagram, Youtube, Linkedin, Twitter, Sparkles } from 'lucide-react';

export default function Footer() {
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07070A] border-t border-white/5 pt-20 pb-12 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#6C63FF]/3 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          {/* Logo Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6C63FF] to-[#A855F7] flex items-center justify-center">
                <Shield className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white">
                Creogrid<span className="text-[#6C63FF]">.in</span>
              </span>
            </a>
            <p className="text-text-secondary text-sm max-w-sm leading-relaxed">
              India's premier creator-first directory. Build one unified verified profile, connect metrics seamlessly, and get discovered by top-tier brands.
            </p>
            
            {/* Social connection handles */}
            <div className="flex gap-3 pt-2">
              <a href="https://instagram.com" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Column 1: Product */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider text-xs">Product</h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#why-join" className="hover:text-white transition-colors">Features</a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">Categories</a>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="hover:text-white transition-colors">Marketplace</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#6C63FF]/15 text-[#8F7BFF] font-bold">Soon</span>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Creators */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider text-xs">Creators</h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <a href="#creators-wall" className="hover:text-white transition-colors">Founding Directory</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">FAQ Support</a>
              </li>
              <li>
                <a href="mailto:onboard@creogrid.in" className="hover:text-white transition-colors font-semibold text-[#8F7BFF]">onboard@creogrid.in</a>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Legal & Admin */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider text-xs">Legal & Privacy</h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Security Standards</span>
              </li>
              <li className="text-xs pt-1">
                <div className="flex items-center gap-1.5 text-[#22C55E]">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Verified Creator Hub active</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/5 w-full my-8" />

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-secondary font-mono">
          <p>© {currentYear} Creogrid.in. All Rights Reserved. Built in India.</p>
          <div className="flex gap-4">
            <span>Security certified</span>
            <span>•</span>
            <span>API Integrity active</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
