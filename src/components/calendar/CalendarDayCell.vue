<script setup lang="ts">
import { computed, ref } from 'vue';
import CalendarDay from '../../model/CalendarDay';
import computeLuminance from '@/utils/computeLuminance';
import Reminder from '@/model/Reminder';

const props = defineProps<{
  calendarDay: CalendarDay
}>();

const emits = defineEmits<{
  (e: 'addButtonClicked', day: CalendarDay): void
}>();

const isBeingHovered = ref(false);

const onMouseEnter = () => {
  isBeingHovered.value = true;
};
const onMouseLeave = () => {
  isBeingHovered.value = false;
};

const onAddButtonClicked = () => {
  emits('addButtonClicked', props.calendarDay);
};

const displayedReminders = computed(() => {
  const sortRemindersByTime = (a: Reminder, b: Reminder) => {
    return a.date.getTime() - b.date.getTime();
  };
  
  if(props.calendarDay.reminders.length > 4) return props.calendarDay.reminders.sort(sortRemindersByTime).slice(0, 3);
  return props.calendarDay.reminders.sort(sortRemindersByTime).slice(0, 4);
});

const getReminderIndicatorTextColor = (hexColor: string) => {
  const luminance = computeLuminance(hexColor);
  return luminance > 0.5 ? 'text-black' : 'text-white';
}
  
</script>

<template>
  <div :class="[
      'flex flex-col rounded-lg p-2 w-full h-[135px] cursor-pointer gap-2 overflow-hidden',
      calendarDay.isOutsideMonth ? 'bg-white' : 'border border-gray-300',
    ]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="flex flex-row items-center min-h-[22px] pl-1">
      <div class="flex flex-1 flex-row items-center">
        <div :class="[
          'flex flex-col',
          'min-h-5 min-w-5',
          'text-sm',
          'font-medium',
          calendarDay.isOutsideMonth ? 'text-gray-900' : 'text-gray-400',
          calendarDay.isToday ? 'bg-red-500 text-white rounded-sm text-center' : '',
        ]"
        >{{ calendarDay.day }}</div>
      </div>
      <button
        v-show="isBeingHovered"
        class="p-1 rounded-full bg-green-600 hover:bg-green-500 cursor-pointer flex items-center justify-center"
        @click.stop="onAddButtonClicked"
      >
        <span class="material-symbols-rounded text-white" style="font-size: 14px;">
          add
        </span>
      </button>
    </div>

    <div class="flex flex-col flex-1" ref="reminders-container">
      <div
        v-for="reminder in displayedReminders"
        :key="reminder.id"
        :class="['text-xs rounded-lg px-1 py-0.5 mb-1 truncate overflow-x-hidden', getReminderIndicatorTextColor(reminder.color)]"
        :style="{ backgroundColor: reminder.color }"
        :title="reminder.title"
      >
        {{ reminder.title }}
      </div>
      <div
        v-if="calendarDay.reminders.length > 4"
        class="text-xs rounded-lg px-1 py-0.5 mb-1 truncate text-center"
      >
        +{{ calendarDay.reminders.length - 4 }}
      </div>

    </div>
  </div>
</template>