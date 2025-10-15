<script setup lang="ts">
defineProps<{
  icon: string,
  compact?: boolean
}>();
</script>

<template>
  <button :class="['p-2', 'rounded-full', 'hover:bg-gray-300', 'cursor-pointer', 'flex', 'items-center', 'justify-center', compact ? 'w-8 h-8' : 'w-10 h-10']">
    <slot>
      <span class="material-symbols-rounded">
        {{ icon }}
      </span>
    </slot>
  </button>
</template>