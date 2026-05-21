import { useState, useEffect } from 'react';
import { usePomodoroContext } from '../context/PomodoroContext';

export default function SettingsPanel() {
  const { focusDuration, breakDuration, updateSettings, isRunning, mode } = usePomodoroContext();
  const [isOpen, setIsOpen] = useState(false);
  const [localFocus, setLocalFocus] = useState(focusDuration);
  const [localBreak, setLocalBreak] = useState(breakDuration);
  const [error, setError] = useState('');

  useEffect(() => {
    setLocalFocus(focusDuration);
    setLocalBreak(breakDuration);
  }, [focusDuration, breakDuration]);

  const validate = (focus, brk) => {
    if (isNaN(focus) || isNaN(brk)) return 'Please enter valid numbers';
    if (focus < 1 || focus > 120) return 'Focus must be 1–120 minutes';
    if (brk < 1 || brk > 120) return 'Break must be 1–120 minutes';
    return '';
  };

  const handleApply = () => {
    const f = parseInt(localFocus, 10);
    const b = parseInt(localBreak, 10);
    const err = validate(f, b);
    if (err) {
      setError(err);
      return;
    }
    setError('');
    updateSettings({ focusDuration: f, breakDuration: b });
    setIsOpen(false);
  };

  return (
    <div className="mb-6 max-w-sm mx-auto w-full">
      <button
        id="btn-settings-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 mx-auto text-sm text-white/50 hover:text-white/80 transition-colors duration-200 cursor-pointer"
        aria-expanded={isOpen}
        aria-controls="settings-panel"
        aria-label="Toggle settings"
      >
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Settings
      </button>

      <div
        id="settings-panel"
        className={`overflow-hidden transition-all duration-400 ease-in-out ${
          isOpen ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="input-focus" className="block text-xs font-medium text-white/60 mb-1.5">
                Focus (min)
              </label>
              <input
                id="input-focus"
                type="number"
                min={1}
                max={120}
                value={localFocus}
                onChange={(e) => setLocalFocus(e.target.value)}
                disabled={isRunning}
                className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:opacity-40 disabled:cursor-not-allowed [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <label htmlFor="input-break" className="block text-xs font-medium text-white/60 mb-1.5">
                Break (min)
              </label>
              <input
                id="input-break"
                type="number"
                min={1}
                max={120}
                value={localBreak}
                onChange={(e) => setLocalBreak(e.target.value)}
                disabled={isRunning}
                className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:opacity-40 disabled:cursor-not-allowed [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400" role="alert">{error}</p>
          )}

          <button
            id="btn-apply-settings"
            onClick={handleApply}
            disabled={isRunning}
            className={`w-full py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 cursor-pointer ${
              isRunning
                ? 'bg-white/5 text-white/30 cursor-not-allowed'
                : mode === 'focus'
                  ? 'bg-violet-600/80 hover:bg-violet-500/80 active:scale-[0.98]'
                  : 'bg-emerald-600/80 hover:bg-emerald-500/80 active:scale-[0.98]'
            }`}
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
}
