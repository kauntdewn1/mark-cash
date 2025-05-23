'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

interface BrutalistCountdownProps {
  date: Date;
}

export function BrutalistCountdown({ date }: BrutalistCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +date - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Atualiza a cada minuto

    return () => clearInterval(timer);
  }, [date]);

  const timeBlocks = [
    { label: 'DIAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-center gap-2">
        {timeBlocks.map((block, index) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="bg-black border-2 border-yellow-500 px-3 py-1 transform hover:scale-105 transition-transform">
              <div className="text-center">
                <motion.div
                  key={block.value}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="relative"
                >
                  <span className="text-2xl md:text-3xl font-bold text-yellow-500 font-mono">
                    {block.value.toString().padStart(2, '0')}
                  </span>
                  {/* Efeito Glitch */}
                  <span className="absolute top-0 left-0 text-2xl md:text-3xl font-bold text-yellow-500 font-mono opacity-50 animate-glitch">
                    {block.value.toString().padStart(2, '0')}
                  </span>
                  <span className="absolute top-0 left-0 text-2xl md:text-3xl font-bold text-yellow-500 font-mono opacity-30 animate-glitch-delayed">
                    {block.value.toString().padStart(2, '0')}
                  </span>
                </motion.div>
                <div className="text-xs font-mono text-yellow-500 mt-1">
                  {block.label}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-full h-full bg-yellow-500 -z-10 group-hover:bg-yellow-400 transition-colors"></div>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes glitch-delayed {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(2px, -2px);
          }
          40% {
            transform: translate(2px, 2px);
          }
          60% {
            transform: translate(-2px, -2px);
          }
          80% {
            transform: translate(-2px, 2px);
          }
          100% {
            transform: translate(0);
          }
        }

        .animate-glitch {
          animation: glitch 0.3s infinite;
        }

        .animate-glitch-delayed {
          animation: glitch-delayed 0.3s infinite;
        }
      `}</style>
    </div>
  );
} 