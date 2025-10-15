import { ref } from 'vue'
import { defineStore } from 'pinia'
import Reminder from '@/model/Reminder.js';
import { WeatherService } from '@/services/weatherService.js';

export const useRemindersStore = defineStore('reminders', () => {
  // I'm leaving it in this way for simplicity, but in a real application
  // I would rely on the database to generate unique IDs.
  const idCounter = ref<number>(0);

  const now = new Date();
  now.setHours(10, 0, 0, 0);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const reminders = ref<Reminder[]>([]);

  const combineDateAndTime = (date: Date, time: string): Date => {
    const [hours, minutes] = time.split(':').map((part: string) => parseInt(part, 10));
    const combined = new Date(date);
    combined.setHours(hours, minutes, 0, 0);
    return combined;
  }

  const addReminder = async (reminder: any) => {
    const error = Reminder.validateFormData(reminder.title, reminder.date, reminder.time, reminder.color);

    if (error) {
      throw new Error(error);
    }

    const dateTime = combineDateAndTime(new Date(reminder.date), reminder.time);

    // Fetch weather data if city is provided
    if (reminder.city && !reminder.weather) {
      try {
        reminder.weather = await WeatherService.fetchWeatherForCity(reminder.city, dateTime);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
        reminder.weather = '--';
      }
    }

    reminder.date = dateTime;
    reminder.id = idCounter.value++;

    reminders.value.push(new Reminder(reminder)); // Here we are adding just validated reminders
  };

  const updateReminder = async (updatedReminder: any) => {
    const index = reminders.value.findIndex(reminder => reminder.id === updatedReminder.id);
    if (index !== -1) {
      const error = Reminder.validateFormData(updatedReminder.title, updatedReminder.date, updatedReminder.time, updatedReminder.color);

      if (error) {
        throw new Error(error);
      }

      const dateTime = combineDateAndTime(new Date(updatedReminder.date), updatedReminder.time);

      // Fetch weather data if city is provided and weather needs updating
      const existingReminder = reminders.value[index];
      const cityChanged = !existingReminder.city || !updatedReminder.city || existingReminder.city.name !== updatedReminder.city.name;
      const dateTimeChanged = existingReminder.date.getTime() !== dateTime.getTime();

      if (updatedReminder.city && (cityChanged || dateTimeChanged)) {
        try {
          updatedReminder.weather = await WeatherService.fetchWeatherForCity(updatedReminder.city, dateTime);
        } catch (error) {
          console.error('Failed to fetch weather data:', error);
          updatedReminder.weather = 'Weather unavailable';
        }
      } updatedReminder.date = dateTime;
      // Preserve the original ID to prevent duplication
      updatedReminder.id = existingReminder.id;

      reminders.value[index] = new Reminder(updatedReminder); // Ensure it's an instance of Reminder
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