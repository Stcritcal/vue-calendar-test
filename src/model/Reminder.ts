import type { City } from './City.js';
import { mappedCities } from '../stores/cities.js';

export default class Reminder {
  id: number;
  title: string;
  color: string;
  date: Date;
  city?: City;
  weather?: string;

  constructor(payload: any) {
    this.id = payload.id;
    this.title = payload.title.trim();
    this.color = payload.color;
    this.date = new Date(payload.date);

    // Handle both old string format and new City object format for backwards compatibility
    if (typeof payload.city === 'string') {
      // Convert string to City object by finding it in mappedCities
      this.city = mappedCities.find(city => city.name === payload.city) || undefined;
    } else {
      console.log('Payload city:', payload.city);
      this.city = payload.city;
    }

    this.weather = payload.weather;
  }

  static validateFormData(title: string, date: Date | null, time: string, color: string): string | undefined {
    // Title validation
    if (!title || title.trim().length === 0) return 'Title is required';
    if (title.trim().length > 30) return 'Title must be 30 characters or less';

    // Date validation
    if (!date) return 'Date is required';
    if (!(date instanceof Date) || isNaN(date.getTime())) return 'Date must be a valid date';

    // Time validation
    if (!time || time.trim().length === 0) return 'Time is required';
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeRegex.test(time)) return 'Time must be in HH:MM format (24-hour)';

    // Color validation
    if (!color || color.trim().length === 0) return 'Color is required';
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!colorRegex.test(color)) return 'Color must be a valid hex color (e.g., #FF0000 or #F00)';
  }

  isInTheSameDayAs(other: Date): boolean {
    return (
      this.date.getDate() === other.getDate() &&
      this.date.getMonth() === other.getMonth() &&
      this.date.getFullYear() === other.getFullYear()
    );
  }
}