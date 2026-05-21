import { getTodayString, isNewDay } from './date';
import { minutesToSeconds } from './timer';

const STORAGE_KEY = 'pomodoro-timer-state';

const DEFAULT_STATE = {
  focusDuration: 25,
  breakDuration: 5,
  mode: 'focus',
  remainingTime: minutesToSeconds(25),
  isRunning: false,
  isPaused: false,
  history: [],
  currentDate: getTodayString(),
};

/**
 * Save state to localStorage
 */
export function saveState(state) {
  try {
    const serialized = JSON.stringify({
      focusDuration: state.focusDuration,
      breakDuration: state.breakDuration,
      mode: state.mode,
      remainingTime: state.remainingTime,
      isRunning: state.isRunning,
      isPaused: state.isPaused,
      history: state.history,
      currentDate: state.currentDate,
      lastSaveTimestamp: Date.now(),
    });
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (e) {
    console.warn('Failed to save state to localStorage:', e);
  }
}

/**
 * Load state from localStorage. Returns defaults if corrupted or missing.
 * Auto-clears history if it's a new day.
 */
export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };

    const parsed = JSON.parse(raw);

    // Validate essential fields
    if (typeof parsed.focusDuration !== 'number' || typeof parsed.breakDuration !== 'number') {
      return { ...DEFAULT_STATE };
    }

    // New day detection: clear history
    if (parsed.currentDate && isNewDay(parsed.currentDate)) {
      parsed.history = [];
      parsed.currentDate = getTodayString();
    }

    // Handle timer drift if was running when page closed
    if (parsed.isRunning && !parsed.isPaused && parsed.lastSaveTimestamp) {
      const elapsed = Math.floor((Date.now() - parsed.lastSaveTimestamp) / 1000);
      parsed.remainingTime = Math.max(0, parsed.remainingTime - elapsed);
    }

    // Don't restore running state - user should manually restart
    parsed.isRunning = false;
    parsed.isPaused = false;

    return {
      ...DEFAULT_STATE,
      ...parsed,
    };
  } catch (e) {
    console.warn('Failed to load state from localStorage:', e);
    return { ...DEFAULT_STATE };
  }
}

/**
 * Clear all stored state
 */
export function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear localStorage:', e);
  }
}

export { DEFAULT_STATE };
