/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Creator, Testimonial, FaqItem, CampaignStage } from './types';

export const CREATORS: Creator[] = [
  {
    id: 'creator-1',
    name: 'Seraphina Lin',
    handle: '@seraphina.style',
    platform: 'tiktok',
    niche: 'Fashion & Aesthetic',
    followers: 245000,
    engagement: 6.8,
    location: 'New York, USA',
    avatar: 'https://picsum.photos/seed/seraphina/150/150',
    avatarColor: 'from-[#ec4899] to-[#8b5cf6]',
    costPerPost: 450,
    views: 82000,
    demographics: [
      { label: 'Female (18-24)', percentage: 55 },
      { label: 'Female (25-34)', percentage: 30 },
      { label: 'Male (18-24)', percentage: 12 },
      { label: 'Others', percentage: 3 },
    ],
    recentPosts: [
      { thumbnail: 'https://picsum.photos/seed/post1/300/400', views: '142K', engagement: '8.2%' },
      { thumbnail: 'https://picsum.photos/seed/post2/300/400', views: '95K', engagement: '6.4%' },
      { thumbnail: 'https://picsum.photos/seed/post3/300/400', views: '73K', engagement: '5.9%' },
    ],
  },
  {
    id: 'creator-2',
    name: 'Marcus Vance',
    handle: '@marcus.tech',
    platform: 'youtube',
    niche: 'Consumer Tech',
    followers: 520000,
    engagement: 4.2,
    location: 'Austin, USA',
    avatar: 'https://picsum.photos/seed/marcus/150/150',
    avatarColor: 'from-[#ef4444] to-[#f97316]',
    costPerPost: 1200,
    views: 185000,
    demographics: [
      { label: 'Male (18-24)', percentage: 48 },
      { label: 'Male (25-34)', percentage: 36 },
      { label: 'Female (18-24)', percentage: 11 },
      { label: 'Others', percentage: 5 },
    ],
    recentPosts: [
      { thumbnail: 'https://picsum.photos/seed/post4/300/400', views: '320K', engagement: '5.1%' },
      { thumbnail: 'https://picsum.photos/seed/post5/300/400', views: '150K', engagement: '3.9%' },
      { thumbnail: 'https://picsum.photos/seed/post6/300/400', views: '210K', engagement: '4.4%' },
    ],
  },
  {
    id: 'creator-3',
    name: 'Chloe Rivers',
    handle: '@chloefit',
    platform: 'instagram',
    niche: 'Fitness & Mindset',
    followers: 1200000,
    engagement: 5.1,
    location: 'L.A., USA',
    avatar: 'https://picsum.photos/seed/chloe/150/150',
    avatarColor: 'from-[#a855f7] to-[#ec4899]',
    costPerPost: 2500,
    views: 310000,
    demographics: [
      { label: 'Female (25-34)', percentage: 42 },
      { label: 'Female (18-24)', percentage: 38 },
      { label: 'Male (25-34)', percentage: 15 },
      { label: 'Others', percentage: 5 },
    ],
    recentPosts: [
      { thumbnail: 'https://picsum.photos/seed/fit1/300/400', views: '540K', engagement: '6.2%' },
      { thumbnail: 'https://picsum.photos/seed/fit2/300/400', views: '410K', engagement: '5.5%' },
      { thumbnail: 'https://picsum.photos/seed/fit3/300/400', views: '280K', engagement: '4.8%' },
    ],
  },
  {
    id: 'creator-4',
    name: 'Devon Kross',
    handle: '@devonplays',
    platform: 'tiktok',
    niche: 'Gaming & Setup Tech',
    followers: 850000,
    engagement: 7.9,
    location: 'Berlin, Germany',
    avatar: 'https://picsum.photos/seed/devon/150/150',
    avatarColor: 'from-[#3b82f6] to-[#06b6d4]',
    costPerPost: 950,
    views: 290000,
    demographics: [
      { label: 'Male (13-17)', percentage: 40 },
      { label: 'Male (18-24)', percentage: 35 },
      { label: 'Female (18-24)', percentage: 18 },
      { label: 'Others', percentage: 7 },
    ],
    recentPosts: [
      { thumbnail: 'https://picsum.photos/seed/game1/300/400', views: '412K', engagement: '9.1%' },
      { thumbnail: 'https://picsum.photos/seed/game2/300/400', views: '315K', engagement: '8.2%' },
      { thumbnail: 'https://picsum.photos/seed/game3/300/400', views: '210K', engagement: '7.0%' },
    ],
  },
  {
    id: 'creator-5',
    name: 'Aria Woods',
    handle: '@aria.bakes',
    platform: 'youtube',
    niche: 'Artisanal Culinary',
    followers: 340000,
    engagement: 3.8,
    location: 'Sydney, Australia',
    avatar: 'https://picsum.photos/seed/aria/150/150',
    avatarColor: 'from-[#10b981] to-[#3b82f6]',
    costPerPost: 800,
    views: 110000,
    demographics: [
      { label: 'Female (25-34)', percentage: 52 },
      { label: 'Female (35-44)', percentage: 28 },
      { label: 'Male (25-34)', percentage: 12 },
      { label: 'Others', percentage: 8 },
    ],
    recentPosts: [
      { thumbnail: 'https://picsum.photos/seed/bake1/300/400', views: '180K', engagement: '4.8%' },
      { thumbnail: 'https://picsum.photos/seed/bake2/300/400', views: '115K', engagement: '3.9%' },
      { thumbnail: 'https://picsum.photos/seed/bake3/300/400', views: '95K', engagement: '3.1%' },
    ],
  },
  {
    id: 'creator-6',
    name: 'Ethan Chen',
    handle: '@ethaninvests',
    platform: 'instagram',
    niche: 'Personal Growth & Finance',
    followers: 180000,
    engagement: 5.5,
    location: 'Toronto, Canada',
    avatar: 'https://picsum.photos/seed/ethan/150/150',
    avatarColor: 'from-[#f59e0b] to-[#ef4444]',
    costPerPost: 500,
    views: 65000,
    demographics: [
      { label: 'Male (18-24)', percentage: 50 },
      { label: 'Male (25-34)', percentage: 35 },
      { label: 'Female (18-24)', percentage: 10 },
      { label: 'Others', percentage: 5 },
    ],
    recentPosts: [
      { thumbnail: 'https://picsum.photos/seed/gold1/300/400', views: '95K', engagement: '6.7%' },
      { thumbnail: 'https://picsum.photos/seed/gold2/300/400', views: '68K', engagement: '5.2%' },
      { thumbnail: 'https://picsum.photos/seed/gold3/300/400', views: '55K', engagement: '4.8%' },
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: "By switching our influencer campaigns to Creogrid, we cut our yearly platform tooling cost from $24,000 to basically nothing, while multiplying our active outreach response rate by 3x.",
    author: "Jessica Martinez",
    role: "VP of Growth",
    company: "Lumi Skin Co.",
    image: "https://picsum.photos/seed/jessica/100/100",
  },
  {
    id: 't-2',
    quote: "The automated campaigns pipeline is extremely intuitive. Having direct sync over reels and TikTok draft statuses saves our team 15+ hours list-building and checking postings each week.",
    author: "Dominic Kray",
    role: "Marketing lead",
    company: "Velocity Sports",
    image: "https://picsum.photos/seed/dominic/100/100",
  },
  {
    id: 't-3',
    quote: "We launched our first creator flow in less than 15 minutes. The outreach assistant drafts stunning, tailored emails that average a 65% response rate across multiple platforms.",
    author: "Sophie Dubois",
    role: "Founder & Creative",
    company: "Parisian Atelier",
    image: "https://picsum.photos/seed/sophie/100/100",
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: "How is Creogrid so affordable?",
    answer: "Legacy influencer tools charge $24,000+ anually to cover their heavy outbound corporate sales teams, physical offices, and high markup quotas. Creogrid is designed as a modular self-serve flow platform, focusing purely on smart technology and modern cloud engineering. We pass the cost savings directly to brands and creators.",
  },
  {
    id: 'faq-2',
    question: "How does the creator discovery search engine work?",
    answer: "We aggregate and index publicly available performance statistics across TikTok, YouTube, and Instagram for over 150 million creators. Our systems refresh this index in real-time, analyzing post activities, engagement averages, location hubs, and audience gender/age splits to provide pristine analytics with zero clutter.",
  },
  {
    id: 'faq-3',
    question: "Are there any contracts or lock-ins?",
    answer: "Absolutely not. We believe in ultimate flexibility. Cancel your subscription anytime, directly from your billing workspace within two clicks. No hidden setup fees, no forced annual lock-ins, and no gatekeepers.",
  },
  {
    id: 'faq-4',
    question: "Can I manage payments and agreements inside the flow?",
    answer: "Yes. Our pipeline supports automatic contract generating templates, content review portals, and integrated escrow payout releases to simplify payouts and protect campaigns from start to finish.",
  },
];

export const CAMPAIGN_STAGES: CampaignStage[] = [
  { id: 'discovery', title: 'Smart Search', description: 'Selected creators matching brand brief', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', count: 12 },
  { id: 'outreach', title: 'AI Outreach', description: 'Sequences sent & pending creator reply', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', count: 8 },
  { id: 'negotiation', title: 'Escrow Match', description: 'Agreements with terms locked in place', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', count: 4 },
  { id: 'content', title: 'Draft Review', description: 'Reviewing creator clips and copies', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', count: 3 },
  { id: 'active', title: 'Campaign Live', description: 'Direct analytics sync after launch', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', count: 5 },
];
