import { useEffect, useState } from 'react';
import { User, signInWithCustomToken, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (token: string) => {
    try {
      const userCredential = await signInWithCustomToken(auth, token);
      setUser(userCredential.user);
      return true;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      return true;
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      return false;
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
} 