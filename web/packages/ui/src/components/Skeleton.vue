<template>
  <div :class="skeletonClasses" :style="skeletonStyle" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../lib/utils'

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animated?: boolean
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  variant: 'text',
  animated: true
})

const skeletonClasses = computed(() => {
  const baseClasses = [
    'bg-neutral-200 dark:bg-neutral-700',
    props.animated ? 'animate-pulse' : ''
  ]

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg'
  }

  const widthClass = props.width ? '' : {
    text: 'w-full',
    circular: 'w-10 h-10',
    rectangular: 'w-full h-20',
    rounded: 'w-full h-20'
  }[props.variant]

  return cn(baseClasses, variantClasses[props.variant], widthClass)
})

const skeletonStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  
  return style
})
</script>
