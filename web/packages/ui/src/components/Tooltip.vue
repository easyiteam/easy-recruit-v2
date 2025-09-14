<template>
  <div class="relative inline-block" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <slot />
    <div
      v-if="visible"
      :class="tooltipClasses"
      role="tooltip"
    >
      {{ content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '../lib/utils'

export interface TooltipProps {
  content: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  disabled?: boolean
}

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'top',
  disabled: false
})

const visible = ref(false)

const tooltipClasses = computed(() => {
  const baseClasses = [
    'absolute z-50 px-2 py-1 text-xs text-white bg-neutral-900 rounded shadow-lg pointer-events-none',
    'dark:bg-neutral-700',
    'whitespace-nowrap',
    'opacity-0 transition-opacity duration-200'
  ]

  if (visible.value) {
    baseClasses.push('opacity-100')
  }

  const placementClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-1',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-1',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-1',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-1'
  }

  return cn(baseClasses, placementClasses[props.placement])
})

const showTooltip = () => {
  if (!props.disabled) {
    visible.value = true
  }
}

const hideTooltip = () => {
  visible.value = false
}
</script>
