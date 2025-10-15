<script setup lang="ts">
import { ref, computed } from 'vue';
import Modal from '../modal/Modal.vue';
import { useReminderModalStore } from '../../stores/reminderModal';
import { useRemindersStore } from '../../stores/reminders';
import Reminder from '@/model/Reminder';

const reminderModalStore = useReminderModalStore();
const remindersStore = useRemindersStore();

const errorMessage = ref<string>('');

const dateInput = computed({
  get: () => {
    if (!reminderModalStore.date) return '';
    // Ensure we get the local date without timezone offset issues
    const date = reminderModalStore.date;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  set: (value: string) => {
    if (value) {
      // Create date in local timezone to avoid timezone offset issues
      const [year, month, day] = value.split('-').map(Number);
      reminderModalStore.date = new Date(year, month - 1, day);
    } else {
      reminderModalStore.date = null;
    }
  }
});



const saveReminder = () => {
  try {
    errorMessage.value = '';

    const reminderData = {
      title: reminderModalStore.title,
      date: reminderModalStore.date,
      time: reminderModalStore.time,
      color: reminderModalStore.color,
      city: reminderModalStore.city,
      weather: reminderModalStore.weather
    };

    // Combine date and time into a single Date object
    const dateTime = new Date(reminderData.date!);
    const [hours, minutes] = reminderData.time.split(':').map(Number);
    dateTime.setHours(hours, minutes, 0, 0);

    if(reminderModalStore.id) {
      const updatedReminderData = { 
        ...reminderData, 
        id: reminderModalStore.id,
        date: dateTime // Use the combined datetime
      };
      remindersStore.updateReminder(new Reminder(updatedReminderData));
      reminderModalStore.id = null; // Clear ID after updating
      reminderModalStore.modalModelValue = false;
      return;
    }
    
    // Update the reminderData with combined datetime before adding
    const finalReminderData = { 
      ...reminderData, 
      date: dateTime 
    };
    remindersStore.addReminder(finalReminderData);
    reminderModalStore.modalModelValue = false;
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'An error occurred';
  }
};

const cancelReminder = () => {
  errorMessage.value = '';
  reminderModalStore.id = null; // Clear ID when canceling
  reminderModalStore.modalModelValue = false;
};
</script>

<template>
  <Modal v-model="reminderModalStore.modalModelValue">
    <template #title>
      <div class="text-lg font-semibold">Add Reminder</div>
    </template>
    <template #body>
      <div class="flex flex-col gap-4">
        <div v-if="errorMessage" class="p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {{ errorMessage }}
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            id="reminder-title-input"
            name="reminder-title-input"
            type="text"
            placeholder="Event Title"
            v-model="reminderModalStore.title"
            class="p-2 border border-gray-300 rounded-lg w-full"
            :maxlength="30"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date:</label>
          <input
            id="reminder-date-input"
            name="reminder-date-input"
            type="date" 
            v-model="dateInput"
            class="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Time:</label>
          <input
            id="reminder-time-input"
            name="reminder-time-input"
            type="time" 
            v-model="reminderModalStore.time"
            class="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>

        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">Color:</label>
          <input
            id="reminder-color-input"
            name="reminder-color-input"
            type="color" 
            v-model="reminderModalStore.color"
            class="w-12 h-8 border border-gray-300 rounded cursor-pointer"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">City (optional)</label>
          <input
            id="reminder-city-input"
            name="reminder-city-input"
            type="text"
            placeholder="Event City"
            v-model="reminderModalStore.city"
            class="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex flex-row justify-end gap-2">
        <button 
          @click="cancelReminder"
          class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
        <button 
          @click="saveReminder"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      </div>
    </template>
  </Modal>
</template>

<style scoped></style>