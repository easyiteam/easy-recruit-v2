<template>
  <div class="relative inline-block">
    <!-- Trigger -->
    <div @click="toggle">
      <slot name="trigger" />
    </div>

    <!-- Popover Content -->
    <div
      v-if="isOpen"
      :class="popoverClasses"
    >
      <slot />
    </div>

    <!-- Backdrop -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40"
      @click="hide"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '../lib/utils'

export interface PopoverProps {
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<PopoverProps>(), {
  placement: 'bottom'
})

const isOpen = ref(false)

const popoverClasses = computed(() => {
  const baseClasses = [
    'absolute z-50 mt-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
    'rounded-lg shadow-lg p-4 min-w-64 max-w-sm',
    'opacity-0 scale-95 transition-all duration-200'
  ]

  if (isOpen.value) {
    baseClasses.push('opacity-100 scale-100')
  }

  const placementClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2 top-0',
    right: 'left-full ml-2 top-0'
  }

  return cn(baseClasses, placementClasses[props.placement])
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const hide = () => {
  isOpen.value = false
}
</script>
