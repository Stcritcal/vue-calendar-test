import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { City } from '@/model/City.js'

export const useReminderModalStore = defineStore('reminderModal', () => {
  const modalModelValue = ref<boolean>(false);

  // If the id is null, it's a new reminder
  // otherwise, it's an existing reminder being edited
  const id = ref<number | null>(null);

  const title = ref<string>('');
  const date = ref<Date | null>(null);
  const time = ref<string>('');
  const color = ref<string>('#3888ff');
  const city = ref<City | null>(null);
  const weather = ref<string>('');

  const setupNewEventForm = (selectedDate: { day: number; month: number; year: number }) => {
    id.value = null;
    title.value = '';
    date.value = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
    time.value = '';
    color.value = '#3888ff';
    city.value = null;
    weather.value = '';
  }

  return {
    modalModelValue,
    id,
    title,
    date,
    time,
    color,
    city,
    weather,
    setupNewEventForm
  }
});