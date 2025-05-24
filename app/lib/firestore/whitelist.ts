// lib/firestore/whitelist.ts
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebase-config';

export interface WhitelistEntry {
  wallet: string;
  phase: string;
  status: string;
  timestamp: any;
}

export const isWalletWhitelisted = async (wallet: string): Promise<boolean> => {
  if (!db) return false;
  const q = query(collection(db, 'whitelist'), where('wallet', '==', wallet));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};
