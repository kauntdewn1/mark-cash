'use client';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAccount } from 'wagmi';

export default function StakeForm() {
  const { address } = useAccount();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleStake = async () => {
    if (!address || !amount) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'stakes'), {
        userId: address,
        amount: parseFloat(amount),
        startDate: serverTimestamp(),
        status: 'active',
        rewards: 0
      });
      setConfirmed(true);
      setAmount('');
    } catch (error) {
      alert('Erro ao stakear');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto text-center mt-16 p-4 border rounded-xl shadow bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">🏦 Staking MARKCASH</h1>
      <p className="mb-6">Simulação de rendimento: 14% ao mês sobre MKS stakeado.</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Quantidade de MKS"
        className="p-2 w-full mb-4 rounded text-black"
      />
      <button
        onClick={handleStake}
        disabled={loading}
        className="bg-yellow-500 px-6 py-2 rounded hover:bg-yellow-600"
      >
        {loading ? 'Processando...' : 'Stakear'}
      </button>
      {confirmed && (
        <p className="mt-4 text-green-400 font-medium">✅ Stake registrado com sucesso!</p>
      )}
    </div>
  );
} 