import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Lenis from 'lenis';

interface MotionContextType {
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const MotionContext = createContext<MotionContextType>({
  reducedMotion: false,
  toggleReducedMotion: () => {},
});

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    // 1. Check local storage
    const saved = localStorage.getItem('creogrid-reduced-motion');
    if (saved !== null) {
      return saved === 'true';
    }
    // 2. Check prefers-reduced-motion media query
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Handle Lenis instance reference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lenis: Lenis | null = null;
    let rafId: number;

    if (!reducedMotion) {
      // Initialize Lenis for buttery-smooth scrolling
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // fast easing
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    } else {
      // Remove lenis classes and reset layout style when disabled
      document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-scrolling');
      document.documentElement.style.scrollBehavior = 'auto';
    }

    return () => {
      if (lenis) {
        lenis.destroy();
      }
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => {
      const next = !prev;
      localStorage.setItem('creogrid-reduced-motion', String(next));
      if (next) {
        document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-scrolling');
        document.documentElement.style.scrollBehavior = 'auto';
      } else {
        document.documentElement.style.scrollBehavior = 'smooth';
      }
      return next;
    });
  };

  return (
    <MotionContext.Provider value={{ reducedMotion, toggleReducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionSettings() {
  return useContext(MotionContext);
}
