import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', () => {
  const now: Date = new Date();

  const currentDay = ref<number>(now.getDate());
  const currentMonth = ref<number>(now.getMonth());
  const currentYear = ref<number>(now.getFullYear());

  return {
    currentDay,
    currentMonth,
    currentYear,
  }
})
