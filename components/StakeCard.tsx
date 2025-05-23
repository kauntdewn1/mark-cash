import { format } from 'date-fns';

export default function StakeCard({ stake }: { stake: any }) {
  return (
    <div className="border border-yellow-500 bg-zinc-950 p-4 rounded-xl shadow-md mb-4 text-white">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Stake: {stake.amount} MKS</h3>
        <span
          className={`px-2 py-1 text-sm rounded ${
            stake.status === 'active'
              ? 'bg-green-700'
              : stake.status === 'completed'
              ? 'bg-blue-600'
              : 'bg-red-600'
          }`}
        >
          {stake.status}
        </span>
      </div>

      <div className="mt-2 text-sm text-zinc-300 space-y-1">
        <p>
          <strong>Recompensa:</strong> {stake.rewards} MKS
        </p>
        <p>
          <strong>Início:</strong>{' '}
          {stake.startDate?.seconds
            ? format(new Date(stake.startDate.seconds * 1000), 'dd/MM/yyyy')
            : '---'}
        </p>
        <p>
          <strong>Fim:</strong>{' '}
          {stake.endDate?.seconds
            ? format(new Date(stake.endDate.seconds * 1000), 'dd/MM/yyyy')
            : '---'}
        </p>
        <p className="text-xs text-zinc-400">ID: {stake.id}</p>
      </div>
    </div>
  );
} 