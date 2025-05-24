// lib/firestore/users.ts
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase-config';

export interface UserData {
  email?: string | null;
  balance: number;
  createdAt: Timestamp;
  lastStakeDate: Timestamp;
  role?: 'user' | 'admin';
  stakedAmount: number;
  uid: string;
  updatedAt: Timestamp;
  walletAddress: string;
}

export const getUserByWallet = async (wallet: string): Promise<UserData | null> => {
  if (!db) return null;

  const querySnapshot = await getDoc(doc(db, 'users', wallet));
  if (querySnapshot.exists()) {
    return querySnapshot.data() as UserData;
  }

  return null;
};

export const updateUser = async (wallet: string, data: Partial<UserData>) => {
  if (!db) return;
  const ref = doc(db, 'users', wallet);
  await updateDoc(ref, {
    ...data,
    updatedAt: new Date(),
  });
};
