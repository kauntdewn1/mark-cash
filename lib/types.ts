import { Timestamp } from 'firebase/firestore';

export interface Staking {
  amount: number;
  durationMonths: number;
  startDate: Timestamp;
  status: string;
  walletAddress: string;
}

export interface User {
  joinedAt: Timestamp;
  referrals: number;
  tier: string;
  walletAddress: string;
}

export interface Whitelist {
  email: string;
  timestamp: Timestamp;
  walletAddress: string;
}

export type StakingStatus = 'active' | 'completed' | 'withdrawn';
export type UserTier = 'bronze' | 'silver' | 'gold' | 'platinum';