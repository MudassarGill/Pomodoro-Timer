import { useState, useEffect, useRef, useCallback } from 'react';
import { minutesToSeconds, calculateProgress } from '../utils/timer';
import { saveState, loadState } from '../utils/storage';
import { getTodayString, isNewDay } from '../utils/date';
import { playNotificationSound } from '../utils/audio';

export function usePomodoro() {
  const [state, setState] = useState(() => {
    const saved = loadState();
    return {
      mode: saved.mode || 'focus',
      isRunning: false,
      isPaused: false,
      focusDuration: saved.focusDuration || 25,
      breakDuration: saved.breakDuration || 5,
      remainingTime: saved.remainingTime || minutesToSeconds(saved.focusDuration || 25),
      history: saved.history || [],
      currentDate: saved.currentDate || getTodayString(),
    };
  });

  const intervalRef = useRef(null);
  const stateRef = useRef(state);

  // Keep stateRef in sync
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Save to localStorage on state changes (debounced)
  const saveTimeoutRef = useRef(null);
  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveState(state);
    }, 300);
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [state]);

  // Compute total duration for current mode
  const totalDuration = state.mode === 'focus'
    ? minutesToSeconds(state.focusDuration)
    : minutesToSeconds(state.breakDuration);

  // Compute progress (1 = full, 0 = done)
  const progress = calculateProgress(state.remainingTime, totalDuration);

  // Clear interval helper
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Handle session completion
  const handleCompletion = useCallback(() => {
    clearTimer();
    playNotificationSound();

    setState(prev => {
      const newState = { ...prev, isRunning: false, isPaused: false };

      if (prev.mode === 'focus') {
        // Save completed focus session to history
        const historyEntry = {
          type: 'focus',
          duration: prev.focusDuration,
          completedAt: new Date().toISOString(),
        };
        newState.history = [...prev.history, historyEntry];
        // Switch to break
        newState.mode = 'break';
        newState.remainingTime = minutesToSeconds(prev.breakDuration);
      } else {
        // Break completed, switch to focus
        newState.mode = 'focus';
        newState.remainingTime = minutesToSeconds(prev.focusDuration);
      }

      return newState;
    });

    // Auto-start next session after a short delay
    setTimeout(() => {
      setState(prev => ({ ...prev, isRunning: true, isPaused: false }));
    }, 1500);
  }, [clearTimer]);

  // Tick function
  const tick = useCallback(() => {
    setState(prev => {
      if (!prev.isRunning || prev.isPaused) return prev;
      const newRemaining = prev.remainingTime - 1;
      if (newRemaining <= 0) {
        return { ...prev, remainingTime: 0 };
      }
      return { ...prev, remainingTime: newRemaining };
    });
  }, []);

  // Watch for completion
  useEffect(() => {
    if (state.remainingTime === 0 && state.isRunning) {
      handleCompletion();
    }
  }, [state.remainingTime, state.isRunning, handleCompletion]);

  // Start/stop interval based on isRunning and isPaused
  useEffect(() => {
    if (state.isRunning && !state.isPaused) {
      clearTimer();
      intervalRef.current = setInterval(tick, 1000);
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [state.isRunning, state.isPaused, tick, clearTimer]);

  // Handle visibility change for tab-inactive drift correction
  useEffect(() => {
    let lastTickTime = Date.now();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && stateRef.current.isRunning && !stateRef.current.isPaused) {
        const now = Date.now();
        const elapsed = Math.floor((now - lastTickTime) / 1000);
        if (elapsed > 2) {
          setState(prev => ({
            ...prev,
            remainingTime: Math.max(0, prev.remainingTime - elapsed + 1),
          }));
        }
      }
      lastTickTime = Date.now();
    };

    // Update lastTickTime on each tick
    const tickTracker = setInterval(() => {
      if (stateRef.current.isRunning && !stateRef.current.isPaused) {
        lastTickTime = Date.now();
      }
    }, 1000);

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(tickTracker);
    };
  }, []);

  // New day detection
  useEffect(() => {
    if (isNewDay(state.currentDate)) {
      setState(prev => ({
        ...prev,
        history: [],
        currentDate: getTodayString(),
      }));
    }
  }, [state.currentDate]);

  // Actions
  const start = useCallback(() => {
    setState(prev => {
      const remaining = prev.remainingTime > 0
        ? prev.remainingTime
        : minutesToSeconds(prev.mode === 'focus' ? prev.focusDuration : prev.breakDuration);
      return { ...prev, isRunning: true, isPaused: false, remainingTime: remaining };
    });
  }, []);

  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resume = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: false }));
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      remainingTime: minutesToSeconds(prev.mode === 'focus' ? prev.focusDuration : prev.breakDuration),
    }));
  }, [clearTimer]);

  const updateSettings = useCallback(({ focusDuration, breakDuration }) => {
    const fd = Math.min(120, Math.max(1, focusDuration));
    const bd = Math.min(120, Math.max(1, breakDuration));

    clearTimer();
    setState(prev => ({
      ...prev,
      focusDuration: fd,
      breakDuration: bd,
      isRunning: false,
      isPaused: false,
      remainingTime: minutesToSeconds(prev.mode === 'focus' ? fd : bd),
    }));
  }, [clearTimer]);

  return {
    ...state,
    progress,
    totalDuration,
    start,
    pause,
    resume,
    reset,
    updateSettings,
  };
}
