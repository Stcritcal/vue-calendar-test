<script setup lang="ts">
import { useRemindersStore } from '@/stores/reminders';
import IconButton from '../iconButton/IconButton.vue';

import Reminder from '@/model/Reminder';
import { useReminderModalStore } from '@/stores/reminderModal';
import { useDateDetailsOffcanvasStore } from '@/stores/dateDetailsOffcanvas';

const dateDetailsOffcanvasStore = useDateDetailsOffcanvasStore();
const remindersStore = useRemindersStore();
const reminderModalStore = useReminderModalStore();

const deleteReminder = (reminderId: number) => {
  remindersStore.deleteReminder(reminderId);
};

const editReminder = (reminderId: number) => {
  const reminder = remindersStore.getReminderById(reminderId);
  if(reminder) {
    // Open modal with reminder data
    reminderModalStore.title = reminder.title;
    
    // Extract date part (without time)
    const dateOnly = new Date(reminder.date);
    dateOnly.setHours(0, 0, 0, 0);
    reminderModalStore.date = dateOnly;
    
    // Extract time part and format as HH:MM
    const hours = String(reminder.date.getHours()).padStart(2, '0');
    const minutes = String(reminder.date.getMinutes()).padStart(2, '0');
    reminderModalStore.time = `${hours}:${minutes}`;
    
    reminderModalStore.color = reminder.color;
    reminderModalStore.city = reminder.city || null;
    reminderModalStore.weather = reminder.weather || '';
    
    // Open the modal
    dateDetailsOffcanvasStore.offcanvasModelValue = false;
    reminderModalStore.id = reminder.id;
    reminderModalStore.modalModelValue = true;
  }
};

defineProps<{
  reminder: Reminder,
}>();
</script>

<template>
  <div class="flex flex-row items-center gap-4 px-4 py-2 border border-gray-300 rounded-lg">
    <div 
      class="w-4 h-4 rounded-full"
      :style="{
        backgroundColor: reminder.color
      }"
    ></div>
    <div class="flex flex-col flex-1 overflow-hidden">
      <div class="text-md font-medium text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
        {{ reminder.title }}
      </div>
      <div class="text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
        {{ reminder.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }} • {{ reminder.city ? `${reminder.city.flag} ${reminder.city.name}` : 'No city' }} • {{ reminder.weather || 'No weather' }}
      </div>
    </div>
    <IconButton icon="edit" @click="editReminder(reminder.id)" />
    <IconButton icon="delete" @click="deleteReminder(reminder.id)" />
  </div>
</template>