import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';

interface NavigationProps {
  onOpenOnboarding: () => void;
}

export default function Navigation({ onOpenOnboarding }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md py-3 border-b border-slate-100 shadow-sm' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Logo textSize="text-lg sm:text-xl" />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#why-join"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#A23CFF] dark:hover:text-[#A23CFF] transition-colors py-2"
            >
              About
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#A23CFF] dark:hover:text-[#A23CFF] transition-colors py-2"
            >
              FAQ
            </a>
            
            <button
              onClick={onOpenOnboarding}
              className="pill-btn px-6 py-2 bg-gradient-to-r from-[#FF2D7A] to-[#A23CFF] hover:opacity-95 text-white font-medium text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow"
              id="nav-join-btn"
            >
              Join
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 md:hidden transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 md:hidden bg-white/95 backdrop-blur-md p-6 flex flex-col gap-6 border-b border-slate-100 shadow-lg"
          >
            <div className="flex flex-col gap-4">
              <a
                href="#why-join"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                About
              </a>
              <a
                href="#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                FAQ
              </a>
            </div>

            <div className="h-[1px] bg-slate-100 w-full" />

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenOnboarding();
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#FF2D7A] to-[#A23CFF] hover:opacity-95 font-semibold text-sm text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              Join
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
