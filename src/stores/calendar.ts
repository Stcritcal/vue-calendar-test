import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', () => {
  const now: Date = new Date();

  const currentDay = ref<number>(now.getDate());
  const currentMonth = ref<number>(now.getMonth());
  const currentYear = ref<number>(now.getFullYear());

  const goToPreviousMonth = () => {
    if (currentMonth.value === 0) {
      currentMonth.value = 11; // December
      currentYear.value--;
    } else {
      currentMonth.value--;
    }
    currentDay.value = 1; // Set to day 1 for safety
  };

  const goToNextMonth = () => {
    if (currentMonth.value === 11) {
      currentMonth.value = 0; // January
      currentYear.value++;
    } else {
      currentMonth.value++;
    }
    currentDay.value = 1; // Set to day 1 for safety
  };

  const goToDate = (day: number, month: number, year: number) => {
    currentDay.value = day;
    currentMonth.value = month;
    currentYear.value = year;
  };

  return {
    now,
    currentDay,
    currentMonth,
    currentYear,
    goToPreviousMonth,
    goToNextMonth,
    goToDate,
  }
})
