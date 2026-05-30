/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { label: 'How it Flows', href: '#pipeline' },
    { label: 'ROI Estimator', href: '#calculator' },
    { label: 'FAQs', href: '#faqs' },
  ];

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090710]/80 backdrop-blur-md border-b border-indigo-500/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-tr from-brand-primary to-brand-alt shadow-[0_0_15px_rgba(99,102,241,0.5)] overflow-hidden">
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
          </div>
          <span className="font-display font-medium text-lg md:text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            Influence<span className="text-brand-alt font-bold">Flow</span>
            <span className="text-xs ml-1 text-brand-accent px-1.5 py-0.5 roundedbg bg-indigo-500/10 border border-indigo-500/20 font-mono">
              Spot
            </span>
          </span>
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
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-accent group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#calculator"
            className="text-gray-300/80 hover:text-white text-sm font-medium transition-colors"
          >
            Launch Calc
          </a>
          <a
            href="#discovery"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-800"
          >
            <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center gap-1.5">
              <span>Start Free Flow</span>
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
            className="md:hidden bg-[#090710]/95 border-b border-indigo-500/15 overflow-hidden"
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
              <div className="pt-4 border-t border-indigo-500/10 flex flex-col gap-3">
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
                  className="bg-gradient-to-r from-brand-primary to-brand-alt text-white rounded-lg py-3 text-center font-medium shadow-md shadow-indigo-500/20"
                >
                  Start Campaign Flow
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
