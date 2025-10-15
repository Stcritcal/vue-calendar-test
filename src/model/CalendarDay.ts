import Reminder from "@/model/Reminder.js";

export default class CalendarDay {
  day: number;
  month: number;
  year: number;
  dayOfWeek: number;

  isOutsideMonth: boolean;
  isToday: boolean;

  reminders: Reminder[];

  constructor(payload: any) {
    this.day = payload.day;
    this.month = payload.month;
    this.year = payload.year;
    this.dayOfWeek = payload.dayOfWeek;

    this.isOutsideMonth = payload.isOutsideMonth;
    this.isToday = payload.isToday || false;

    this.reminders = payload.reminders || [];
  }

  isTheSameDayAs(other: Date): boolean {
    return (
      this.day === other.getDate() &&
      this.month === other.getMonth() &&
      this.year === other.getFullYear()
    );
  }

  toDate(): Date {
    return new Date(this.year, this.month, this.day);
  }
}