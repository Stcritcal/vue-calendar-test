<script setup lang="ts">
import Offcanvas from '../offcanvas/Offcanvas.vue';
import { useDateDetailsOffcanvasStore } from '../../stores/dateDetailsOffcanvas';
import ReminderDetailsCard from './ReminderDetailsCard.vue';
import IconButton from '../iconButton/IconButton.vue';
import { useRemindersStore } from '@/stores/reminders';
import { computed } from 'vue';
import { getLocalizedWeekdayName } from '@/utils/dateLocale';

const dateDetailsOffcanvasStore = useDateDetailsOffcanvasStore();
const remindersStore = useRemindersStore();

const deleteAllReminders = () => {
  remindersStore.deleteAllReminderFromDate(dateDetailsOffcanvasStore.selectedDate!.toDate());
};

const dateReminders = computed(() => {
  return remindersStore.getRemindersByDate(dateDetailsOffcanvasStore.selectedDate!.toDate());
});

</script>

<template>
  <Offcanvas
    v-model="dateDetailsOffcanvasStore.offcanvasModelValue"
    position="right"
    size="xl"
  >
    <template #title>
      <div class="flex flex-1 flex-row items-center">
        <div class="flex flex-col w-[92px] font-medium bg-red-500 text-white rounded-3xl text-center text-6xl p-4">
        {{ dateDetailsOffcanvasStore.selectedDate?.day }}</div>
      </div>
    </template>
    <template #body>
      <div class="flex flex-col gap-4 flex-1" v-if="dateDetailsOffcanvasStore.selectedDate">
        <div class="flex flex-row justify-between">
          <div class="text-4xl font-semibold pl-2 flex-1">
            {{ getLocalizedWeekdayName(dateDetailsOffcanvasStore.selectedDate.dayOfWeek) }}
          </div>
          <IconButton v-if="dateReminders.length > 0" icon="delete" class="mr-4" @click="deleteAllReminders" />
        </div>
        <div class="flex flex-col gap-2" v-if="dateReminders.length > 0">
          <ReminderDetailsCard
            v-for="reminder in dateReminders"
            :key="reminder.id"
            :reminder="reminder"
          />
        </div>
        <div v-else class="flex flex-col justify-center items-center flex-1 gap-6">
          <img src="/reminders-placeholder.svg" alt="No Reminders" class="w-[50%] mx-auto mb-4" />
          <span class="text-gray-500 text-xl">No reminders for this date. Enjoy your day!</span>
        </div>
      </div>
    </template>
  </Offcanvas>
</template>