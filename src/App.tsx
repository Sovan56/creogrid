import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './components/Logo';
import AdminPanel from './components/AdminPanel';
import { INITIAL_CREATORS } from './data';
import { Creator } from './types';
import { 
  ArrowRight, 
  ArrowUpRight,
  Shield, 
  Check, 
  X, 
  Star, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Heart, 
  Sparkles, 
  Compass, 
  Camera, 
  Activity, 
  Utensils, 
  Gamepad2, 
  Dumbbell, 
  Laptop, 
  PiggyBank, 
  BookOpen, 
  Smile, 
  Briefcase,
  Sun,
  Moon,
  Layers,
  Flame,
  Award,
  Zap,
  CheckCircle,
  Users,
  Search,
  Lock,
  Globe,
  Plus,
  Send,
  Sparkle
} from 'lucide-react';

// In-memory safe storage helper (strictly no local storage used)
const memoryStorage: Record<string, string> = {};
const safeStorage = {
  getItem: (key: string): string | null => {
    return memoryStorage[key] || null;
  },
  setItem: (key: string, value: string): void => {
    memoryStorage[key] = value;
  }
};

// Interfaces
interface Campaign {
  id: string;
  brand: string;
  logoBg: string;
  logoText: string;
  title: string;
  budget: string;
  niche: string;
  deadline: string;
}

interface Testimonial {
  name: string;
  handle: string;
  avatar: string;
  followers: string;
  quote: string;
  stars: number;
}

interface CreatorCategory {
  name: string;
  emoji: string;
  color: string;
}

// Custom Confetti Particle for Success Celebration
const ConfettiParticle = ({ delay, color }: { delay: number; color: string; key?: number }) => {
  const randomX = Math.random() * 400 - 200;
  const randomY = Math.random() * -300 - 150;
  return (
    <motion.div
      initial={{ opacity: 1, x: 0, y: 0, scale: 0.5, rotate: 0 }}
      animate={{ 
        opacity: [1, 1, 0], 
        x: randomX, 
        y: randomY, 
        scale: [0.5, 1, 0.2],
        rotate: Math.random() * 360
      }}
      transition={{ duration: 1.8, delay: delay, ease: "easeOut" }}
      style={{ backgroundColor: color }}
      className="absolute w-2.5 h-2.5 rounded-sm"
    />
  );
};

