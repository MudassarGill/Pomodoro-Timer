/**
 * Get today's date as YYYY-MM-DD string
 */
export function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format an ISO date string to readable time like "3:42 PM"
 */
export function formatCompletionTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Check if a date string is today
 */
export function isToday(dateString) {
  return dateString === getTodayString();
}

/**
 * Check if stored date is a new day compared to today
 */
export function isNewDay(storedDate) {
  return storedDate !== getTodayString();
}
