// Date utility functions for formatting and manipulating dates

/**
 * Format a date string or Date object into a readable format
 * @param date - Date string or Date object
 * @param format - Format type: 'short', 'long', 'relative'
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  format: 'short' | 'long' | 'relative' = 'short'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  switch (format) {
    case 'short':
      // Format: MM/DD/YYYY
      return dateObj.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });

    case 'long':
      // Format: January 1, 2024
      return dateObj.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

    case 'relative':
      // Format: "2 days ago", "in 3 hours", etc.
      return getRelativeTime(dateObj);

    default:
      return dateObj.toLocaleDateString();
  }
}

/**
 * Get relative time string (e.g., "2 days ago", "in 3 hours")
 */
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffSec = Math.floor(Math.abs(diffMs) / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  const isPast = diffMs < 0;
  const prefix = isPast ? '' : 'in ';
  const suffix = isPast ? ' ago' : '';

  if (diffYear > 0) {
    return `${prefix}${diffYear} year${diffYear > 1 ? 's' : ''}${suffix}`;
  } else if (diffMonth > 0) {
    return `${prefix}${diffMonth} month${diffMonth > 1 ? 's' : ''}${suffix}`;
  } else if (diffWeek > 0) {
    return `${prefix}${diffWeek} week${diffWeek > 1 ? 's' : ''}${suffix}`;
  } else if (diffDay > 0) {
    return `${prefix}${diffDay} day${diffDay > 1 ? 's' : ''}${suffix}`;
  } else if (diffHour > 0) {
    return `${prefix}${diffHour} hour${diffHour > 1 ? 's' : ''}${suffix}`;
  } else if (diffMin > 0) {
    return `${prefix}${diffMin} minute${diffMin > 1 ? 's' : ''}${suffix}`;
  } else {
    return 'just now';
  }
}

/**
 * Format date and time together
 */
export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  return dateObj.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Check if a date is in the past
 */
export function isPastDate(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.getTime() < Date.now();
}

/**
 * Check if a date is today
 */
export function isToday(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();

  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * Get days until a date
 */
export function getDaysUntil(date: string | Date): number {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = dateObj.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
