'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

interface BrutalistCountdownProps {
  date: Date;
}

export function BrutalistCountdown({ date }: BrutalistCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = +date - +new Date();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60)
        });
      }
    };
    const interval = setInterval(calc, 1000 * 30);
    calc();
    return () => clearInterval(interval);
  }, [date]);

  const blocks = [
    { label: 'DIA', value: timeLeft.days },
    { label: 'HRS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes }
  ];

  return (
    <div className="flex justify-center gap-2 text-red-400 font-mono tracking-widest">
      {blocks.map((b, i) => (
        <div key={i} className="relative px-4 py-2 border-2 border-red-500 bg-black text-center shadow-inner shadow-red-700">
          <div className="text-4xl font-bold animate-pulse">{String(b.value).padStart(2, '0')}</div>
          <div className="text-xs mt-1">{b.label}</div>
          <div className="absolute inset-0 animate-glitch border border-red-500 opacity-10 pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
}
