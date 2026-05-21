import { usePomodoroContext } from '../context/PomodoroContext';
import ProgressRing from './ProgressRing';
import CountdownDisplay from './CountdownDisplay';
import { useState, useEffect } from 'react';

export default function PomodoroTimer() {
  const { progress, mode, remainingTime } = usePomodoroContext();
  const [celebrating, setCelebrating] = useState(false);

  // Celebration effect when timer hits 0
  useEffect(() => {
    if (remainingTime === 0) {
      setCelebrating(true);
      const timeout = setTimeout(() => setCelebrating(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [remainingTime]);

  return (
    <div className="relative flex justify-center mb-8">
      {/* Glassmorphism card */}
      <div
        className={`relative p-8 md:p-12 rounded-3xl backdrop-blur-xl border transition-all duration-700 ${
          mode === 'focus'
            ? 'bg-white/5 border-violet-500/20 shadow-[0_0_60px_-15px_rgba(139,92,246,0.3)]'
            : 'bg-white/5 border-emerald-500/20 shadow-[0_0_60px_-15px_rgba(52,211,153,0.3)]'
        }`}
      >
        <ProgressRing progress={progress} mode={mode}>
          <CountdownDisplay />
        </ProgressRing>

        {/* Celebration particles */}
        {celebrating && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-ping"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  backgroundColor: mode === 'focus'
                    ? `hsl(${260 + Math.random() * 40}, 80%, ${60 + Math.random() * 20}%)`
                    : `hsl(${150 + Math.random() * 40}, 70%, ${50 + Math.random() * 20}%)`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${0.8 + Math.random() * 0.8}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
