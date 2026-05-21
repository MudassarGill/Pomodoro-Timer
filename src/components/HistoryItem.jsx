import { formatTime, minutesToSeconds } from '../utils/timer';
import { formatCompletionTime } from '../utils/date';

export default function HistoryItem({ entry, index }) {
  return (
    <div
      className="flex items-center gap-3 py-2.5 px-3 rounded-xl bg-white/5 border border-white/5"
      style={{
        animation: `fadeIn 0.4s ease-out ${index * 50}ms both`,
      }}
    >
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
        <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className="text-sm text-white/80 font-medium">
        {formatTime(minutesToSeconds(entry.duration))} Focus
      </span>
      <span className="text-xs text-white/40 ml-auto">
        {formatCompletionTime(entry.completedAt)}
      </span>
    </div>
  );
}
