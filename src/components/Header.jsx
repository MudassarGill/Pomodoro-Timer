import { usePomodoroContext } from '../context/PomodoroContext';

export default function Header() {
  const { mode } = usePomodoroContext();

  return (
    <header className="text-center mb-8 pt-6">
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className="text-4xl" role="img" aria-label="tomato">🍅</span>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Pomodoro Timer
        </h1>
      </div>
      <div className="inline-flex items-center gap-2">
        <span
          className={`inline-block w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
            mode === 'focus' ? 'bg-violet-400' : 'bg-emerald-400'
          }`}
        />
        <span
          className={`text-sm font-medium tracking-wide uppercase transition-colors duration-500 ${
            mode === 'focus' ? 'text-violet-300' : 'text-emerald-300'
          }`}
        >
          {mode === 'focus' ? 'Focus Mode' : 'Break Mode'}
        </span>
      </div>
    </header>
  );
}
