<script setup lang="ts">
import { useCalendarStore } from '@/stores/calendar';
import { computed } from 'vue';
import CalendarDay from '../../model/CalendarDay';
import CalendarDayCell from './CalendarDayCell.vue';
import { useReminderModalStore } from '@/stores/reminderModal';
import { useRemindersStore } from '@/stores/reminders';
import { useDateDetailsOffcanvasStore } from '@/stores/dateDetailsOffcanvas';
import { getLocalizedMonthName, getLocalizedWeekdayNames } from '@/utils/dateLocale';

const calendarStore = useCalendarStore();
const reminderModalStore = useReminderModalStore();
const remindersStore = useRemindersStore();
const dateDetailsOffcanvasStore = useDateDetailsOffcanvasStore();

// Get localized weekday names
const weekDays = getLocalizedWeekdayNames();

// Get localized month name
const currentMonthName = computed(() => {
  return getLocalizedMonthName(calendarStore.currentMonth, calendarStore.currentYear);
});

const calendarBodyPayload = computed(() => {
  const firstDayOfTheMonth: Date = new Date(calendarStore.currentYear, calendarStore.currentMonth, 1);
  const firstDayOfMonthWeekDayIndex: number = firstDayOfTheMonth.getDay();

  const weeks: CalendarDay[][] = [];
  let lastMonthDayProcessed = false;
  const currentIteration: Date = new Date(firstDayOfTheMonth.getTime());

  if(firstDayOfMonthWeekDayIndex != 0) {
    currentIteration.setDate(currentIteration.getDate() - firstDayOfMonthWeekDayIndex);
  }
  else {
    currentIteration.setDate(currentIteration.getDate() - 7);
  }

  do {
    const week: CalendarDay[] = [];
    for(let i = 0; i < 7; i++) {
      const remindersForDay = remindersStore.getRemindersByDate(currentIteration);
      const day = new CalendarDay({
        day: currentIteration.getDate(),
        month: currentIteration.getMonth(),
        year: currentIteration.getFullYear(),
        isOutsideMonth: currentIteration.getMonth() === calendarStore.currentMonth,
        isToday: currentIteration.getDate() === calendarStore.currentDay && currentIteration.getMonth() === calendarStore.currentMonth && currentIteration.getFullYear() === calendarStore.currentYear,
        reminders: remindersForDay,
        dayOfWeek: currentIteration.getDay(),
      });
      week.push(day);

      if(currentIteration.getMonth() === calendarStore.currentMonth) {
        lastMonthDayProcessed = true;
      }

      currentIteration.setDate(currentIteration.getDate() + 1);
    }

    weeks.push(week);

    const isTargetingDecember = calendarStore.currentMonth === 11; // Means that December is the last expected month, so our exit condition is reversed

    if(isTargetingDecember) lastMonthDayProcessed = currentIteration.getMonth() === 0;
    else lastMonthDayProcessed = currentIteration.getMonth() === calendarStore.currentMonth + 1;
  } while (!lastMonthDayProcessed);

  return weeks;
});

const onAddButtonClicked = (day: CalendarDay) => {
  reminderModalStore.setupNewEventForm({day: day.day, month: day.month, year: day.year});
  reminderModalStore.modalModelValue = true;
};

const onDayCellClicked = (day: CalendarDay) => {
  dateDetailsOffcanvasStore.openDateDetails(day);
};


</script>

<template>
  <div class="flex flex-col bg-gray-100 rounded-3xl p-4 w-full max-w-[960px] gap-2">
    <div class="flex flex-row justify-center py-6">
      <div class="text-5xl">{{ currentMonthName }} {{ calendarStore.currentYear }}</div>
    </div>
    <div class="flex flex-row justify-between mt-4 gap-2">
      <div
        v-for="(day, index) in weekDays"
        :key="day"
        :class="[
          'flex-1',
          'rounded-sm',
          'text-center',
          'py-1',
          'truncate',
          'text-ellipsis',
          'text-white',
          index === 0 ? 'bg-red-500' : 'bg-gray-800' // Sunday is always index 0
        ]">
        {{ day }}
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex flex-row gap-2"
        v-for="(week, weekIndex) in calendarBodyPayload"
        :key="weekIndex"
      >
        <CalendarDayCell
          v-for="(day, dayIndex) in week"
          :key="dayIndex"
          :calendarDay="day"
          @add-button-clicked="onAddButtonClicked"
          @click="onDayCellClicked(day)"
        />
      </div>
    </div>
  </div>
</template>