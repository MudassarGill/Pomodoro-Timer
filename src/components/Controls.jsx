import { usePomodoroContext } from '../context/PomodoroContext';

export default function Controls() {
  const { isRunning, isPaused, start, pause, resume, reset, mode } = usePomodoroContext();

  const accentClasses = mode === 'focus'
    ? 'from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-violet-500/25'
    : 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25';

  const buttonBase = 'px-6 py-3 md:px-8 md:py-3.5 rounded-xl font-semibold text-white text-sm md:text-base transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent cursor-pointer select-none';

  return (
    <div className="flex items-center justify-center gap-3 md:gap-4 mb-8 flex-wrap" role="group" aria-label="Timer controls">
      {!isRunning && !isPaused && (
        <button
          id="btn-start"
          onClick={start}
          className={`${buttonBase} bg-gradient-to-r ${accentClasses} shadow-lg hover:shadow-xl hover:-translate-y-0.5`}
          aria-label="Start timer"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><polygon points="5,3 19,10 5,17" /></svg>
            Start
          </span>
        </button>
      )}

      {isRunning && !isPaused && (
        <button
          id="btn-pause"
          onClick={pause}
          className={`${buttonBase} bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 text-amber-300`}
          aria-label="Pause timer"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><rect x="4" y="3" width="4" height="14" rx="1" /><rect x="12" y="3" width="4" height="14" rx="1" /></svg>
            Pause
          </span>
        </button>
      )}

      {isRunning && isPaused && (
        <button
          id="btn-resume"
          onClick={resume}
          className={`${buttonBase} bg-gradient-to-r ${accentClasses} shadow-lg hover:shadow-xl hover:-translate-y-0.5`}
          aria-label="Resume timer"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><polygon points="5,3 19,10 5,17" /></svg>
            Resume
          </span>
        </button>
      )}

      {(isRunning || isPaused) && (
        <button
          id="btn-reset"
          onClick={reset}
          className={`${buttonBase} bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white`}
          aria-label="Reset timer"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Reset
          </span>
        </button>
      )}
    </div>
  );
}
