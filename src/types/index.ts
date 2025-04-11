
// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  subscriptionPlan?: SubscriptionPlan;
  subscriptionStatus?: 'active' | 'inactive' | 'canceled';
  billingInfo?: BillingInfo;
}

export interface BillingInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  cardLast4?: string;
}

// Subscription plans
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  channelCount: number;
}

// Channel types
export interface Channel {
  id: string;
  name: string;
  logo: string;
  category: string[];
  description: string;
  isLive?: boolean;
  isPremium?: boolean;
  currentProgram?: Program;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  thumbnail?: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}
