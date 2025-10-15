/**
 * Utility functions for locale-aware date formatting
 */

/**
 * Get localized month name
 * @param monthIndex - Month index (0-11)
 * @param year - Year (optional, defaults to current year)
 * @returns Localized month name (e.g., "January", "Janvier", "Januar")
 */
export const getLocalizedMonthName = (monthIndex: number, year?: number): string => {
  const currentYear = year ?? new Date().getFullYear();
  const date = new Date(currentYear, monthIndex, 1);
  return date.toLocaleDateString(undefined, { month: 'long' });
};

/**
 * Get localized weekday name
 * @param dayIndex - Day of week index (0 = Sunday, 1 = Monday, etc.)
 * @returns Localized weekday name (e.g., "Monday", "Lundi", "Montag")
 */
export const getLocalizedWeekdayName = (dayIndex: number): string => {
  // Create a date object for the specific day of week (using a known Sunday as reference)
  const date = new Date(2023, 0, dayIndex + 1); // January 1, 2023 was a Sunday
  return date.toLocaleDateString(undefined, { weekday: 'long' });
};

/**
 * Get all localized weekday names in order (Sunday to Saturday)
 * @returns Array of localized weekday names
 */
export const getLocalizedWeekdayNames = (): string[] => {
  return Array.from({ length: 7 }, (_, index) => getLocalizedWeekdayName(index));
};

/**
 * Get short localized weekday name
 * @param dayIndex - Day of week index (0 = Sunday, 1 = Monday, etc.)
 * @returns Short localized weekday name (e.g., "Mon", "Lun", "Mo")
 */
export const getLocalizedWeekdayNameShort = (dayIndex: number): string => {
  const date = new Date(2023, 0, dayIndex + 1);
  return date.toLocaleDateString(undefined, { weekday: 'short' });
};

/**
 * Get abbreviated localized weekday name
 * @param dayIndex - Day of week index (0 = Sunday, 1 = Monday, etc.)
 * @returns Abbreviated localized weekday name (e.g., "M", "L", "M")
 */
export const getLocalizedWeekdayNameNarrow = (dayIndex: number): string => {
  const date = new Date(2023, 0, dayIndex + 1);
  return date.toLocaleDateString(undefined, { weekday: 'narrow' });
};