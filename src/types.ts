export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  category: string;
  location: string;
  followersCount: number;
  platforms: {
    instagram?: { handle: string; followers: number };
    youtube?: { handle: string; followers: number };
    linkedin?: { handle: string; followers: number };
    twitter?: { handle: string; followers: number };
  };
  engagementRate: number;
  profileScore: number;
  verified: boolean;
  joinedAt: string;
  bio?: string;
  passId?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  category: string;
  followers: string;
  quote: string;
  platform: 'instagram' | 'youtube' | 'linkedin' | 'twitter';
}

export interface CategoryItem {
  id: string;
  name: string;
  count: number;
  iconName: string;
  gradient: string;
}

export interface CommunityStat {
  label: string;
  value: string;
  suffix: string;
  iconName: string;
}
