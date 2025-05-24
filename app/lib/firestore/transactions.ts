// lib/firestore/transactions.ts
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebase-config';

export interface TransactionEntry {
  amount: number;
  id: string;
  status: string;
  timestamp: any;
  txHash: string;
  type: 'stake' | 'unstake' | 'transfer';
  userId: string;
}

export const addTransaction = async (entry: TransactionEntry) => {
  if (!db) return;
  await addDoc(collection(db, 'transactions'), entry);
};
