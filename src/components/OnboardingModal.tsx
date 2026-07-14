import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Creator } from '../types';
import { 
  X, 
  ArrowRight, 
  Check, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Twitter, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  MapPin, 
  User, 
  Mail, 
  Share2,
  Copy
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatorCreated: (newCreator: Creator) => void;
  nextPassNumber: number;
}

export default function OnboardingModal({ isOpen, onClose, onCreatorCreated, nextPassNumber }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [handle, setHandle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [location, setLocation] = useState('Mumbai');
  const [bio, setBio] = useState('');

  // Platforms toggle & metric input
  const [connectedPlatforms, setConnectedPlatforms] = useState({
    instagram: { active: false, handle: '', followers: 10000 },
    youtube: { active: false, handle: '', followers: 25000 },
    linkedin: { active: false, handle: '', followers: 5000 },
    twitter: { active: false, handle: '', followers: 8000 }
  });

  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ['Tech', 'Travel', 'Finance', 'Fitness', 'Education', 'Fashion', 'Gaming', 'Food', 'Beauty', 'Music', 'Lifestyle'];
  const cities = ['Mumbai', 'Bengaluru', 'Delhi NCR', 'Hyderabad', 'Pune', 'Kolkata', 'Chennai', 'Goa', 'Jaipur'];

  const togglePlatform = (plat: keyof typeof connectedPlatforms) => {
    setConnectedPlatforms(prev => ({
      ...prev,
      [plat]: { ...prev[plat], active: !prev[plat].active }
    }));
  };

  const updateFollowers = (plat: keyof typeof connectedPlatforms, val: number) => {
    setConnectedPlatforms(prev => ({
      ...prev,
      [plat]: { ...prev[plat], followers: Math.max(0, val) }
    }));
  };

  const updatePlatHandle = (plat: keyof typeof connectedPlatforms, val: string) => {
    setConnectedPlatforms(prev => ({
      ...prev,
      [plat]: { ...prev[plat], handle: val }
    }));
  };

  // Automated Profile Score calculation
  const getCalculatedStats = () => {
    let aggregateFollowers = 0;
    let platformCount = 0;
    const activePlats: Record<string, { handle: string; followers: number }> = {};

    (Object.entries(connectedPlatforms) as Array<[string, { active: boolean; handle: string; followers: number }]>).forEach(([key, value]) => {
      if (value.active && value.handle.trim() !== '') {
        aggregateFollowers += value.followers;
        platformCount++;
        activePlats[key] = { handle: value.handle, followers: value.followers };
      }
    });

    if (aggregateFollowers === 0) {
      aggregateFollowers = 1200; // default initial if none active
    }

    const baseScore = 75;
    const platformBonus = platformCount * 5;
    const followersBonus = Math.min(Math.floor(Math.log10(aggregateFollowers) * 3), 15);
    const finalScore = Math.min(baseScore + platformBonus + followersBonus, 100);
    const calculatedEngagement = Number((4 + Math.random() * 5).toFixed(2));

    return {
      aggregateFollowers,
      finalScore,
      calculatedEngagement,
      activePlats
    };
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!name || !email || !handle) {
        alert('Please fill out your name, email, and custom Creogrid handle.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Must connect at least one platform
      const hasPlatform = (Object.values(connectedPlatforms) as Array<{ active: boolean; handle: string; followers: number }>).some(p => p.active && p.handle.trim() !== '');
      if (!hasPlatform) {
        alert('Please activate and input at least one social handle.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      // Finalize creation
      const stats = getCalculatedStats();
      const newCreator: Creator = {
        id: Date.now().toString(),
        name,
        handle: handle.toLowerCase().replace(/\s+/g, '_'),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces', // general nice generic avatar
        category,
        location,
        followersCount: stats.aggregateFollowers,
        platforms: stats.activePlats as any,
        engagementRate: stats.calculatedEngagement,
        profileScore: stats.finalScore,
        verified: true,
        joinedAt: new Date().toISOString().split('T')[0],
        bio: bio || `Passionate ${category} creator sharing content with an active community.`,
        passId: `00${nextPassNumber}`
      };

      onCreatorCreated(newCreator);
      setStep(4);
    }
  };

  const handleCopyLink = () => {
    const passLink = `https://creogrid.in/pass/00${nextPassNumber}`;
    navigator.clipboard.writeText(passLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#07070A]/85 backdrop-blur-md" onClick={onClose} />

      {/* Main Modal Container */}
      <div className="relative w-full max-w-xl bg-[#111318] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative z-10">
        
        {/* Top Glow bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#6C63FF] via-[#8F7BFF] to-[#A855F7]" />

        {/* Header (No Close button during Success Pass phase) */}
        {step < 4 && (
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/5 border border-white/5 text-text-secondary hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Progress Indicator */}
        {step < 4 && (
          <div className="px-8 pt-6">
            <div className="flex items-center justify-between text-[11px] font-mono text-text-secondary mb-2 uppercase">
              <span>Step {step} of 3</span>
              <span>
                {step === 1 && 'Basic Identity'}
                {step === 2 && 'Connected Accounts'}
                {step === 3 && 'Bio & Placement'}
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#6C63FF] to-[#8F7BFF] transition-all duration-300" 
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-8 max-h-[75vh] overflow-y-auto">
          
          <AnimatePresence mode="wait">
            
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-display font-bold text-2xl text-white">Create Your Verified Profile</h2>
                  <p className="text-sm text-text-secondary mt-1">Claim your spot in the first 10,000 founding creator directory.</p>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-text-secondary block">Full Name / Public Brand</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Riya Sen"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/3 border border-white/8 text-white focus:border-[#6C63FF] outline-none text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-text-secondary block">Email Address (Kept Private)</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. riya@gmail.com"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/3 border border-white/8 text-white focus:border-[#6C63FF] outline-none text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Creogrid Custom handle */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-text-secondary block">Claim Custom Creogrid Handle</label>
                    <div className="flex rounded-xl bg-white/3 border border-white/8 overflow-hidden focus-within:border-[#6C63FF] transition-all">
                      <span className="bg-white/5 px-4 py-3 text-sm text-text-secondary border-r border-white/5 font-mono">
                        creogrid.in/
                      </span>
                      <input 
                        type="text" 
                        value={handle}
                        onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                        placeholder="riyasen"
                        className="w-full px-4 py-3 text-white bg-transparent outline-none text-sm font-mono"
                      />
                    </div>
                    {handle && (
                      <p className="text-[10px] text-[#22C55E] flex items-center gap-1 font-mono">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        creogrid.in/{handle} is available!
                      </p>
                    )}
                  </div>

                  {/* Primary Category Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-text-secondary block">Primary Creator Category</label>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                            category === cat 
                              ? 'bg-[#6C63FF] text-white border-transparent' 
                              : 'bg-white/3 text-text-secondary border-white/5 hover:bg-white/5'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer action button */}
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8F7BFF] font-semibold text-sm text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary-main/10"
                >
                  Continue to Connect Socials
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* Step 2: Platform Connect */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-display font-bold text-2xl text-white">Connect Active Channels</h2>
                  <p className="text-sm text-text-secondary mt-1">Connect at least one active channel to calculate your dynamic Profile Score.</p>
                </div>

                <div className="space-y-4">
                  {/* Instagram Channel */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    connectedPlatforms.instagram.active ? 'bg-white/3 border-pink-500/30' : 'bg-[#111318] border-white/5'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500 border border-pink-500/20">
                          <Instagram className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-sm font-semibold text-white">Instagram Account</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => togglePlatform('instagram')}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer border ${
                          connectedPlatforms.instagram.active 
                            ? 'bg-pink-500/10 text-pink-500 border-pink-500/20' 
                            : 'bg-white/5 text-text-secondary border-white/5 hover:text-white'
                        }`}
                      >
                        {connectedPlatforms.instagram.active ? 'Connected' : 'Connect'}
                      </button>
                    </div>

                    {connectedPlatforms.instagram.active && (
                      <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/5">
                        <div className="space-y-1">
                          <span className="text-[10px] text-text-secondary font-semibold uppercase">Insta Handle</span>
                          <input 
                            type="text" 
                            placeholder="@handle" 
                            value={connectedPlatforms.instagram.handle}
                            onChange={(e) => updatePlatHandle('instagram', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-white/3 border border-white/5 text-xs text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-text-secondary font-semibold uppercase">Followers</span>
                          <input 
                            type="number" 
                            value={connectedPlatforms.instagram.followers}
                            onChange={(e) => updateFollowers('instagram', Number(e.target.value))}
                            className="w-full px-3 py-1.5 rounded-lg bg-white/3 border border-white/5 text-xs text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* YouTube Channel */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    connectedPlatforms.youtube.active ? 'bg-white/3 border-red-500/30' : 'bg-[#111318] border-white/5'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                          <Youtube className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-sm font-semibold text-white">YouTube Channel</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => togglePlatform('youtube')}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer border ${
                          connectedPlatforms.youtube.active 
                            ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                            : 'bg-white/5 text-text-secondary border-white/5 hover:text-white'
                        }`}
                      >
                        {connectedPlatforms.youtube.active ? 'Connected' : 'Connect'}
                      </button>
                    </div>

                    {connectedPlatforms.youtube.active && (
                      <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/5">
                        <div className="space-y-1">
                          <span className="text-[10px] text-text-secondary font-semibold uppercase">Channel Handle</span>
                          <input 
                            type="text" 
                            placeholder="@channel" 
                            value={connectedPlatforms.youtube.handle}
                            onChange={(e) => updatePlatHandle('youtube', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-white/3 border border-white/5 text-xs text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-text-secondary font-semibold uppercase">Subscribers</span>
                          <input 
                            type="number" 
                            value={connectedPlatforms.youtube.followers}
                            onChange={(e) => updateFollowers('youtube', Number(e.target.value))}
                            className="w-full px-3 py-1.5 rounded-lg bg-white/3 border border-white/5 text-xs text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* LinkedIn Channel */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    connectedPlatforms.linkedin.active ? 'bg-white/3 border-blue-500/30' : 'bg-[#111318] border-white/5'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                          <Linkedin className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-sm font-semibold text-white">LinkedIn Profile</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => togglePlatform('linkedin')}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer border ${
                          connectedPlatforms.linkedin.active 
                            ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' 
                            : 'bg-white/5 text-text-secondary border-white/5 hover:text-white'
                        }`}
                      >
                        {connectedPlatforms.linkedin.active ? 'Connected' : 'Connect'}
                      </button>
                    </div>

                    {connectedPlatforms.linkedin.active && (
                      <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/5">
                        <div className="space-y-1">
                          <span className="text-[10px] text-text-secondary font-semibold uppercase">LinkedIn URL</span>
                          <input 
                            type="text" 
                            placeholder="in/username" 
                            value={connectedPlatforms.linkedin.handle}
                            onChange={(e) => updatePlatHandle('linkedin', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-white/3 border border-white/5 text-xs text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-text-secondary font-semibold uppercase">Followers</span>
                          <input 
                            type="number" 
                            value={connectedPlatforms.linkedin.followers}
                            onChange={(e) => updateFollowers('linkedin', Number(e.target.value))}
                            className="w-full px-3 py-1.5 rounded-lg bg-white/3 border border-white/5 text-xs text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Back and Next navigation */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 rounded-xl bg-white/5 hover:bg-white/10 font-semibold text-sm text-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8F7BFF] font-semibold text-sm text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary-main/10"
                  >
                    Generate Verified Pass
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Location & Bio */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-display font-bold text-2xl text-white">Location & Bio</h2>
                  <p className="text-sm text-text-secondary mt-1">Specify your target primary location and share a short visual tagline describing your niche focus.</p>
                </div>

                <div className="space-y-4">
                  {/* City dropdown selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-text-secondary block">Primary City Base (India)</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A855F7]" />
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/3 border border-white/8 text-white focus:border-[#6C63FF] outline-none text-sm transition-colors cursor-pointer appearance-none"
                      >
                        {cities.map((city) => (
                          <option key={city} value={city} className="bg-[#111318] text-white">
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Bio statement */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-text-secondary block">Professional Bio</label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="e.g. Creator unboxing consumer hardware upgrades and building tools for high-growth engineers."
                      className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/8 text-white focus:border-[#6C63FF] outline-none text-sm transition-all resize-none"
                    />
                    <span className="text-[10px] text-text-secondary block text-right">Max 150 characters</span>
                  </div>
                </div>

                {/* Navigation actions */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 py-3 rounded-xl bg-white/5 hover:bg-white/10 font-semibold text-sm text-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8F7BFF] font-semibold text-sm text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary-main/10"
                  >
                    Finalize & Claim Pass
                    <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Success - The Founding Creator Pass Card! */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 flex flex-col items-center text-center"
              >
                {/* Glowing check badge */}
                <div className="w-12 h-12 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
                  <Check className="w-6 h-6" />
                </div>

                <div>
                  <h2 className="font-display font-bold text-2xl text-white">You're Onboarded!</h2>
                  <p className="text-xs text-[#22C55E] mt-1.5 font-mono font-bold tracking-wide uppercase">
                    Creogrid Founding Member Pass Issued
                  </p>
                </div>

                {/* THE PASSPORT PASS CARD */}
                <div className="w-full max-w-sm aspect-[1.6/1] rounded-2xl border border-white/15 bg-gradient-to-br from-[#111318] to-[#07070A] p-5 relative shadow-2xl overflow-hidden text-left glow-primary flex flex-col justify-between">
                  {/* Subtle vector details */}
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#6C63FF]/15 blur-[25px] rounded-full pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#A855F7]/10 blur-[20px] rounded-full pointer-events-none" />

                  {/* Pass Header */}
                  <div className="flex justify-between items-start border-b border-white/5 pb-3">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-[#8F7BFF] uppercase tracking-widest block">Creogrid Registry</span>
                      <h4 className="font-display font-extrabold text-white text-sm">Founding Member</h4>
                    </div>
                    <span className="text-[10px] font-mono bg-white/5 border border-white/8 px-2 py-0.5 rounded text-white/80 font-bold">
                      #00{nextPassNumber}
                    </span>
                  </div>

                  {/* Pass Center detail */}
                  <div className="flex items-center gap-3.5 my-3">
                    <div className="w-11 h-11 rounded-xl bg-[#6C63FF]/10 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm text-white">{name}</h3>
                      <p className="text-[10px] text-text-secondary font-mono">creogrid.in/{handle}</p>
                      <div className="flex items-center gap-1 text-[9px] text-[#A855F7] mt-0.5 font-semibold">
                        <MapPin className="w-3 h-3" />
                        <span>{location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pass Footer metrics */}
                  <div className="flex justify-between items-center border-t border-white/5 pt-3">
                    <div className="flex gap-1.5">
                      {connectedPlatforms.instagram.active && <Instagram className="w-3.5 h-3.5 text-pink-500" />}
                      {connectedPlatforms.youtube.active && <Youtube className="w-3.5 h-3.5 text-red-500" />}
                      {connectedPlatforms.linkedin.active && <Linkedin className="w-3.5 h-3.5 text-blue-500" />}
                      {connectedPlatforms.twitter.active && <Twitter className="w-3.5 h-3.5 text-white/80" />}
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] text-text-secondary block uppercase">Verified Score</span>
                      <span className="font-display font-extrabold text-xs text-[#22C55E]">95 / 100</span>
                    </div>
                  </div>
                </div>

                {/* Share Actions */}
                <div className="flex gap-2 w-full max-w-sm">
                  <button
                    onClick={handleCopyLink}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 font-semibold text-xs text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-text-secondary" />}
                    <span>{copiedLink ? 'Copied link!' : 'Copy Pass link'}</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8F7BFF] font-semibold text-xs text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#6C63FF]/10"
                  >
                    <span>View on Wall</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-[11px] text-text-secondary">
                  Your profile has been indexed. Scroll down to see yourself listed on the live Founding Creator Wall!
                </p>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
