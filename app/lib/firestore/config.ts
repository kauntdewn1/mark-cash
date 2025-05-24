// lib/firestore/config.ts
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebase-config';

export interface ConfigItem {
  key: string;
  value: number | string | boolean;
  updatedAt: any;
}

export const getConfigValue = async (key: string): Promise<ConfigItem | null> => {
  if (!db) return null;
  const ref = doc(db, 'config', key);
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) {
    return snapshot.data() as ConfigItem;
  }
  return null;
};

export const setConfigValue = async (key: string, value: any) => {
  if (!db) return;
  await setDoc(doc(db, 'config', key), {
    key,
    value,
    updatedAt: new Date(),
  });
};
