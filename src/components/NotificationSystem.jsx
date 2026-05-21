import { useState, useEffect, useRef } from 'react';
import { usePomodoroContext } from '../context/PomodoroContext';

export default function NotificationSystem() {
  const { remainingTime, mode } = usePomodoroContext();
  const [notification, setNotification] = useState(null);
  const prevRemainingRef = useRef(remainingTime);

  useEffect(() => {
    // Detect session completion: remainingTime went to 0
    if (prevRemainingRef.current > 0 && remainingTime === 0) {
      const completedMode = mode;
      setNotification({
        message: completedMode === 'focus'
          ? '🎉 Focus session complete! Time for a break.'
          : '☕ Break is over! Ready to focus?',
        type: completedMode,
      });

      const timeout = setTimeout(() => setNotification(null), 4000);
      prevRemainingRef.current = remainingTime;
      return () => clearTimeout(timeout);
    }
    prevRemainingRef.current = remainingTime;
  }, [remainingTime, mode]);

  if (!notification) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50" style={{ animation: 'slideDown 0.4s ease-out' }}>
      <div
        className={`px-6 py-3 rounded-2xl backdrop-blur-xl border shadow-2xl text-sm font-medium text-white ${
          notification.type === 'focus'
            ? 'bg-violet-600/80 border-violet-400/30'
            : 'bg-emerald-600/80 border-emerald-400/30'
        }`}
        role="alert"
        aria-live="assertive"
      >
        {notification.message}
      </div>
    </div>
  );
}
