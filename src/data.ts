import { Creator, FAQItem, TestimonialItem, CategoryItem, CommunityStat } from './types';

export const INITIAL_CREATORS: Creator[] = [
  {
    id: '1',
    name: 'Kabir Sethi',
    handle: 'kabir_tech',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    category: 'Tech',
    location: 'Bengaluru',
    followersCount: 450000,
    platforms: {
      youtube: { handle: 'KabirTech', followers: 320000 },
      instagram: { handle: 'kabir_tech', followers: 130000 }
    },
    engagementRate: 5.8,
    profileScore: 94,
    verified: true,
    joinedAt: '2026-07-01',
    bio: 'Unboxing the future of hardware, consumer tech, and dev productivity.'
  },
  {
    id: '2',
    name: 'Ananya Sharma',
    handle: 'ananya_travels',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
    category: 'Travel',
    location: 'Mumbai',
    followersCount: 680000,
    platforms: {
      instagram: { handle: 'ananya_travels', followers: 520000 },
      youtube: { handle: 'AnanyaVlogs', followers: 160000 }
    },
    engagementRate: 6.2,
    profileScore: 96,
    verified: true,
    joinedAt: '2026-07-03',
    bio: 'Exploring off-beat paths in India & Southeast Asia.'
  },
  {
    id: '3',
    name: 'Rohan Verma',
    handle: 'financewithrohan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    category: 'Finance',
    location: 'Delhi NCR',
    followersCount: 290000,
    platforms: {
      youtube: { handle: 'FinanceWithRohan', followers: 210000 },
      linkedin: { handle: 'rohan-verma-fin', followers: 80000 }
    },
    engagementRate: 4.5,
    profileScore: 91,
    verified: true,
    joinedAt: '2026-07-04',
    bio: 'Simplifying complex Indian taxation, personal finance, and equity markets.'
  },
  {
    id: '4',
    name: 'Pooja Hegde',
    handle: 'pooja.fits',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
    category: 'Fitness',
    location: 'Hyderabad',
    followersCount: 180000,
    platforms: {
      instagram: { handle: 'pooja.fits', followers: 180000 }
    },
    engagementRate: 7.4,
    profileScore: 89,
    verified: true,
    joinedAt: '2026-07-05',
    bio: 'Strength coach and nutritionist guiding you to a sustainable lifestyle.'
  },
  {
    id: '5',
    name: 'Arjun Mehta',
    handle: 'arjun_designs',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces',
    category: 'Photography',
    location: 'Kolkata',
    followersCount: 120000,
    platforms: {
      instagram: { handle: 'arjun_designs', followers: 95000 },
      twitter: { handle: 'arjun_pixels', followers: 25000 }
    },
    engagementRate: 8.1,
    profileScore: 88,
    verified: true,
    joinedAt: '2026-07-06',
    bio: 'Visual storyteller capturing the soul of Indian streets and architecture.'
  },
  {
    id: '6',
    name: 'Siddharth Iyer',
    handle: 'sid_codes',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces',
    category: 'Education',
    location: 'Pune',
    followersCount: 310000,
    platforms: {
      linkedin: { handle: 'siddharth-iyer-dev', followers: 190000 },
      youtube: { handle: 'SidCodes', followers: 120000 }
    },
    engagementRate: 5.1,
    profileScore: 92,
    verified: true,
    joinedAt: '2026-07-07',
    bio: 'Helping engineers crack FAANG interviews and master system design.'
  }
];

export const CATEGORIES: CategoryItem[] = [
  { id: '1', name: 'Fashion', count: 184, iconName: 'Shirt', gradient: 'from-[#EC4899] to-[#F43F5E]' },
  { id: '2', name: 'Gaming', count: 212, iconName: 'Gamepad2', gradient: 'from-[#3B82F6] to-[#06B6D4]' },
  { id: '3', name: 'Travel', count: 145, iconName: 'Compass', gradient: 'from-[#10B981] to-[#059669]' },
  { id: '4', name: 'Food', count: 98, iconName: 'Utensils', gradient: 'from-[#F59E0B] to-[#D97706]' },
  { id: '5', name: 'Finance', count: 119, iconName: 'Coins', gradient: 'from-[#059669] to-[#10B981]' },
  { id: '6', name: 'Tech', count: 245, iconName: 'Laptop', gradient: 'from-[#6C63FF] to-[#A855F7]' },
  { id: '7', name: 'Beauty', count: 132, iconName: 'Sparkles', gradient: 'from-[#F43F5E] to-[#EC4899]' },
  { id: '8', name: 'Fitness', count: 156, iconName: 'Activity', gradient: 'from-[#EF4444] to-[#F97316]' },
  { id: '9', name: 'Education', count: 141, iconName: 'GraduationCap', gradient: 'from-[#8B5CF6] to-[#6C63FF]' },
  { id: '10', name: 'Comedy', count: 167, iconName: 'Laugh', gradient: 'from-[#F59E0B] to-[#EF4444]' },
  { id: '11', name: 'Music', count: 122, iconName: 'Music', gradient: 'from-[#06B6D4] to-[#3B82F6]' },
  { id: '12', name: 'Photography', count: 89, iconName: 'Camera', gradient: 'from-[#64748B] to-[#475569]' },
  { id: '13', name: 'Lifestyle', count: 203, iconName: 'Heart', gradient: 'from-[#F43F5E] to-[#8B5CF6]' }
];

