/**
 * Format seconds into mm:ss string
 * @param {number} seconds
 * @returns {string} formatted time like "25:00"
 */
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Convert minutes to seconds
 */
export function minutesToSeconds(minutes) {
  return minutes * 60;
}

/**
 * Convert seconds to minutes
 */
export function secondsToMinutes(seconds) {
  return Math.floor(seconds / 60);
}

/**
 * Calculate progress ratio (1 = full, 0 = empty)
 */
export function calculateProgress(remaining, total) {
  if (total <= 0) return 0;
  return remaining / total;
}
