'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase-config';
import { format } from 'date-fns';
import { ptBR } from '@/node_modules/date-fns/locale';
import Papa from 'papaparse';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface Stake {
  id: string;
  userId: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'cancelled';
  rewards: number;
}

export default function StakersAdmin() {
  const [stakes, setStakes] = useState<Stake[]>([]);
  const [filtered, setFiltered] = useState<Stake[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stats, setStats] = useState({
    totalStaked: 0,
    uniqueStakers: 0,
    activeStakes: 0,
    totalRewards: 0
  });

  const { user } = useAuth();
  const router = useRouter();

  // Bloqueia acesso se não for admin
  useEffect(() => {
    if ((user as any).role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  // Busca stakes ao montar
  useEffect(() => {
    const fetchStakes = async () => {
      try {
        const q = query(collection(db!, 'stakes'), orderBy('startDate', 'desc'));
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          startDate: doc.data().startDate.toDate(),
          endDate: doc.data().endDate.toDate()
        })) as Stake[];

        setStakes(data);
        setFiltered(data);

        // Estatísticas
        setStats({
          totalStaked: data.reduce((acc, s) => acc + s.amount, 0),
          uniqueStakers: new Set(data.map(s => s.userId)).size,
          activeStakes: data.filter(s => s.status === 'active').length,
          totalRewards: data.reduce((acc, s) => acc + s.rewards, 0)
        });
      } catch (err) {
        console.error('Erro ao buscar stakes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStakes();
  }, []);

  const handleFilter = () => {
    setFiltered(
      stakes.filter(s => {
        const matchWallet = s.userId.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || s.status === statusFilter;
        return matchWallet && matchStatus;
      })
    );
  };

  const exportCSV = () => {
    const csvData = filtered.map(s => ({
      Wallet: s.userId,
      Amount: s.amount,
      Status: s.status,
      'Data Início': format(s.startDate, 'dd/MM/yyyy'),
      'Data Fim': format(s.endDate, 'dd/MM/yyyy'),
      Rewards: s.rewards
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `stakes_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const markCompleted = async (id: string) => {
    try {
      await updateDoc(doc(db!, 'stakes', id), { status: 'completed' });
      setStakes(prev => prev.map(s => s.id === id ? { ...s, status: 'completed' } : s));
      setFiltered(prev => prev.map(s => s.id === id ? { ...s, status: 'completed' } : s));
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Painel de Administração</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Total Staked', value: `${stats.totalStaked.toLocaleString()} MKS` },
          { title: 'Stakers Únicos', value: stats.uniqueStakers },
          { title: 'Stakes Ativos', value: stats.activeStakes },
          { title: 'Total Rewards', value: `${stats.totalRewards.toLocaleString()} MKS` }
        ].map(({ title, value }) => (
          <Card key={title}>
            <CardHeader><CardTitle className="text-sm">{title}</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">{value}</p></CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Input placeholder="Filtrar por carteira..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1" />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="completed">Completados</SelectItem>
            <SelectItem value="cancelled">Cancelados</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleFilter}>Filtrar</Button>
        <Button onClick={exportCSV} variant="secondary">Exportar CSV</Button>
      </div>

      <div className="grid gap-4">
        {filtered.map(stake => (
          <Card key={stake.id}>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div><p className="text-sm text-gray-500">Wallet</p><p className="font-medium">{stake.userId.slice(0, 6)}...{stake.userId.slice(-4)}</p></div>
                <div><p className="text-sm text-gray-500">Amount</p><p className="font-medium">{stake.amount.toLocaleString()} MKS</p></div>
                <div><p className="text-sm text-gray-500">Status</p><p className={`font-medium ${stake.status === 'active' ? 'text-green-500' : stake.status === 'completed' ? 'text-blue-500' : 'text-red-500'}`}>{stake.status}</p></div>
                <div><p className="text-sm text-gray-500">Rewards</p><p className="font-medium">{stake.rewards.toLocaleString()} MKS</p></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-gray-500">Início</p><p className="font-medium">{format(stake.startDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p></div>
                <div><p className="text-sm text-gray-500">Fim</p><p className="font-medium">{format(stake.endDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p></div>
              </div>
              {stake.status !== 'completed' && (
                <div className="flex justify-end">
                  <Button onClick={() => markCompleted(stake.id)} className="bg-blue-600 hover:bg-blue-700 text-white">Marcar como concluído</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
