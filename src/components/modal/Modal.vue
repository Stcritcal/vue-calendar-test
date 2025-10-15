<script setup lang="ts">
import { computed, ref } from 'vue';
import IconButton from '../iconButton/IconButton.vue';

const model = defineModel<boolean>();
const props = defineProps<{
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>();

const mouseDownOnBackdrop = ref(false);

const handleBackdropMouseDown = (event: MouseEvent) => {
  mouseDownOnBackdrop.value = event.target === event.currentTarget;
};

const handleBackdropClick = (event: MouseEvent) => {
  if (mouseDownOnBackdrop.value && event.target === event.currentTarget) {
    model.value = false;
  }
  mouseDownOnBackdrop.value = false; // Reset flag
};

const modalSizeClass = computed(() => {
  switch(props.size) {
    case 'sm':
      return 'w-[400px]';
    case 'md':
      return 'w-[600px]';
    case 'lg':
      return 'w-[800px]';
    case 'xl':
      return 'w-[1000px]';
    default:
      return 'w-[600px]';
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div 
        v-if="model" 
        class="modal-backdrop" 
        @mousedown="handleBackdropMouseDown"
        @click="handleBackdropClick"
      >
        <div :class="['modal', 'flex', 'flex-col', 'gap-8', 'bg-gray-100','rounded-3xl', 'p-8', modalSizeClass]" @click.stop>
          <div class="flex flex-row items-center">
            <div class="flex flex-row flex-1">
              <slot name="title"></slot>
            </div>
            <IconButton icon="close" @click="model = false"></IconButton>
          </div>
          <slot name="body"></slot>
          <slot name="footer"></slot>
        </div> 
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal transition classes */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-leave-active .modal {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-enter-from .modal {
  opacity: 0;
  transform: scale(0.8) translateY(-20px);
}

.modal-leave-to {
  opacity: 0;
}

.modal-leave-to .modal {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
</style>