'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Papa from 'papaparse';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';

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

  useEffect(() => {
    const fetchStakes = async () => {
      try {
        const stakesRef = collection(db, 'stakes');
        const q = query(stakesRef, orderBy('startDate', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const stakesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          startDate: doc.data().startDate.toDate(),
          endDate: doc.data().endDate.toDate()
        })) as Stake[];

        setStakes(stakesData);
        setFiltered(stakesData);

        // Calcular estatísticas
        const uniqueStakers = new Set(stakesData.map(stake => stake.userId)).size;
        const activeStakes = stakesData.filter(stake => stake.status === 'active').length;
        const totalStaked = stakesData.reduce((acc, stake) => acc + stake.amount, 0);
        const totalRewards = stakesData.reduce((acc, stake) => acc + stake.rewards, 0);

        setStats({
          totalStaked,
          uniqueStakers,
          activeStakes,
          totalRewards
        });
      } catch (error) {
        console.error('Erro ao buscar stakes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStakes();
  }, []);

  const handleFilter = () => {
    const filtered = stakes.filter((s) => {
      const matchWallet = s.userId?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      return matchWallet && matchStatus;
    });
    setFiltered(filtered);
  };

  const exportCSV = () => {
    const csvData = filtered.map(stake => ({
      Wallet: stake.userId,
      Amount: stake.amount,
      Status: stake.status,
      'Data Início': format(stake.startDate, 'dd/MM/yyyy'),
      'Data Fim': format(stake.endDate, 'dd/MM/yyyy'),
      Rewards: stake.rewards
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `stakes_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const markCompleted = async (docId: string) => {
    try {
      await updateDoc(doc(db, 'stakes', docId), { status: 'completed' });
      setFiltered((prev) =>
        prev.map((s) => (s.id === docId ? { ...s, status: 'completed' } : s))
      );
      setStakes((prev) =>
        prev.map((s) => (s.id === docId ? { ...s, status: 'completed' } : s))
      );
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Painel de Administração</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Staked</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalStaked.toLocaleString()} MKS</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Stakers Únicos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.uniqueStakers}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Stakes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.activeStakes}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalRewards.toLocaleString()} MKS</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder="Filtrar por carteira..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="completed">Completados</SelectItem>
            <SelectItem value="cancelled">Cancelados</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleFilter} variant="default">
          Filtrar
        </Button>
        <Button onClick={exportCSV} variant="secondary">
          Exportar CSV
        </Button>
      </div>

      <div className="grid gap-4">
        {filtered.map((stake) => (
          <Card key={stake.id}>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Wallet</p>
                  <p className="font-medium">{stake.userId.slice(0, 6)}...{stake.userId.slice(-4)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">{stake.amount.toLocaleString()} MKS</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className={`font-medium ${
                    stake.status === 'active' ? 'text-green-500' :
                    stake.status === 'completed' ? 'text-blue-500' :
                    'text-red-500'
                  }`}>
                    {stake.status === 'active' ? 'Ativo' :
                     stake.status === 'completed' ? 'Completado' :
                     'Cancelado'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rewards</p>
                  <p className="font-medium">{stake.rewards.toLocaleString()} MKS</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Início</p>
                  <p className="font-medium">
                    {format(stake.startDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fim</p>
                  <p className="font-medium">
                    {format(stake.endDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                </div>
              </div>
              {stake.status !== 'completed' && (
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => markCompleted(stake.id)}
                    variant="outline"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Marcar como concluído
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 