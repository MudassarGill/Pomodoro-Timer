import { usePomodoroContext } from '../context/PomodoroContext';
import { formatTime } from '../utils/timer';

export default function CountdownDisplay() {
  const { remainingTime, mode, isRunning, isPaused } = usePomodoroContext();

  return (
    <div className="text-center select-none">
      <div
        className="text-6xl md:text-7xl font-bold text-white tracking-tight"
        style={{ fontVariantNumeric: 'tabular-nums' }}
        aria-live="polite"
        aria-atomic="true"
        role="timer"
      >
        {formatTime(remainingTime)}
      </div>
      <p
        className={`mt-2 text-sm font-medium tracking-widest uppercase transition-colors duration-500 ${
          mode === 'focus' ? 'text-violet-300/80' : 'text-emerald-300/80'
        }`}
      >
        {mode === 'focus' ? 'Focus Session' : 'Break Time'}
      </p>
      {isRunning && isPaused && (
        <p className="mt-1 text-xs text-amber-400/80 animate-pulse font-medium">Paused</p>
      )}
    </div>
  );
}
