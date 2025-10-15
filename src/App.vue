<script setup lang="ts">
import Calendar from './components/calendar/Calendar.vue';
import DateDetailsOffcanvas from './components/dateDetailsOffcanvas/DateDetailsOffcanvas.vue';
import ReminderModal from './components/reminderModal/ReminderModal.vue';
</script>

<template>
  <div class="flex flex-col items-center w-full mt-12">
    <DateDetailsOffcanvas />
    <ReminderModal />
    <Calendar/>
  </div>
</template>

<style scoped></style>
