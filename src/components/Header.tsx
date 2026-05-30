/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { useMotionSettings } from './MotionContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { reducedMotion, toggleReducedMotion } = useMotionSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Platform Features', href: '#features' },
    { label: 'Creator Discovery', href: '#discovery' },
    { label: 'How it Works', href: '#pipeline' },
    { label: 'ROI Estimator', href: '#calculator' },
    { label: 'FAQs', href: '#faqs' },
  ];

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0D0D16]/90 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Logo />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-gray-300/85 hover:text-white transition-colors duration-200 text-sm font-medium relative py-1 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-alt group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleReducedMotion}
            className="flex items-center gap-1.5 p-2 px-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#5B2CFF]/30 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
            title={reducedMotion ? "Enable cinematic animations" : "Disable animations (Reduced Motion)"}
          >
            {reducedMotion ? (
              <>
                <Moon className="w-4 h-4 text-[#FF9A1F]" />
                <span className="text-[10px] uppercase tracking-wider font-mono font-medium">Calm</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#FF2D7A] animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider font-mono font-medium">Cinema</span>
              </>
            )}
          </button>

          <a
            href="#calculator"
            className="text-gray-300/80 hover:text-white text-sm font-medium transition-colors"
          >
            Launch Calc
          </a>
          <a
            href="#discovery"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-r from-brand-alt via-brand-purple to-brand-primary hover:text-white focus:ring-4 focus:outline-none focus:ring-[#5B2CFF]/30"
          >
            <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-[#0D0D16] rounded-md group-hover:bg-opacity-0 flex items-center gap-1.5">
              <span>Start Free Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white p-1"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0D0D16]/95 border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 pt-2 pb-6 space-y-4">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors py-2 text-base font-medium"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                <button
                  onClick={() => {
                    toggleReducedMotion();
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 rounded-lg text-sm text-gray-300 hover:text-white font-medium transition-all cursor-pointer"
                >
                  {reducedMotion ? (
                    <>
                      <Moon className="w-4 h-4 text-[#FF9A1F]" />
                      <span>Switch to Cinema Mode</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#FF2D7A]" />
                      <span>Switch to Calm Mode</span>
                    </>
                  )}
                </button>
                <a
                  href="#calculator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-gray-300 hover:text-white font-medium"
                >
                  Try ROI Calculator
                </a>
                <a
                  href="#discovery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-gradient-to-r from-brand-alt via-brand-purple to-brand-primary text-white rounded-lg py-3 text-center font-medium shadow-md shadow-[#5B2CFF]/20"
                >
                  Start Free Discovery
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
