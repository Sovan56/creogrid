/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Platform = 'tiktok' | 'instagram' | 'youtube';

export interface Creator {
  id: string;
  name: string;
  handle: string;
  platform: Platform;
  niche: string;
  followers: number;
  engagement: number; // e.g. 5.4 for 5.4%
  location: string;
  avatar: string;
  avatarColor: string;
  costPerPost: number;
  views: number; // Avg views per post
  demographics: {
    label: string; // e.g. "18-24" or "Female"
    percentage: number;
  }[];
  recentPosts: {
    thumbnail: string;
    views: string;
    engagement: string;
  }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

export interface CampaignStage {
  id: string;
  title: string;
  description: string;
  color: string;
  count: number;
}
