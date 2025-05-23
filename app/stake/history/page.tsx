'use client';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useAccount } from 'wagmi';
import StakeCard from '@/components/StakeCard';

export default function StakeHistory() {
  const { address } = useAccount();
  const [stakes, setStakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStakes = async () => {
      if (!address) return;
      const q = query(
        collection(db, 'stakes'),
        where('userId', '==', address),
        orderBy('startDate', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setStakes(data);
      setLoading(false);
    };

    fetchStakes();
  }, [address]);

  return (
    <div className="max-w-2xl mx-auto mt-16 p-4 bg-zinc-900 text-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">📄 Histórico de Stakings</h1>
      {loading ? (
        <p className="text-center">Carregando stakes...</p>
      ) : stakes.length === 0 ? (
        <p className="text-center">Você ainda não realizou nenhum stake.</p>
      ) : (
        <div className="space-y-4">
          {stakes.map((s, idx) => (
            <StakeCard key={idx} stake={s} />
          ))}
        </div>
      )}
    </div>
  );
} 