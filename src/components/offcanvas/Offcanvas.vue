<script setup lang="ts">
import { computed } from 'vue';
import IconButton from '../iconButton/IconButton.vue';

const model = defineModel<boolean>();
const props = defineProps<{
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>();

const offcanvasPositionClass = computed(() => {
  switch(props.position) {
    case 'left':
      return 'left-0 top-0 h-full';
    case 'right':
      return 'right-0 top-0 h-full';
    case 'top':
      return 'top-0 left-0 w-full';
    case 'bottom':
      return 'bottom-0 left-0 w-full';
    default:
      return 'right-0 top-0 h-full';
  }
});

const offcanvasSizeClass = computed(() => {
  const isHorizontal = props.position === 'left' || props.position === 'right';
  
  if (isHorizontal) {
    switch(props.size) {
      case 'sm':
        return 'w-[300px]';
      case 'md':
        return 'w-[400px]';
      case 'lg':
        return 'w-[500px]';
      case 'xl':
        return 'w-[600px]';
      default:
        return 'w-[400px]';
    }
  } else {
    switch(props.size) {
      case 'sm':
        return 'h-[200px]';
      case 'md':
        return 'h-[300px]';
      case 'lg':
        return 'h-[400px]';
      case 'xl':
        return 'h-[500px]';
      default:
        return 'h-[300px]';
    }
  }
});

const offcanvasTransitionName = computed(() => {
  return `offcanvas-${props.position || 'right'}`;
});

</script>

<template>
  <Teleport to="body">
    <Transition :name="offcanvasTransitionName" appear>
      <div v-if="model" class="offcanvas-backdrop" @click="model = false">
        <div 
          :class="[
            'offcanvas', 
            'flex', 
            'flex-col', 
            'gap-8', 
            'bg-gray-100', 
            'p-8',
            'absolute',
            offcanvasPositionClass,
            offcanvasSizeClass
          ]"
          @click.stop
        >
          <div class="flex flex-row items-start">
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
.offcanvas-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

/* Right offcanvas transitions */
.offcanvas-right-enter-active,
.offcanvas-right-leave-active {
  transition: opacity 0.3s ease;
}

.offcanvas-right-enter-active .offcanvas {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.offcanvas-right-leave-active .offcanvas {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.offcanvas-right-enter-from {
  opacity: 0;
}

.offcanvas-right-enter-from .offcanvas {
  opacity: 0;
  transform: translateX(100%);
}

.offcanvas-right-leave-to {
  opacity: 0;
}

.offcanvas-right-leave-to .offcanvas {
  opacity: 0;
  transform: translateX(100%);
}

/* Left offcanvas transitions */
.offcanvas-left-enter-active,
.offcanvas-left-leave-active {
  transition: opacity 0.3s ease;
}

.offcanvas-left-enter-active .offcanvas {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.offcanvas-left-leave-active .offcanvas {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.offcanvas-left-enter-from {
  opacity: 0;
}

.offcanvas-left-enter-from .offcanvas {
  opacity: 0;
  transform: translateX(-100%);
}

.offcanvas-left-leave-to {
  opacity: 0;
}

.offcanvas-left-leave-to .offcanvas {
  opacity: 0;
  transform: translateX(-100%);
}

/* Top offcanvas transitions */
.offcanvas-top-enter-active,
.offcanvas-top-leave-active {
  transition: opacity 0.3s ease;
}

.offcanvas-top-enter-active .offcanvas {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.offcanvas-top-leave-active .offcanvas {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.offcanvas-top-enter-from {
  opacity: 0;
}

.offcanvas-top-enter-from .offcanvas {
  opacity: 0;
  transform: translateY(-100%);
}

.offcanvas-top-leave-to {
  opacity: 0;
}

.offcanvas-top-leave-to .offcanvas {
  opacity: 0;
  transform: translateY(-100%);
}

/* Bottom offcanvas transitions */
.offcanvas-bottom-enter-active,
.offcanvas-bottom-leave-active {
  transition: opacity 0.3s ease;
}

.offcanvas-bottom-enter-active .offcanvas {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.offcanvas-bottom-leave-active .offcanvas {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.offcanvas-bottom-enter-from {
  opacity: 0;
}

.offcanvas-bottom-enter-from .offcanvas {
  opacity: 0;
  transform: translateY(100%);
}

.offcanvas-bottom-leave-to {
  opacity: 0;
}

.offcanvas-bottom-leave-to .offcanvas {
  opacity: 0;
  transform: translateY(100%);
}
</style>