export default function App() {
  // Navigation active states
  const [isScrolled, setIsScrolled] = useState(false);

  // Admin Console States
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [creators, setCreators] = useState<Creator[]>(INITIAL_CREATORS);

  // Theme state: default to dark (matches the high-fidelity dark mockups from branding)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = safeStorage.getItem('creogrid-theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    safeStorage.setItem('creogrid-theme', theme);
  }, [theme]);

  // Support direct URL parameter for admin access, e.g. ?admin=true
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdminMode(true);
    }
  }, []);
  
  // Dashboard Interactive States
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'campaigns' | 'analytics'>('overview');
  const [isOfferAccepted, setIsOfferAccepted] = useState(false);
  const [campaignSearchText, setCampaignSearchText] = useState('');

  // Live Campaigns State
  const [appliedCampaigns, setAppliedCampaigns] = useState<string[]>([]);

  // FAQ Accordion Active Index
  const [faqActiveIndex, setFaqActiveIndex] = useState<number | null>(null);

  // Onboarding Modal Wizard State
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  
  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    category: 'Fashion',
    instagramLink: '',
    youtubeLink: '',
    followers: '',
    engagement: '5.2',
    language: 'English, Hindi',
    location: 'Mumbai'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [passNumber, setPassNumber] = useState(4812);
  const [hasCreatedProfile, setHasCreatedProfile] = useState(false);

  // Scroll references
  const mainRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const whyUsRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Quick Action: Apply to Campaign
  const handleCampaignApply = (campaignId: string) => {
    if (!hasCreatedProfile) {
      // Prompt user to sign up
      setIsSignUpOpen(true);
      setOnboardingStep(1);
    } else {
      if (!appliedCampaigns.includes(campaignId)) {
        setAppliedCampaigns([...appliedCampaigns, campaignId]);
      }
    }
  };

  // Onboarding validation
  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid phone number is required';
    if (!formData.password || formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    const errors: Record<string, string> = {};
    if (!formData.instagramLink.trim() && !formData.youtubeLink.trim()) {
      errors.socials = 'Please provide at least one social handle or link';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep4 = () => {
    const errors: Record<string, string> = {};
    if (!formData.followers.trim() || isNaN(Number(formData.followers))) {
      errors.followers = 'Followers count must be a number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (onboardingStep === 1) {
      if (validateStep1()) {
        setOnboardingStep(2);
      }
    } else if (onboardingStep === 2) {
      setOnboardingStep(3);
    } else if (onboardingStep === 3) {
      if (validateStep3()) {
        setOnboardingStep(4);
      }
    } else if (onboardingStep === 4) {
      if (validateStep4()) {
        // Successful generation
        const generatedPass = Math.floor(1000 + Math.random() * 9000);
        setPassNumber(generatedPass);
        setHasCreatedProfile(true);
        setOnboardingStep(5);
        
        // Save to local storage for persistence simulation
        safeStorage.setItem('creogrid_user_profile', JSON.stringify({
          ...formData,
          passNumber: generatedPass,
          dateJoined: new Date().toLocaleDateString()
        }));
      }
    }
  };

  // Smooth scroll
  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Brand partners list
  const brands = [
    { name: "Levi's", logo: "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=120&h=40&fit=crop&q=80", bg: "bg-red-50 text-red-600" },
    { name: "AJIO", logo: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=120&h=40&fit=crop&q=80", bg: "bg-blue-50 text-blue-600" },
    { name: "Mamaearth", logo: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=120&h=40&fit=crop&q=80", bg: "bg-emerald-50 text-emerald-600" },
    { name: "Boat", logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=120&h=40&fit=crop&q=80", bg: "bg-slate-900 text-white" },
    { name: "Nykaa", logo: "https://images.unsplash.com/photo-1614680376757-85a24f43b35f?w=120&h=40&fit=crop&q=80", bg: "bg-pink-50 text-pink-600" },
    { name: "Myntra", logo: "https://images.unsplash.com/photo-1614680376555-4ea583a48cc7?w=120&h=40&fit=crop&q=80", bg: "bg-orange-50 text-orange-600" },
    { name: "Amazon", logo: "https://images.unsplash.com/photo-1614680376784-18d36ebbc5e4?w=120&h=40&fit=crop&q=80", bg: "bg-amber-50 text-amber-700" },
    { name: "Flipkart", logo: "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=120&h=40&fit=crop&q=80", bg: "bg-sky-50 text-sky-600" }
  ];

  // Creator categories
  const categories: CreatorCategory[] = [
    { name: 'Fashion', emoji: '👗', color: 'bg-rose-50 text-rose-600' },
    { name: 'Beauty', emoji: '💄', color: 'bg-pink-50 text-pink-600' },
    { name: 'Travel', emoji: '✈️', color: 'bg-sky-50 text-sky-600' },
    { name: 'Food', emoji: '🍔', color: 'bg-amber-50 text-amber-600' },
    { name: 'Gaming', emoji: '🎮', color: 'bg-violet-50 text-violet-600' },
    { name: 'Fitness', emoji: '💪', color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Technology', emoji: '💻', color: 'bg-blue-50 text-blue-600' },
    { name: 'Finance', emoji: '📈', color: 'bg-teal-50 text-teal-600' },
    { name: 'Education', emoji: '📚', color: 'bg-indigo-50 text-indigo-600' },
    { name: 'Comedy', emoji: '🎭', color: 'bg-yellow-50 text-yellow-600' },
    { name: 'Photography', emoji: '📸', color: 'bg-purple-50 text-purple-600' },
    { name: 'Lifestyle', emoji: '🌿', color: 'bg-orange-50 text-orange-600' },
    { name: 'UGC Creator', emoji: '📱', color: 'bg-neutral-100 text-neutral-800' }
  ];

  // Live campaigns data
  const campaigns: Campaign[] = [
    { id: '1', brand: "Levi's", logoBg: "bg-red-600", logoText: "L", title: "Autumn Denim Lookbook 2026", budget: "₹45,000 - ₹60,000", niche: "Fashion & Lifestyle", deadline: "July 28, 2026" },
    { id: '2', brand: "Boat", logoBg: "bg-black", logoText: "B", title: "Nirvana Earbuds Pro Unboxing", budget: "₹35,000 - ₹50,000", niche: "Technology & Music", deadline: "August 02, 2026" },
    { id: '3', brand: "Mamaearth", logoBg: "bg-emerald-600", logoText: "M", title: "Monsoon Haircare Secrets Video", budget: "₹25,000 - ₹35,000", niche: "Beauty & Health", deadline: "July 31, 2026" },
    { id: '4', brand: "Myntra", logoBg: "bg-orange-600", logoText: "M", title: "Big Fashion Festival Styling Vlog", budget: "₹75,000 - ₹1,00,000", niche: "UGC / Fashion", deadline: "August 12, 2026" },
    { id: '5', brand: "AJIO", logoBg: "bg-indigo-600", logoText: "A", title: "AJIO Luxe Wardrobe Transformation", budget: "₹60,000 - ₹85,000", niche: "Luxury & Fashion", deadline: "August 05, 2026" },
    { id: '6', brand: "Nykaa", logoBg: "bg-pink-600", logoText: "N", title: "Glow Essentials Tutorial Carousel", budget: "₹40,000 - ₹55,000", niche: "Beauty & Makeup", deadline: "August 15, 2026" }
  ];

  // Testimonials
  const testimonials: Testimonial[] = [
    { name: 'Riya Sen', handle: '@riya_styles', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces', followers: '620K', quote: "Finally... someone built this for creators. The profile is stunning and I got 3 premium campaigns in my first week!", stars: 5 },
    { name: 'Kabir Verma', handle: '@kabir_tech', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces', followers: '340K', quote: "The verification process is super seamless. My brands trust my profile score and directly book me through Creogrid.", stars: 5 },
    { name: 'Aditi Sharma', handle: '@adititravels', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces', followers: '1.2M', quote: "Pure perfection. No agency commission cut, no endless WhatsApp groups. Real brand offers arrive in my dashboard directly.", stars: 5 }
  ];

  // Marquee avatars
  const marqueeAvatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=faces',
  ];

  // FAQs
  const faqs = [
    { question: "Is Creogrid a talent management agency?", answer: "No, Creogrid is a premium decentralized discovery platform. We do not act as agents or lock you into exclusivity contracts. We provide a professional digital workstation profile so you can manage brand offers directly without high middleman commission fees." },
    { question: "How does the verification badge work?", answer: "When you sign up, you securely authenticate your platform insights. Creogrid's engine analyzes your active audience, growth, and real engagement levels to award a verified score badge, which brands use to directly identify top-performing influencers." },
    { question: "Is there a fee for joining?", answer: "Creogrid is absolutely free for creators to set up their profile, get verified, and search campaigns. We want to onboard India's top 10,000 founding creators with complete access to basic features forever." },
    { question: "How do brands pay me?", answer: "Payments are processed directly between you and the brand, or secured via safe escrows depending on the campaign. Creogrid guarantees 0% commission on your earnings." },
    { question: "What counts as a founding creator?", answer: "The first 10,000 creators registered on Creogrid obtain the limited 'Founding Creator' golden badge on their digital profile. This guarantees lifetime top ranking inside our brand search portal, premium campaign exposure, and priority customer support." }
  ];

  if (isAdminMode) {
    return (
      <AdminPanel
        creators={creators}
        setCreators={setCreators}
        onClose={() => setIsAdminMode(false)}
        theme={theme}
        setTheme={setTheme}
      />
    );
  }

  return (
    <div className="bg-bg-main text-text-main min-h-screen relative font-sans selection:bg-[#A23CFF]/15 selection:text-[#A23CFF] antialiased transition-colors duration-300">
      
      {/* 1. NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-[#0D0D16]/90 backdrop-blur-xl border-b border-slate-100 dark:border-white/10 py-3 shadow-md' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <Logo textSize="text-lg sm:text-xl" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo(whyUsRef)}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#A23CFF] dark:hover:text-[#A23CFF] transition-colors py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollTo(howItWorksRef)}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#A23CFF] dark:hover:text-[#A23CFF] transition-colors py-2"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo(faqRef)}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#A23CFF] dark:hover:text-[#A23CFF] transition-colors py-2"
            >
              FAQ
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Smooth Animated Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-full border border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-all cursor-pointer flex items-center justify-center"
              aria-label="Toggle Theme"
              id="theme-toggle-btn"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#FF9A1F]" />
              ) : (
                <Moon className="w-4 h-4 text-[#5B2CFF]" />
              )}
            </button>

            <button
              onClick={() => {
                setIsSignUpOpen(true);
                setOnboardingStep(1);
              }}
              className="pill-btn px-6 py-2.5 bg-gradient-to-r from-[#FF2D7A] to-[#A23CFF] hover:opacity-95 text-white font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#A23CFF]/15"
              id="header-cta"
            >
              {hasCreatedProfile ? 'My Profile' : 'Join Now'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-36 overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white dark:from-[#0D0D16] dark:via-[#09090F] dark:to-[#09090F]">
        
        {/* Background glow flares */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-200/25 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200/25 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/50 dark:bg-indigo-950/40 dark:border-indigo-900/40 text-xs font-semibold text-[#6C63FF] dark:text-indigo-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#6C63FF]" />
              <span>India's Next Home for Creators</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.08]"
              >
                Get Paid <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] via-[#8B5CF6] to-[#6C63FF]">
                  Collaborations
                </span> <br />
                with India's Top Brands.
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-500 dark:text-slate-300 text-lg sm:text-xl font-medium max-w-xl leading-relaxed"
              >
                Join India's fastest-growing creator community. Build one professional creator profile, get discovered, and receive paid campaign requests directly.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            >
              <button
                onClick={() => {
                  setIsSignUpOpen(true);
                  setOnboardingStep(1);
                }}
                className="pill-btn w-full sm:w-auto px-8 py-4 bg-[#6C63FF] hover:bg-[#5B52EE] text-white font-bold text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                id="hero-primary-cta"
              >
                Become a Founding Creator
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollTo(howItWorksRef)}
                className="pill-btn w-full sm:w-auto px-8 py-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                See How It Works
              </button>
            </motion.div>

            {/* Quick trust taglines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center gap-6 pt-4 border-t border-slate-100/70 dark:border-slate-800/70"
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                <span>0% Agency Commission</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                <span>Direct Brand Escrow</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Dashboard Mockup & Floating Cards */}
          <div className="lg:col-span-6 relative mt-12 lg:mt-0">
            
            {/* Visual background shadows/glows */}
            <div className="absolute inset-0 bg-[#6C63FF]/5 rounded-[32px] filter blur-2xl transform rotate-3 scale-95 pointer-events-none" />

            {/* Interactive Dashboard Workspace in Laptop Mockup */}
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden z-10">
              
              {/* Window Header */}
              <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                </div>
                <div className="bg-slate-200/60 dark:bg-slate-700 rounded-md text-[10px] font-mono px-4 py-0.5 text-slate-500 dark:text-slate-400">
                  creogrid.in/dashboard/kabir_v
                </div>
                <div className="w-6" />
              </div>

              {/* Dashboard Content */}
              <div className="p-5 space-y-5">
                
                {/* Header profile row */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces" 
                      alt="Kabir Verma" 
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-950"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Kabir Verma</h4>
                        <span className="bg-indigo-50 dark:bg-indigo-950/40 text-[#6C63FF] dark:text-indigo-400 text-[9px] px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" /> Verified
                        </span>
                      </div>
                      <p className="text-[11px] font-medium text-slate-400 dark:text-slate-300">@kabir_tech • Mumbai, IN</p>
                    </div>
                  </div>

                  <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    <button 
                      onClick={() => setDashboardTab('overview')} 
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${dashboardTab === 'overview' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'hover:text-slate-900 dark:hover:text-slate-200'}`}
                    >
                      Overview
                    </button>
                    <button 
                      onClick={() => setDashboardTab('campaigns')} 
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${dashboardTab === 'campaigns' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'hover:text-slate-900 dark:hover:text-slate-200'}`}
                    >
                      Campaigns
                    </button>
                    <button 
                      onClick={() => setDashboardTab('analytics')} 
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${dashboardTab === 'analytics' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'hover:text-slate-900 dark:hover:text-slate-200'}`}
                    >
                      Analytics
                    </button>
                  </div>
                </div>

                {/* Dashboard Tab Content */}
                <AnimatePresence mode="wait">
                  {dashboardTab === 'overview' && (
                    <motion.div 
                      key="overview"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="grid grid-cols-3 gap-3"
                    >
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100/70 dark:border-slate-800/40 text-center">
                        <span className="text-[10px] text-slate-400 dark:text-slate-300 font-bold uppercase tracking-wider">Followers</span>
                        <h5 className="font-extrabold text-base text-slate-900 dark:text-white mt-1">340.2K</h5>
                        <span className="text-[9px] text-emerald-500 font-bold">+4.2% this week</span>
                      </div>
                      <div className="p-3 bg-indigo-50/20 dark:bg-indigo-950/30 rounded-xl border border-indigo-100/30 dark:border-indigo-900/30 text-center">
                        <span className="text-[10px] text-indigo-400 dark:text-indigo-300 font-bold uppercase tracking-wider">Profile Score</span>
                        <h5 className="font-extrabold text-base text-[#6C63FF] dark:text-indigo-400 mt-1">94 / 100</h5>
                        <span className="text-[9px] text-indigo-500 dark:text-indigo-300 font-bold">Top 1% Creator</span>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100/70 dark:border-slate-800/40 text-center">
                        <span className="text-[10px] text-slate-400 dark:text-slate-300 font-bold uppercase tracking-wider">Earnings</span>
                        <h5 className="font-extrabold text-base text-slate-900 dark:text-white mt-1">₹1,84,000</h5>
                        <span className="text-[9px] text-slate-500 dark:text-slate-300 font-bold">3 paid this month</span>
                      </div>
                    </motion.div>
                  )}

                  {dashboardTab === 'campaigns' && (
                    <motion.div 
                      key="campaigns"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center p-2.5 bg-indigo-50/30 dark:bg-indigo-950/20 rounded-xl border border-indigo-100/20 dark:border-indigo-900/30">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-black dark:bg-slate-800 text-white font-bold flex items-center justify-center text-xs">b</span>
                          <div>
                            <h5 className="font-bold text-xs text-slate-900 dark:text-white">Boat Bluetooth Speaker Reveal</h5>
                            <p className="text-[9px] text-slate-400 dark:text-slate-300">Budget: ₹45,000 • In Review</p>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">In Review</span>
                      </div>
                      <div className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">M</span>
                          <div>
                            <h5 className="font-bold text-xs text-slate-900 dark:text-white">Mamaearth Onion Hair Oil</h5>
                            <p className="text-[9px] text-slate-400 dark:text-slate-300">Budget: ₹32,000 • Active</p>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">Milestone 1 Paid</span>
                      </div>
                    </motion.div>
                  )}

                  {dashboardTab === 'analytics' && (
                    <motion.div 
                      key="analytics"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-3"
                    >
                      <div>
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-slate-300 mb-1">
                          <span>Engagement Rate</span>
                          <span className="text-slate-900 dark:text-white">6.84% (Very High)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '78%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-slate-300 mb-1">
                          <span>Male / Female Audience</span>
                          <span className="text-slate-900 dark:text-white">42% / 58%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                          <div className="h-full bg-[#6C63FF]" style={{ width: '42%' }} />
                          <div className="h-full bg-pink-400" style={{ width: '58%' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dashboard Bottom Graph Preview */}
                <div className="pt-2">
                  <span className="text-[10px] text-slate-400 dark:text-slate-300 font-bold uppercase tracking-wider block mb-2">Discovery Traffic Profile</span>
                  <div className="h-16 flex items-end gap-1 px-1">
                    {[30, 45, 35, 60, 40, 80, 50, 95, 70, 90, 110, 85].map((val, idx) => (
                      <div key={idx} className="flex-1 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-t-sm transition-colors relative group h-full flex items-end">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${val / 1.2}%` }}
                          transition={{ duration: 1, delay: idx * 0.05 }}
                          className="w-full bg-gradient-to-t from-[#6C63FF]/70 to-[#8B5CF6]/90 rounded-t-sm" 
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* FLOATING CARD 1: Brand Offer ₹25,000 Campaign */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg rounded-2xl p-4 max-w-xs z-20 flex gap-3.5 items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">New Paid Offer</span>
                </div>
                <div>
                  <h5 className="font-extrabold text-xs text-slate-900 dark:text-white">AJIO Luxe Shoot</h5>
                  <p className="text-[10px] font-bold text-[#6C63FF] dark:text-indigo-400">₹25,000 Offered</p>
                </div>
                <button 
                  onClick={() => setIsOfferAccepted(!isOfferAccepted)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                    isOfferAccepted 
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
                      : 'bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-[#6C63FF] dark:text-indigo-400'
                  }`}
                >
                  {isOfferAccepted ? '✓ Accepted' : 'Accept Offer'}
                </button>
              </div>
            </motion.div>

            {/* FLOATING CARD 2: Verified Badge and Profile Score */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg rounded-2xl p-4 flex items-center gap-3.5 z-20"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-6 h-6 text-emerald-500 fill-emerald-100 dark:fill-emerald-950/40" />
              </div>
              <div>
                <h6 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1">
                  Verified Creator <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
                </h6>
                <p className="text-[10px] font-medium text-slate-400 dark:text-slate-300">Score Rank: Top 1.2%</p>
              </div>
            </motion.div>

            {/* FLOATING CARD 3: Follower metrics badge */}
            <motion.div 
              animate={{ x: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="absolute bottom-1/3 -right-10 bg-slate-900 text-white rounded-2xl p-3 shadow-lg flex items-center gap-2.5 z-20"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <div className="font-mono">
                <p className="text-[9px] text-slate-400 leading-none">Reach</p>
                <p className="text-xs font-bold leading-none mt-1">1.8M+</p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. SOCIAL PROOF & CREATOR COUNTER */}
      <section className="py-16 bg-slate-50 dark:bg-[#09090F] border-y border-slate-100 dark:border-white/5 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Logo Marquee intro label */}
          <div className="lg:col-span-3 text-left space-y-1">
            <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase">TRUSTED BY THE BEST</h4>
            <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">Campaigns powered from premier houses</h3>
          </div>

          {/* Marquee Grid */}
          <div className="lg:col-span-5 flex flex-wrap gap-4 items-center justify-start lg:justify-between">
            {brands.slice(0, 6).map((brand) => (
              <div key={brand.name} className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#151523] border border-slate-100 dark:border-white/5 shadow-sm flex items-center gap-1.5">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${brand.bg}`}>{brand.name}</span>
              </div>
            ))}
          </div>

          {/* Goals and Progress counter */}
          <div className="lg:col-span-4 bg-white dark:bg-[#151523] rounded-2xl p-6 border border-slate-100 dark:border-white/5 shadow-sm space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-500 dark:text-slate-300">FOUNDING CREATORS DIRECTORY GOAL</span>
              <span className="font-mono font-bold text-[#6C63FF]">4,812 / 10,000</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-3 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] rounded-full transition-all duration-500" 
                style={{ width: '48.12%' }} 
              />
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>Launch Phase 1</span>
              <span className="text-emerald-500 font-bold">51.8% seats left</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CREATOR CATEGORIES */}
      <section id="categories" className="py-32 bg-white dark:bg-[#0D0D16]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-xl mx-auto mb-20 space-y-3">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Built For Every Creator
            </h2>
            <p className="text-slate-500 dark:text-slate-300 text-sm sm:text-base font-medium">
              A premium space designed around the unique insights of every content field.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="soft-card p-6 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className={`w-11 h-11 rounded-xl ${cat.color} flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform`}>
                    {cat.emoji}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-slate-900 dark:text-white tracking-tight">
                      {cat.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Verified listing standard</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-50 dark:border-white/5 mt-5 flex items-center justify-between text-xs font-semibold text-[#6C63FF] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Get Placement</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. WHY CREOGRID */}
      <section ref={whyUsRef} id="why-join" className="py-32 bg-slate-50 dark:bg-[#09090F] border-y border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-xl mx-auto mb-20 space-y-3">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Why Join Creogrid?
            </h2>
            <p className="text-slate-500 dark:text-slate-300 text-sm sm:text-base font-medium">
              We align with modern tech-standards to deliver the highest visibility and conversions for creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Feature 1 */}
            <div className="soft-card p-10 bg-white dark:bg-[#151523] flex gap-6 items-start border border-slate-100/60 dark:border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-[#6C63FF] flex-shrink-0">
                <Flame className="w-6 h-6 text-[#6C63FF]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  Paid Brand Campaigns
                </h3>
                <p className="text-slate-500 dark:text-slate-300 text-sm leading-relaxed font-medium">
                  Get directly linked with verified campaign briefs. Receive direct campaign requests straight inside your workspace and respond at your own terms.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="soft-card p-10 bg-white dark:bg-[#151523] flex gap-6 items-start border border-slate-100/60 dark:border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-[#6C63FF] flex-shrink-0">
                <Users className="w-6 h-6 text-[#6C63FF]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  UGC Opportunities
                </h3>
                <p className="text-slate-500 dark:text-slate-300 text-sm leading-relaxed font-medium">
                  We showcase independent UGC creators directly to digital-first brands seeking raw talent, ensuring continuous gigs without high agency retainers.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="soft-card p-10 bg-white dark:bg-[#151523] flex gap-6 items-start border border-slate-100/60 dark:border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-[#6C63FF] flex-shrink-0">
                <Zap className="w-6 h-6 text-[#6C63FF]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  Fast Creator Verification
                </h3>
                <p className="text-slate-500 dark:text-slate-300 text-sm leading-relaxed font-medium">
                  Connect social credentials securely. Our smart engine verifies your insights in 90 seconds, adding high trust score metrics that brands immediately buy into.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="soft-card p-10 bg-white dark:bg-[#151523] flex gap-6 items-start border border-slate-100/60 dark:border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-[#6C63FF] flex-shrink-0">
                <Award className="w-6 h-6 text-[#6C63FF]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  Weekly Brand Collaborations
                </h3>
                <p className="text-slate-500 dark:text-slate-300 text-sm leading-relaxed font-medium">
                  Dozens of hand-verified brands list live briefs weekly. Find the ideal alignment with your audience and get direct payment releases.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. HOW IT WORKS TIMELINE */}
      <section ref={howItWorksRef} id="how-it-works" className="py-32 bg-white dark:bg-[#0D0D16] relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-xl mx-auto mb-24 space-y-3">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Join in 5 Steps
            </h2>
            <p className="text-slate-500 dark:text-slate-300 text-sm sm:text-base font-medium">
              Your professional journey from creation to payouts in 5 absolute milestones.
            </p>
          </div>

          <div className="relative border-l border-slate-100 dark:border-white/5 ml-4 md:ml-12 space-y-16">
            
            {/* Step 1 */}
            <div className="relative pl-10 md:pl-16">
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-display font-bold text-sm shadow-md">
                1
              </div>
              <div className="space-y-2">
                <span className="text-[10px] text-[#6C63FF] font-bold tracking-widest uppercase font-mono">Milestone 01</span>
                <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Create Your Creator Profile</h3>
                <p className="text-slate-500 dark:text-slate-300 text-sm max-w-xl leading-relaxed font-medium">
                  Input your fundamental details. Establish a custom, shareable Creogrid handle link (e.g., creogrid.in/yourname) that acts as your premium media kit page.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative pl-10 md:pl-16">
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-display font-bold text-sm shadow-md">
                2
              </div>
              <div className="space-y-2">
                <span className="text-[10px] text-[#6C63FF] font-bold tracking-widest uppercase font-mono">Milestone 02</span>
                <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Connect Social Accounts</h3>
                <p className="text-slate-500 dark:text-slate-300 text-sm max-w-xl leading-relaxed font-medium">
                  Connect your Instagram, YouTube, or other channels securely. No passwords requested—just raw links or insights integration.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative pl-10 md:pl-16">
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-display font-bold text-sm shadow-md">
                3
              </div>
              <div className="space-y-2">
                <span className="text-[10px] text-[#6C63FF] font-bold tracking-widest uppercase font-mono">Milestone 03</span>
                <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Get Verified</h3>
                <p className="text-slate-500 dark:text-slate-300 text-sm max-w-xl leading-relaxed font-medium">
                  Our system verifies your metrics to ensure high trust. Unlock a golden verified seal that brands reference to validate target demographics.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative pl-10 md:pl-16">
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-display font-bold text-sm shadow-md">
                4
              </div>
              <div className="space-y-2">
                <span className="text-[10px] text-[#6C63FF] font-bold tracking-widest uppercase font-mono">Milestone 04</span>
                <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Receive Collaboration Requests</h3>
                <p className="text-slate-500 dark:text-slate-300 text-sm max-w-xl leading-relaxed font-medium">
                  Brands search categories and discover you directly. Standard campaign invites arrive straight in your dashboard, bypassing high-overhead intermediaries.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative pl-10 md:pl-16">
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#6C63FF] text-white flex items-center justify-center font-display font-bold text-sm shadow-md">
                5
              </div>
              <div className="space-y-2">
                <span className="text-[10px] text-[#6C63FF] font-bold tracking-widest uppercase font-mono">Milestone 05</span>
                <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Earn & Grow</h3>
                <p className="text-slate-500 dark:text-slate-300 text-sm max-w-xl leading-relaxed font-medium">
                  Deliver quality content on time and receive secure milestones payments without hidden commission traps.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. LIVE CAMPAIGNS SECTION */}
      <section className="py-32 bg-slate-50 dark:bg-[#09090F] border-y border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="space-y-3">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
                Active Brand Briefs
              </h2>
              <p className="text-slate-500 dark:text-slate-300 text-sm sm:text-base font-medium max-w-md">
                Apply directly to hand-verified, active campaigns seeking premium creators.
              </p>
            </div>
            
            {/* Search filter within campaigns */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search niches (e.g., Beauty, Fashion)"
                value={campaignSearchText}
                onChange={(e) => setCampaignSearchText(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 pl-11 pr-4 py-3 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-all text-slate-700 dark:text-slate-200 placeholder-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns
              .filter(camp => camp.niche.toLowerCase().includes(campaignSearchText.toLowerCase()) || camp.brand.toLowerCase().includes(campaignSearchText.toLowerCase()))
              .map((camp) => {
                const isAlreadyApplied = appliedCampaigns.includes(camp.id);
                return (
                  <motion.div
                    key={camp.id}
                    layout
                    className="soft-card p-8 bg-white dark:bg-[#151523] border border-slate-100/60 dark:border-white/5 flex flex-col justify-between"
                  >
                    <div className="space-y-5">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className={`w-9 h-9 rounded-xl ${camp.logoBg} text-white font-black flex items-center justify-center text-sm shadow-sm`}>
                            {camp.logoText}
                          </span>
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{camp.brand}</h4>
                            <p className="text-[10px] text-slate-400 dark:text-slate-400 font-mono font-medium uppercase tracking-wider">{camp.niche}</p>
                          </div>
                        </div>
                        <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/40 text-[#6C63FF] dark:text-indigo-300 font-extrabold px-2.5 py-0.5 rounded-full font-mono">
                          Verified Brief
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-snug">
                          {camp.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-300 font-medium leading-relaxed">
                          Deliverable: High-quality integration video or tutorial carousel showcasing campaign points.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/5 space-y-4">
                      <div className="flex justify-between items-center text-xs">
                        <div>
                          <span className="text-slate-400 dark:text-slate-400 font-medium">Budget Target</span>
                          <p className="font-extrabold text-slate-900 dark:text-white text-sm mt-0.5">{camp.budget}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400 dark:text-slate-400 font-medium">Apply Before</span>
                          <p className="font-mono font-semibold text-slate-500 dark:text-slate-300 mt-0.5">{camp.deadline}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCampaignApply(camp.id)}
                        className={`w-full pill-btn py-3 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isAlreadyApplied 
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
                            : 'bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900'
                        }`}
                      >
                        {isAlreadyApplied ? (
                          <>
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            Applied
                          </>
                        ) : (
                          <>
                            Apply to Brief
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
          </div>

        </div>
      </section>

      {/* 8. FOUNDING CREATOR COMMUNITY - HORIZONTAL INFINITE MARQUEE */}
      <section className="py-24 bg-white dark:bg-[#0D0D16] overflow-hidden border-b border-slate-100 dark:border-white/5">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Meet Our Founding Creators
          </h2>
          <p className="text-slate-500 dark:text-slate-300 text-sm font-medium">
            Over 4,800+ of India's fast-rising influencers have already joined.
          </p>
        </div>

        {/* Marquee Wrapper with Framer motion custom marquee styled infinite list */}
        <div className="relative flex overflow-x-hidden py-4 select-none group">
          {/* Loop twice to guarantee infinite scrolling effect */}
          <div className="animate-marquee flex gap-8 whitespace-nowrap group-hover:[animation-play-state:paused] duration-1000">
            {marqueeAvatars.concat(marqueeAvatars).map((avatarUrl, i) => (
              <div 
                key={i} 
                className="w-20 h-20 rounded-full border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden flex-shrink-0 relative group/avatar cursor-pointer"
              >
                <img 
                  src={avatarUrl} 
                  alt="Creator Avatar" 
                  className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white filter drop-shadow" />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-4 animate-marquee flex gap-8 whitespace-nowrap group-hover:[animation-play-state:paused] duration-1000" style={{ animationDelay: '-17.5s' }}>
            {marqueeAvatars.concat(marqueeAvatars).map((avatarUrl, i) => (
              <div 
                key={`second-${i}`} 
                className="w-20 h-20 rounded-full border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden flex-shrink-0 relative group/avatar cursor-pointer"
              >
                <img 
                  src={avatarUrl} 
                  alt="Creator Avatar" 
                  className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white filter drop-shadow" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. STATISTICS */}
      <section className="py-24 bg-white dark:bg-[#0D0D16]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="text-center space-y-2 p-8 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100/50 dark:border-white/5">
              <h3 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 dark:text-white">10,000+</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">Founding Creators Goal</p>
            </div>

            <div className="text-center space-y-2 p-8 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100/50 dark:border-white/5">
              <h3 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 dark:text-white">100+</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">Brand Partners</p>
            </div>

            <div className="text-center space-y-2 p-8 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100/50 dark:border-white/5">
              <h3 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 dark:text-white">500+</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">Campaign Opportunities</p>
            </div>

            <div className="text-center space-y-2 p-8 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100/50 dark:border-white/5">
              <h3 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 dark:text-white">24/7</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">Support Hours</p>
            </div>

          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="py-28 bg-slate-50 dark:bg-[#09090F] border-t border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-xl mx-auto mb-20 space-y-3">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Loved by India's Top Creators
            </h2>
            <p className="text-slate-500 dark:text-slate-300 text-sm sm:text-base font-medium">
              See what founding members say about the decentralized campaign workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div 
                key={idx} 
                className="soft-card p-8 bg-white dark:bg-[#151523] flex flex-col justify-between border border-slate-100/60 dark:border-white/5"
              >
                <div className="space-y-6">
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(test.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-slate-50 dark:border-white/5 mt-6">
                  <img 
                    src={test.avatar} 
                    alt={test.name} 
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-50 dark:ring-indigo-950/50"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">{test.name}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{test.handle} • {test.followers} Followers</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section ref={faqRef} id="faq" className="py-32 bg-white dark:bg-[#0D0D16]">
        <div className="max-w-3xl mx-auto px-6">
          
          <div className="text-center mb-16 space-y-3">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 dark:text-slate-300 text-sm sm:text-base font-medium">
              Everything you need to know about joining and verifying your profile.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = faqActiveIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden transition-all bg-white dark:bg-[#151523]"
                >
                  <button
                    onClick={() => setFaqActiveIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-slate-900 dark:text-white hover:text-[#6C63FF] dark:hover:text-indigo-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-slate-400"
                    >
                      <Plus className="w-5 h-5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-sm text-slate-500 dark:text-slate-300 leading-relaxed font-medium pt-1">
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

      {/* 12. FINAL CONVERSION CTA */}
      <section className="py-24 relative overflow-hidden bg-white dark:bg-[#0D0D16] border-t border-slate-100 dark:border-white/5">
        
        {/* Lights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-50/70 dark:bg-indigo-950/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          
          {/* Accent Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <Sparkle className="w-4 h-4 text-[#A23CFF]" />
            <span>Launch Perks Expire Soon</span>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight">
              Become One of the First <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] via-[#A23CFF] to-[#5B2CFF]">10,000 Founding Creators.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-semibold leading-relaxed">
              Create your profile today and start receiving brand collaboration opportunities. No upfront fees, no commission deductions—ever.
            </p>
          </div>

          <div>
            <button
              onClick={() => {
                setIsSignUpOpen(true);
                setOnboardingStep(1);
              }}
              className="pill-btn px-10 py-4.5 bg-gradient-to-r from-[#FF2D7A] to-[#A23CFF] hover:opacity-95 font-bold text-white flex items-center justify-center gap-2.5 mx-auto cursor-pointer shadow-lg shadow-[#A23CFF]/15 text-base"
              id="final-cta"
            >
              Join Creogrid
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-slate-50 dark:bg-[#11111F] border-t border-slate-100 dark:border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <Logo iconSize="w-8 h-8" textSize="text-base sm:text-lg" />
            </a>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-slate-500 dark:text-slate-400">
              <button onClick={() => scrollTo(whyUsRef)} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">About</button>
              <span className="cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</span>
              <span className="cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">Terms</span>
              <button onClick={() => setIsAdminMode(true)} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Admin Console</button>
              <a href="https://instagram.com" className="hover:text-[#6C63FF] transition-colors flex items-center gap-1.5">
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              <a href="https://linkedin.com" className="hover:text-[#6C63FF] transition-colors flex items-center gap-1.5">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a href="mailto:support@creogrid.in" className="text-[#6C63FF] hover:underline">support@creogrid.in</a>
            </div>
          </div>

          <div className="h-[1px] bg-slate-100 dark:bg-white/5" />

          {/* Bottom attribution */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
            <p>© {new Date().getFullYear()} Creogrid. All rights reserved.</p>
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold">
              <span>Made with ❤️ for Creators in India</span>
            </div>
          </div>

        </div>
      </footer>


      {/* 14. INTERACTIVE WIZARD ONBOARDING SIGNUP MODAL */}
      <AnimatePresence>
        {isSignUpOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSignUpOpen(false)}
              className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-lg overflow-hidden relative z-10 flex flex-col"
            >
              {/* Confetti Explosion during Success step 5 */}
              {onboardingStep === 5 && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                  {[...Array(50)].map((_, i) => (
                    <ConfettiParticle 
                      key={i} 
                      delay={Math.random() * 0.3} 
                      color={['#6C63FF', '#8B5CF6', '#22C55E', '#FFB800', '#FF4E88'][Math.floor(Math.random() * 5)]} 
                    />
                  ))}
                </div>
              )}

              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/40">
                <div className="flex items-center gap-2.5">
                  <Logo iconOnly={true} iconSize="w-7 h-7" />
                  <span className="font-display font-bold text-sm text-slate-900 dark:text-white">
                    {onboardingStep === 5 ? 'Welcome to Creogrid' : 'Join Founding Creator Program'}
                  </span>
                </div>
                <button 
                  onClick={() => setIsSignUpOpen(false)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Indicator for steps 1 to 4 */}
              {onboardingStep < 5 && (
                <div className="w-full h-1 bg-slate-100 dark:bg-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FF2D7A] via-[#A23CFF] to-[#5B2CFF] transition-all duration-300" 
                    style={{ width: `${(onboardingStep / 4) * 100}%` }}
                  />
                </div>
              )}

              {/* Steps Area */}
              <div className="p-6 sm:p-8 flex-1 max-h-[75vh] overflow-y-auto">
                <AnimatePresence mode="wait">
                  
                  {/* Step 1: Login Credentials */}
                  {onboardingStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-5"
                    >
                      <div className="space-y-1">
                        <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">Let's build your profile</h3>
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-300">Join India's next premier creator ecosystem.</p>
                      </div>

                      <div className="space-y-3.5">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider" htmlFor="signup-name">Full Name</label>
                          <input 
                            id="signup-name"
                            type="text" 
                            placeholder="e.g. Kabir Verma"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/15 focus:border-[#6C63FF]"
                          />
                          {formErrors.name && <p className="text-[10px] text-red-500 font-semibold">{formErrors.name}</p>}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider" htmlFor="signup-email">Email Address</label>
                          <input 
                            id="signup-email"
                            type="email" 
                            placeholder="e.g. kabir@creogrid.in"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/15 focus:border-[#6C63FF]"
                          />
                          {formErrors.email && <p className="text-[10px] text-red-500 font-semibold">{formErrors.email}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider" htmlFor="signup-phone">Mobile Number</label>
                            <input 
                              id="signup-phone"
                              type="tel" 
                              placeholder="e.g. 9876543210"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/15 focus:border-[#6C63FF]"
                            />
                            {formErrors.phone && <p className="text-[10px] text-red-500 font-semibold">{formErrors.phone}</p>}
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider" htmlFor="signup-pass">Password</label>
                            <input 
                              id="signup-pass"
                              type="password" 
                              placeholder="Min. 6 chars"
                              value={formData.password}
                              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                              className="w-full px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/15 focus:border-[#6C63FF]"
                            />
                            {formErrors.password && <p className="text-[10px] text-red-500 font-semibold">{formErrors.password}</p>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Choose Creator Category */}
                  {onboardingStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-5"
                    >
                      <div className="space-y-1">
                        <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">Select your prime niche</h3>
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-300">Help brands find you in the perfect directory segment.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                        {categories.map((cat) => (
                          <button
                            key={cat.name}
                            type="button"
                            onClick={() => setFormData({ ...formData, category: cat.name })}
                            className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                              formData.category === cat.name 
                                ? 'border-[#6C63FF] dark:border-[#8B5CF6] bg-indigo-50/20 dark:bg-indigo-900/20 text-[#6C63FF] dark:text-[#A23CFF]' 
                                : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800'
                            }`}
                          >
                            <span className="text-base">{cat.emoji}</span>
                            <span className="text-xs font-bold">{cat.name}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Social Links */}
                  {onboardingStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-5"
                    >
                      <div className="space-y-1">
                        <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">Connect social channels</h3>
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-300">Provide at least one handle or channel URL.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1">
                            <Instagram className="w-3.5 h-3.5 text-pink-500" /> Instagram Profile Link / Handle
                          </label>
                          <input 
                            type="text" 
                            placeholder="e.g. instagram.com/riya_styles"
                            value={formData.instagramLink}
                            onChange={(e) => setFormData({ ...formData, instagramLink: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/15 focus:border-[#6C63FF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1">
                            <Youtube className="w-3.5 h-3.5 text-red-500" /> YouTube Channel Link
                          </label>
                          <input 
                            type="text" 
                            placeholder="e.g. youtube.com/c/riyacreates"
                            value={formData.youtubeLink}
                            onChange={(e) => setFormData({ ...formData, youtubeLink: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/15 focus:border-[#6C63FF]"
                          />
                        </div>

                        {formErrors.socials && <p className="text-xs text-red-500 font-semibold">{formErrors.socials}</p>}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Followers & Location */}
                  {onboardingStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-5"
                    >
                      <div className="space-y-1">
                        <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">Declare channel metrics</h3>
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-300">Our automated gateway audits and certifies these numbers.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider" htmlFor="signup-followers">Total Followers / Subscribers</label>
                          <input 
                            id="signup-followers"
                            type="text" 
                            placeholder="e.g. 150000"
                            value={formData.followers}
                            onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/15 focus:border-[#6C63FF]"
                          />
                          {formErrors.followers && <p className="text-[10px] text-red-500 font-semibold">{formErrors.followers}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider" htmlFor="signup-engage">Engagement Rate (%)</label>
                            <input 
                              id="signup-engage"
                              type="text" 
                              placeholder="e.g. 5.4"
                              value={formData.engagement}
                              onChange={(e) => setFormData({ ...formData, engagement: e.target.value })}
                              className="w-full px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/15 focus:border-[#6C63FF]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider" htmlFor="signup-location">Location (City)</label>
                            <input 
                              id="signup-location"
                              type="text" 
                              placeholder="e.g. Mumbai"
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                              className="w-full px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/15 focus:border-[#6C63FF]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider" htmlFor="signup-lang">Primary Languages</label>
                          <input 
                            id="signup-lang"
                            type="text" 
                            placeholder="e.g. English, Hindi"
                            value={formData.language}
                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/15 focus:border-[#6C63FF]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Complete Success Profile Card & Confetti */}
                  {onboardingStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center space-y-6 py-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
                        <Check className="w-7 h-7 stroke-[2.5]" />
                      </div>
                      
                      <div className="space-y-1.5">
                        <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
                          Congratulations, {formData.name}!
                        </h3>
                        <p className="text-slate-500 dark:text-slate-300 text-xs sm:text-sm font-medium max-w-sm mx-auto">
                          Your premium Creogrid profile is active and verified. You are officially cataloged in India's next premier directory.
                        </p>
                      </div>

                      {/* Display Creator Digital Card badge */}
                      <div className="bg-slate-50/80 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-100 dark:border-slate-750 max-w-xs mx-auto space-y-3 shadow-inner relative overflow-hidden">
                        
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#6C63FF]/5 blur-lg rounded-full" />
                        
                        <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-400 dark:text-slate-300 uppercase tracking-widest">
                          <span>FOUNDING MEMBER STATUS</span>
                          <span className="text-[#6C63FF] bg-indigo-50 dark:bg-indigo-950/40 px-1.5 py-0.5 rounded">PASSPORT</span>
                        </div>

                        <div className="flex items-center gap-3 text-left">
                          <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6C63FF] to-[#8B5CF6] text-white font-extrabold text-sm flex items-center justify-center">
                            {formData.name.charAt(0)}
                          </span>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{formData.name}</h4>
                            <p className="text-[10px] text-slate-400 dark:text-slate-300 font-medium font-mono">creogrid.in/{formData.name.toLowerCase().replace(/\s+/g, '')}</p>
                          </div>
                        </div>

                        <div className="border-t border-dashed border-slate-200 dark:border-slate-700 pt-3 flex justify-between items-center text-left">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-300 block uppercase tracking-wider">CREATOR PASS</span>
                            <span className="font-mono font-extrabold text-lg text-slate-900 dark:text-white">#CREO-{passNumber}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-300 block uppercase tracking-wider">SEARCH PRIORITY</span>
                            <span className="text-[10px] text-emerald-600 font-extrabold uppercase">GUARANTEED</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsSignUpOpen(false)}
                        className="pill-btn w-full py-3.5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs cursor-pointer shadow"
                      >
                        Go to Creator Dashboard
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Modal Footer Controls (Not displayed in step 5) */}
              {onboardingStep < 5 && (
                <div className="px-6 py-5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/40">
                  <button
                    type="button"
                    disabled={onboardingStep === 1}
                    onClick={() => setOnboardingStep(onboardingStep - 1)}
                    className={`text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors ${onboardingStep === 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="pill-btn px-6 py-2.5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow"
                  >
                    {onboardingStep === 4 ? 'Complete Registration' : 'Next Step'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
