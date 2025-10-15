import { ref } from 'vue'
import { defineStore } from 'pinia'
import Reminder from '@/model/Reminder.js';

export const useRemindersStore = defineStore('reminders', () => {
  // I'm leaving it in this way for simplicity, but in a real application
  // I would rely on the database to generate unique IDs.
  const idCounter = ref<number>(7);

  const now = new Date();
  now.setHours(10, 0, 0, 0);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Those are just some sample reminders to illustrate the functionality
  const reminders = ref<Reminder[]>([
    new Reminder({ id: 0, title: 'Take care of the dog', color: '#ff4444', date: now, city: 'New York', weather: 'Sunny' }),
    new Reminder({ id: 1, title: 'Walk the cat', color: '#44ff44', date: now.setTime(now.getTime() + 500000), city: 'New York', weather: 'Sunny' }),
    new Reminder({ id: 2, title: 'Buy groceries', color: '#4444ff', date: now.setTime(now.getTime() + 1000000), city: 'New York', weather: 'Sunny' }),
    new Reminder({ id: 3, title: 'Prepare dinner for 35 people for some reason', color: '#ffaa00', date: now.setTime(now.getTime() + 1500000), city: 'New York', weather: 'Sunny' }),
    new Reminder({ id: 4, title: 'Read a book', color: '#aa00ff', date: now.setTime(now.getTime() + 2000000), city: 'New York', weather: 'Sunny' }),
    new Reminder({ id: 5, title: 'Exercise', color: '#00aaff', date: now.setTime(now.getTime() + 2500000), city: 'New York', weather: 'Sunny' }),
    new Reminder({ id: 6, title: 'Build a new lego set featuring some harry potter character', color: '#ff6699', date: tomorrow, city: 'New York', weather: 'Sunny' }),
    new Reminder({ id: 7, title: 'Test Reminder', color: '#99ff66', date: tomorrow.setTime(tomorrow.getTime() + 5000000), city: 'New York', weather: 'Sunny' }),
  ]);

  const addReminder = (reminder: any) => {
    const error = Reminder.validateFormData(reminder.title, reminder.date, reminder.time, reminder.color);

    if (error) {
      throw new Error(error);
    }

    const dateTime = new Date(reminder.date);
    const [hours, minutes] = reminder.time.split(':').map((part: string) => parseInt(part, 10));
    dateTime.setHours(hours, minutes, 0, 0);

    reminder.date = dateTime;
    reminder.id = idCounter.value++;
    reminders.value.push(new Reminder(reminder)); // Here we are adding just validated reminders
  };

  const updateReminder = (updatedReminder: Reminder) => {
    const index = reminders.value.findIndex(reminder => reminder.id === updatedReminder.id);
    if (index !== -1) {
      reminders.value[index] = updatedReminder; // Ensure it's an instance of Reminder
    } else {
      throw new Error('Reminder not found');
    }
  }

  const removeReminder = (id: number) => {
    reminders.value = reminders.value.filter(reminder => reminder.id !== id);
  };

  const getRemindersByDate = (date: Date): Reminder[] => {
    const sortRemindersByTime = (a: Reminder, b: Reminder) => {
      return a.date.getTime() - b.date.getTime();
    };

    return reminders.value.filter(reminder =>
      reminder.isInTheSameDayAs(date)
    ).sort(sortRemindersByTime);
  };

  const deleteReminder = (id: number) => {
    reminders.value = reminders.value.filter(reminder => reminder.id !== id);
  };

  const deleteAllReminderFromDate = (date: Date) => {
    reminders.value = reminders.value.filter(reminder =>
      !reminder.isInTheSameDayAs(date)
    );
  }

  const getReminderById = (id: number): Reminder | undefined => {
    return reminders.value.find(reminder => reminder.id === id);
  }


  return {
    reminders,
    addReminder,
    removeReminder,
    getRemindersByDate,
    deleteReminder,
    deleteAllReminderFromDate,
    getReminderById,
    updateReminder,
  };
});