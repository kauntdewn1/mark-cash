// lib/firestore/rewards.ts
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase-config';

export interface RewardEntry {
  amount: number;
  id: string;
  status: 'pending' | 'paid';
  timestamp: any;
  type: string;
  userId: string;
}

export const addRewardEntry = async (entry: RewardEntry) => {
  if (!db) return;
  await addDoc(collection(db, 'rewards'), entry);
};

export const getUserRewards = async (userId: string): Promise<RewardEntry[]> => {
  if (!db) return [];
  const q = query(collection(db, 'rewards'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as RewardEntry);
};
