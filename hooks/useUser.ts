'use client';

import { useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebase-config';
import { UserData } from '@/app/lib/firestore/users';


export function useUser() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async (uid: string) => {
    try {
      const ref = doc(db!, 'users', uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUser(snap.data() as UserData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Erro ao buscar usuário do Firestore:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth!, (firebaseUser) => {
      if (firebaseUser) {
        fetchUser(firebaseUser.uid);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [fetchUser]);

  return {
    user,
    loading,
    refresh: () => user?.uid && fetchUser(user.uid),
  };
}