export const WHY_JOIN_REASONS = [
  {
    title: 'Discover Brands',
    description: 'Avoid tedious cold DMs. Get directly listed on India’s search portal where certified brands actively hunt for your niche, category, and target audience.',
    iconName: 'Search',
    badge: 'Direct Matching'
  },
  {
    title: 'Verified Profile',
    description: 'Import cross-platform metrics instantly into a single verified page. Establish undeniable trust with brands via tamper-proof, authentic audience metrics.',
    iconName: 'ShieldCheck',
    badge: '100% Secure'
  },
  {
    title: 'More Collaboration Opportunities',
    description: 'Get automated inquiries, manage incoming briefs, sign digital contracts, and secure fair payments directly in your creator workspace.',
    iconName: 'Sparkles',
    badge: 'Max Exposure'
  }
];

export const WHY_BRANDS_LOVE_US = [
  {
    title: 'Verified Creators Only',
    description: 'Say goodbye to fake followers and inflated stats. Every creator on Creogrid passes deep cross-platform API verification to guarantee real human engagement.',
    iconName: 'UserCheck'
  },
  {
    title: 'Real-Time Analytics',
    description: 'Access live metrics, demographic distribution, historic growth, and true engagement scores directly, without asking for outdated screenshots.',
    iconName: 'BarChart3'
  },
  {
    title: 'Powerful Semantic Search',
    description: 'Filter by city, pricing, precise category, core metrics, and past collaboration ratings. Discover hidden gems and micro-influencers in seconds.',
    iconName: 'SearchCode'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Karan Chawla',
    handle: 'karanchawlatech',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&crop=faces',
    category: 'Tech Vlogger',
    followers: '450K+ Reach',
    platform: 'youtube',
    quote: 'Being part of the first 1,000 creators on Creogrid got me three major brand briefs in my first week alone. The verified profile dashboard saves me hours of preparing media kits.'
  },
  {
    id: 't2',
    name: 'Riya Sen',
    handle: 'riyasen.styles',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces',
    category: 'Fashion & Lifestyle',
    followers: '210K+ Followers',
    platform: 'instagram',
    quote: 'Brands used to bargain over my rates because of fake followers in my niche. Creogrid’s verified profile score instantly settled the trust issue. Absolute game-changer!'
  },
  {
    id: 't3',
    name: 'Tanmay Bhattacharya',
    handle: 'tanmay_codes',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces',
    category: 'Software Educator',
    followers: '85K+ Professionals',
    platform: 'linkedin',
    quote: 'As a professional creator on LinkedIn, finding brands who respect B2B creators is tough. Creogrid matched me with premium dev-tool startups who understood my value.'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'What is Creogrid and how does it work?',
    answer: 'Creogrid is India’s premium Creator Discovery Portal. Creators build one verified, comprehensive profile that combines YouTube, Instagram, LinkedIn, and Twitter analytics. Brands use our semantic search engine to discover you and send collaboration proposals directly.'
  },
  {
    id: 'f2',
    question: 'Is it completely free for creators?',
    answer: 'Yes! Joining Creogrid and hosting your verified profile is 100% free. Our goal is to onboarding the top 10,000 creators in India to foster high-integrity brand collaborations.'
  },
  {
    id: 'f3',
    question: 'How do I get the Verified Creator Badge?',
    answer: 'Once you sign up, you connect your social media handles. Our system verifies the authenticity of your followers and engagement rates. Creators who pass our quality threshold receive the prestigious Creogrid Verified badge.'
  },
  {
    id: 'f4',
    question: 'Can micro-creators with under 10,000 followers join?',
    answer: 'Absolutely! We love micro-creators. Brands are increasingly looking for highly engaged micro-communities. If you have real, authentic engagement, your profile score will be excellent, and you will get discovered.'
  },
  {
    id: 'f5',
    question: 'When will the brand search dashboard launch?',
    answer: 'We are currently onboarding our first 10,000 Founding Creators. The Brand portal is launching in Q3 2026. Creators who join now will be featured at the top of brand searches with priority placement.'
  }
];

export const COMMUNITY_STATS: CommunityStat[] = [
  { label: 'Founding Creators Joined', value: '1,274', suffix: ' / 10,000', iconName: 'Users' },
  { label: 'Metropolitan & Tier 2 Cities', value: '42', suffix: '+', iconName: 'MapPin' },
  { label: 'Total Verified Reach', value: '8.4M', suffix: '+', iconName: 'TrendingUp' },
  { label: 'Brands on Waiting List', value: '148', suffix: '', iconName: 'Building' }
];
