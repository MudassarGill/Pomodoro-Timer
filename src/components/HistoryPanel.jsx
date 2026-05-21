import { usePomodoroContext } from '../context/PomodoroContext';
import HistoryItem from './HistoryItem';

export default function HistoryPanel() {
  const { history } = usePomodoroContext();

  return (
    <div className="max-w-sm mx-auto w-full">
      <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Today's Sessions
      </h2>

      {history.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-white/30 text-sm">No sessions completed yet.</p>
          <p className="text-white/20 text-xs mt-1">Start your first focus session! 🚀</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {history.map((entry, i) => (
            <HistoryItem key={entry.completedAt} entry={entry} index={i} />
          ))}
          <p className="text-center text-xs text-white/30 pt-2">
            {history.length} session{history.length !== 1 ? 's' : ''} completed today ✨
          </p>
        </div>
      )}
    </div>
  );
}
