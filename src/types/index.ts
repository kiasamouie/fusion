// User & Auth
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  company_id?: number;
  role?: "admin" | "staff";
}

// Company/Business
export interface Company {
  id: number;
  name: string;
  email: string;
  industry?: string;
  phone?: string;
  website?: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
}

// Customer/Loyalty Card
export interface Customer {
  id: number;
  company_id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  date_of_birth?: string;
  postcode?: string;
  marketing_consent: boolean;
  terms_accepted: boolean;
  created_at: string;
  updated_at: string;
}

// Loyalty Card
export interface Card {
  id: number;
  campaign_id: string;
  loopy_id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  mobile_number?: string;
  date_of_birth?: string;
  postcode?: string;
  current_stamps: number;
  total_stamps_earned: number;
  total_rewards_earned: number;
  total_rewards_redeemed: number;
  data_consent_opt_in: boolean;
  status: string;
  expiry_date?: string;
  last_stamp_earned?: string;
  last_reward_earned?: string;
  last_reward_redeemed?: string;
  created: string;
  updated: string;
}

// Stamps
export interface Stamp {
  id: number;
  card_id: number;
  customer_id: number;
  company_id: number;
  stamp_count: number;
  action: string;
  notes?: string;
  created_at: string;
}

// Wallet (Mobile Wallet Passes)
export interface Wallet {
  id: number;
  customer_id: number;
  company_id: number;
  platform: "apple" | "google";
  pass_identifier: string;
  pass_url: string;
  added_at: string;
  updated_at: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalCustomers: number;
  totalCards: number;
  totalStampsEarned: number;
  totalRewardsRedeemed: number;
  activeCards: number;
}
