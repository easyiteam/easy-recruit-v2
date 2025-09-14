<template>
  <div class="w-full">
    <div v-if="label || showValue" class="flex justify-between items-center mb-2">
      <span v-if="label" class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {{ label }}
      </span>
      <span v-if="showValue" class="text-sm text-neutral-500 dark:text-neutral-400">
        {{ displayValue }}
      </span>
    </div>
    
    <div :class="trackClasses">
      <div
        :class="fillClasses"
        :style="{ width: `${percentage}%` }"
        role="progressbar"
        :aria-valuenow="value"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-label="label || 'Progress'"
      >
        <div v-if="animated" :class="animationClasses" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../lib/utils'

export interface ProgressProps {
  value: number
  max?: number
  min?: number
  label?: string
  showValue?: boolean
  animated?: boolean
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<ProgressProps>(), {
  max: 100,
  min: 0,
  showValue: false,
  animated: false,
  variant: 'default',
  size: 'md'
})

const percentage = computed(() => {
  const range = props.max - props.min
  const normalizedValue = Math.max(props.min, Math.min(props.max, props.value))
  return ((normalizedValue - props.min) / range) * 100
})

const displayValue = computed(() => {
  if (props.max === 100 && props.min === 0) {
    return `${Math.round(percentage.value)}%`
  }
  return `${props.value}/${props.max}`
})

const trackClasses = computed(() => {
  const baseClasses = [
    'w-full bg-neutral-200 rounded-full overflow-hidden',
    'dark:bg-neutral-700'
  ]

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }

  return cn(baseClasses, sizeClasses[props.size])
})

const fillClasses = computed(() => {
  const baseClasses = [
    'h-full transition-all duration-500 ease-out rounded-full relative'
  ]

  const variantClasses = {
    default: 'progress-primary',
    success: 'progress-success',
    warning: 'progress-warning',
    error: 'progress-error'
  }

  return cn(baseClasses, variantClasses[props.variant])
})

const animationClasses = computed(() => [
  'absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent',
  'animate-pulse'
])
</script>
