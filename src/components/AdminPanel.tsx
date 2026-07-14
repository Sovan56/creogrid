import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  Filter, 
  CheckCircle, 
  X, 
  Sun, 
  Moon, 
  Users, 
  Activity, 
  TrendingUp, 
  ArrowLeft,
  MapPin,
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';
import { Creator } from '../types';
import Logo from './Logo';

interface AdminPanelProps {
  creators: Creator[];
  setCreators: React.Dispatch<React.SetStateAction<Creator[]>>;
  onClose: () => void;
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

const CATEGORIES = [
  'Fashion', 'Gaming', 'Travel', 'Food', 'Finance', 'Tech', 
  'Beauty', 'Fitness', 'Education', 'Comedy', 'Music', 
  'Photography', 'Lifestyle'
];

export default function AdminPanel({
  creators,
  setCreators,
  onClose,
  theme,
  setTheme
}: AdminPanelProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard Management State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVerification, setSelectedVerification] = useState('All');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingCreator, setEditingCreator] = useState<Creator | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    avatar: '',
    category: 'Fashion',
    location: '',
    followersCount: '',
    engagementRate: '',
    profileScore: '',
    verified: true,
    bio: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Deletion Confirmation State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Use admin / admin');
    }
  };

  // Autofill Credentials for Demo
  const handleAutofill = () => {
    setUsername('admin');
    setPassword('admin');
    setLoginError('');
  };

  // Format Followers Count
  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  // Open Add Modal
  const openAddModal = () => {
    setModalMode('add');
    setEditingCreator(null);
    setFormData({
      name: '',
      handle: '',
      avatar: '',
      category: 'Fashion',
      location: '',
      followersCount: '',
      engagementRate: '5.0',
      profileScore: '85',
      verified: true,
      bio: ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (creator: Creator) => {
    setModalMode('edit');
    setEditingCreator(creator);
    setFormData({
      name: creator.name,
      handle: creator.handle,
      avatar: creator.avatar,
      category: creator.category,
      location: creator.location,
      followersCount: creator.followersCount.toString(),
      engagementRate: creator.engagementRate.toString(),
      profileScore: creator.profileScore.toString(),
      verified: creator.verified,
      bio: creator.bio || ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Validate Form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.handle.trim()) {
      errors.handle = 'Social handle is required';
    } else if (!formData.handle.startsWith('@')) {
      errors.handle = "Handle must start with '@'";
    }
    if (!formData.location.trim()) errors.location = 'Location/City is required';
    
    const followers = Number(formData.followersCount);
    if (isNaN(followers) || followers <= 0) {
      errors.followersCount = 'Followers must be a positive number';
    }

    const engagement = Number(formData.engagementRate);
    if (isNaN(engagement) || engagement < 0 || engagement > 100) {
      errors.engagementRate = 'Engagement must be between 0 and 100';
    }

    const score = Number(formData.profileScore);
    if (isNaN(score) || score < 0 || score > 100) {
      errors.profileScore = 'Profile score must be between 0 and 100';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces';
    const finalAvatar = formData.avatar.trim() || defaultAvatar;

    if (modalMode === 'add') {
      const newCreator: Creator = {
        id: String(Date.now()),
        name: formData.name.trim(),
        handle: formData.handle.trim(),
        avatar: finalAvatar,
        category: formData.category,
        location: formData.location.trim(),
        followersCount: Number(formData.followersCount),
        platforms: {
          instagram: { 
            handle: formData.handle.trim().replace('@', ''), 
            followers: Number(formData.followersCount) 
          }
        },
        engagementRate: Number(formData.engagementRate),
        profileScore: Number(formData.profileScore),
        verified: formData.verified,
        joinedAt: new Date().toISOString().split('T')[0],
        bio: formData.bio.trim()
      };
      setCreators([newCreator, ...creators]);
    } else if (modalMode === 'edit' && editingCreator) {
      const updatedCreators = creators.map(c => {
        if (c.id === editingCreator.id) {
          return {
            ...c,
            name: formData.name.trim(),
            handle: formData.handle.trim(),
            avatar: finalAvatar,
            category: formData.category,
            location: formData.location.trim(),
            followersCount: Number(formData.followersCount),
            platforms: {
              ...c.platforms,
              instagram: { 
                handle: formData.handle.trim().replace('@', ''), 
                followers: Number(formData.followersCount) 
              }
            },
            engagementRate: Number(formData.engagementRate),
            profileScore: Number(formData.profileScore),
            verified: formData.verified,
            bio: formData.bio.trim()
          };
        }
        return c;
      });
      setCreators(updatedCreators);
    }

    setIsModalOpen(false);
  };

  // Delete Creator
  const handleDeleteCreator = (id: string) => {
    const updated = creators.filter(c => c.id !== id);
    setCreators(updated);
    setDeleteConfirmId(null);
  };

  // Filtering Logic
  const filteredCreators = creators.filter(creator => {
    const matchesSearch = 
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || creator.category === selectedCategory;
    
    const matchesVerification = 
      selectedVerification === 'All' || 
      (selectedVerification === 'Verified' && creator.verified) ||
      (selectedVerification === 'Unverified' && !creator.verified);

    return matchesSearch && matchesCategory && matchesVerification;
  });

  // Calculations for Admin Dashboard Metrics
  const totalCreators = creators.length;
  const avgFollowers = totalCreators > 0 
    ? Math.round(creators.reduce((sum, c) => sum + c.followersCount, 0) / totalCreators) 
    : 0;
  const avgEngagement = totalCreators > 0 
    ? (creators.reduce((sum, c) => sum + c.engagementRate, 0) / totalCreators).toFixed(1) 
    : '0.0';
  const verifiedCount = creators.filter(c => c.verified).length;
  const verifiedPercentage = totalCreators > 0 
    ? Math.round((verifiedCount / totalCreators) * 100) 
    : 0;

  // Render Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#09090F] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
          <div className="flex justify-center">
            <Logo textSize="text-2xl font-extrabold" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A23CFF]/10 text-xs font-bold text-[#A23CFF]">
            <Shield className="w-3.5 h-3.5" />
            <span>ADMINISTRATOR CONSOLE</span>
          </div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
            Secure Admin Login
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Authorize your administrative account to manage creators, categories, and verifications.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-[#151523] py-8 px-4 shadow-xl rounded-2xl border border-slate-100 dark:border-white/5 sm:px-10 space-y-6">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                  Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A23CFF]/50 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A23CFF]/50 transition-all text-sm"
                  />
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-xs rounded-xl border border-rose-100 dark:border-rose-900/20 font-bold flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-[#FF2D7A] to-[#A23CFF] hover:opacity-95 shadow-md shadow-[#A23CFF]/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Shield className="w-4 h-4" />
                Sign In to Console
              </button>
            </form>

            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl text-slate-500 dark:text-slate-400 hover:text-[#A23CFF] dark:hover:text-[#A23CFF] bg-slate-100 dark:bg-slate-900/50 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Creogrid Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090F] text-slate-950 dark:text-[#F5F6FA] flex flex-col transition-colors duration-300">
      
      {/* Dashboard Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#0D0D16]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo textSize="text-xl font-extrabold" />
            <div className="h-6 w-px bg-slate-200 dark:border-white/10 hidden sm:block" />
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A23CFF]/15 text-xs font-bold text-[#A23CFF]">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl border border-slate-200/80 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-600 dark:text-slate-300 cursor-pointer flex items-center justify-center"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>

            {/* Back to Home button */}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Home Portal
            </button>

            {/* Logout button */}
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        
        {/* Title and Welcome */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Creators Directory Manager
            </h1>
          </div>
          <button
            onClick={openAddModal}
            className="px-5 py-3 rounded-xl bg-[#A23CFF] hover:bg-[#8F2CEE] text-white font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#A23CFF]/10 hover:translate-y-[-1px]"
          >
            <Plus className="w-4 h-4" />
            Add New Creator
          </button>
        </div>

        {/* Dashboard Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white dark:bg-[#151523] p-5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Creators</p>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{totalCreators}</h3>
              </div>
              <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span className="text-emerald-500 font-bold">100% active</span>
              <span>onboarded status</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#151523] p-5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Followers</p>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{formatFollowers(avgFollowers)}</h3>
              </div>
              <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span className="text-indigo-500 font-bold">Excellent reach</span>
              <span>across platform APIs</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#151523] p-5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Engagement</p>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{avgEngagement}%</h3>
              </div>
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span className="text-emerald-500 font-bold">Premium rate</span>
              <span>industry benchmark is 3.5%</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#151523] p-5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified Badged</p>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{verifiedPercentage}%</h3>
              </div>
              <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span className="text-indigo-500 font-bold">{verifiedCount} creators</span>
              <span>are fully authenticated</span>
            </div>
          </div>

        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-white dark:bg-[#151523] p-5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm flex flex-col md:flex-row items-center gap-4">
          
          {/* Search box */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search creators by name, handle, or city location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A23CFF]/50 transition-all text-sm"
            />
          </div>

          {/* Filters dropdowns */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
              <div className="relative w-full sm:w-44">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white focus:outline-none text-sm font-medium cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Verification Filter */}
            <div className="relative w-full sm:w-40">
              <select
                value={selectedVerification}
                onChange={(e) => setSelectedVerification(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white focus:outline-none text-sm font-medium cursor-pointer"
              >
                <option value="All">All Badges</option>
                <option value="Verified">Verified Only</option>
                <option value="Unverified">Pending Only</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

          </div>

        </div>

        {/* Creators Table Container */}
        <div className="bg-white dark:bg-[#151523] rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-white/5 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-6">Creator Profile</th>
                  <th className="py-4 px-5">Niche Category</th>
                  <th className="py-4 px-5">Location</th>
                  <th className="py-4 px-5 text-right">Followers</th>
                  <th className="py-4 px-5 text-right">Engagement</th>
                  <th className="py-4 px-5 text-center">Score</th>
                  <th className="py-4 px-5 text-center">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm">
                {filteredCreators.length > 0 ? (
                  filteredCreators.map((creator) => (
                    <tr key={creator.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img 
                            src={creator.avatar} 
                            alt={creator.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-50 dark:ring-white/5 flex-shrink-0"
                            onError={(e) => {
                              // Fallback on error
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces';
                            }}
                          />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white leading-snug">{creator.name}</p>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">{creator.handle}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#A23CFF]/5 text-[#A23CFF] border border-[#A23CFF]/10">
                          {creator.category}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-slate-600 dark:text-slate-300 font-medium">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{creator.location}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-right font-extrabold text-slate-900 dark:text-white font-mono">
                        {formatFollowers(creator.followersCount)}
                      </td>
                      <td className="py-4 px-5 text-right font-bold text-emerald-500 font-mono">
                        {creator.engagementRate}%
                      </td>
                      <td className="py-4 px-5 text-center">
                        <div className="inline-block px-2.5 py-0.5 rounded font-bold font-mono text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300">
                          {creator.profileScore}/100
                        </div>
                      </td>
                      <td className="py-4 px-5 text-center">
                        {creator.verified ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                            <CheckCircle className="w-3.5 h-3.5 fill-emerald-500/10" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          
                          {/* Edit Action Button */}
                          <button
                            onClick={() => openEditModal(creator)}
                            className="p-1.5 rounded-lg border border-slate-200/80 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all cursor-pointer"
                            title="Edit Creator"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Delete Action Button (with 2-step confirm) */}
                          {deleteConfirmId === creator.id ? (
                            <div className="flex items-center gap-1 bg-rose-500/10 rounded-lg p-0.5 border border-rose-500/25">
                              <button
                                onClick={() => handleDeleteCreator(creator.id)}
                                className="px-2 py-1 bg-rose-500 text-white rounded text-[10px] font-bold transition-all cursor-pointer"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(creator.id)}
                              className="p-1.5 rounded-lg border border-slate-200/80 dark:border-white/10 hover:bg-rose-500/10 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-all cursor-pointer"
                              title="Delete Creator"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-12 px-6 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Users className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                        <div>
                          <p className="font-bold">No creators found matching filter criteria</p>
                          <p className="text-xs text-slate-400 mt-1">Try resetting the search terms or niche categories.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#151523] max-w-lg w-full rounded-3xl border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50 dark:bg-slate-900/40">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#A23CFF]" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {modalMode === 'add' ? 'Add New Creator' : 'Edit Creator Profile'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {/* Form Row: Name & Handle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aditi Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A23CFF]/40 text-sm"
                  />
                  {formErrors.name && (
                    <p className="text-rose-500 text-[10px] font-bold mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Social Handle <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.handle}
                    onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                    placeholder="e.g. @aditi_travels"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A23CFF]/40 text-sm"
                  />
                  {formErrors.handle && (
                    <p className="text-rose-500 text-[10px] font-bold mt-1">{formErrors.handle}</p>
                  )}
                </div>
              </div>

              {/* Form Row: Category & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Niche Category
                  </label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white focus:outline-none text-sm font-semibold cursor-pointer"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    City Location <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Bengaluru, Mumbai"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A23CFF]/40 text-sm"
                  />
                  {formErrors.location && (
                    <p className="text-rose-500 text-[10px] font-bold mt-1">{formErrors.location}</p>
                  )}
                </div>
              </div>

              {/* Form Row: Followers count */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Followers count <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.followersCount}
                    onChange={(e) => setFormData({ ...formData, followersCount: e.target.value })}
                    placeholder="e.g. 250000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A23CFF]/40 text-sm font-mono"
                  />
                  {formErrors.followersCount && (
                    <p className="text-rose-500 text-[10px] font-bold mt-1">{formErrors.followersCount}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Engagement (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.engagementRate}
                    onChange={(e) => setFormData({ ...formData, engagementRate: e.target.value })}
                    placeholder="e.g. 5.8"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A23CFF]/40 text-sm font-mono"
                  />
                  {formErrors.engagementRate && (
                    <p className="text-rose-500 text-[10px] font-bold mt-1">{formErrors.engagementRate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Profile Score
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.profileScore}
                    onChange={(e) => setFormData({ ...formData, profileScore: e.target.value })}
                    placeholder="e.g. 92"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A23CFF]/40 text-sm font-mono"
                  />
                  {formErrors.profileScore && (
                    <p className="text-rose-500 text-[10px] font-bold mt-1">{formErrors.profileScore}</p>
                  )}
                </div>
              </div>

              {/* Form Row: Profile Image (optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Avatar Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A23CFF]/40 text-sm"
                />
              </div>

              {/* Form Row: Bio */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Short Biography
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell brands what you do, unboxing style, visual vlogs..."
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A23CFF]/40 text-sm"
                />
              </div>

              {/* Verification Toggle */}
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-100 dark:border-white/5">
                <input
                  type="checkbox"
                  id="verified"
                  checked={formData.verified}
                  onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-200 dark:border-white/10 text-[#A23CFF] focus:ring-[#A23CFF] cursor-pointer"
                />
                <label htmlFor="verified" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  Assign Creogrid Verified badge instantly
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2D7A] to-[#A23CFF] hover:opacity-95 text-white font-bold text-xs transition-all cursor-pointer shadow-md shadow-[#A23CFF]/10"
                >
                  Save Profile
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
