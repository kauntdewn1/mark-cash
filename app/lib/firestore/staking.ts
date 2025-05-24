// lib/firestore/staking.ts
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase-config';

export interface StakeEntry {
  amount: number;
  endDate: any;
  id: string;
  rewards: number;
  startDate: any;
  status: 'active' | 'completed' | 'cancelled';
  userId: string;
}

export const addStakeEntry = async (entry: StakeEntry) => {
  if (!db) return;
  const ref = collection(db, 'staking');
  await addDoc(ref, entry);
};

export const getUserStakes = async (userId: string): Promise<StakeEntry[]> => {
  if (!db) return [];

  const ref = collection(db, 'staking');
  const q = query(ref, where('userId', '==', userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data() as StakeEntry);
};
