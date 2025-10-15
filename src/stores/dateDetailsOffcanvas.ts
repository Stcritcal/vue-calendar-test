import CalendarDay from "@/model/CalendarDay.js";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDateDetailsOffcanvasStore = defineStore('dateDetailsOffcanvas', () => {
  const offcanvasModelValue = ref<boolean>(false);
  const selectedDate = ref<CalendarDay | null>(null);

  const openDateDetails = (date: CalendarDay) => {
    selectedDate.value = date;
    offcanvasModelValue.value = true;
  };

  return {
    selectedDate,
    offcanvasModelValue,
    openDateDetails
  };
});