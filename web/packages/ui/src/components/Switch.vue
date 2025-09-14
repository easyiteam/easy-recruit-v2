<template>
  <div class="flex items-start gap-3">
    <button
      type="button"
      :disabled="disabled"
      :class="switchClasses"
      @click="toggle"
      @keydown.space.prevent="toggle"
      @keydown.enter.prevent="toggle"
    >
      <span :class="thumbClasses" />
    </button>
    
    <div v-if="label || description" class="flex-1 min-w-0">
      <label 
        v-if="label"
        :class="[
          'block text-sm font-medium cursor-pointer',
          disabled ? 'text-neutral-400 cursor-not-allowed' : 'text-neutral-700 dark:text-neutral-300',
          error ? 'text-red-600 dark:text-red-400' : ''
        ]"
        @click="!disabled && toggle()"
      >
        {{ label }}
        <span v-if="required" :class="['ml-1', error ? 'text-red-600' : 'input-required']">*</span>
      </label>
      
      <p 
        v-if="description"
        :class="[
          'mt-1 text-sm',
          disabled ? 'text-neutral-400' : 'text-neutral-500 dark:text-neutral-400'
        ]"
      >
        {{ description }}
      </p>
      
      <p 
        v-if="error"
        class="mt-1 text-sm text-red-600 dark:text-red-400"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../lib/utils'

export interface SwitchProps {
  modelValue?: boolean
  label?: string
  description?: string
  error?: string
  disabled?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const switchClasses = computed(() => {
  const baseClasses = [
    'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent',
    'transition-colors duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500/20',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ]

  const sizeClasses = {
    sm: 'h-5 w-9',
    md: 'h-6 w-11',
    lg: 'h-7 w-12'
  }

  const stateClasses = props.modelValue ? [
    'switch-active'
  ] : [
    'switch-inactive'
  ]

  const errorClasses = props.error ? [
    'focus:ring-red-500/20'
  ] : []

  return cn(
    baseClasses,
    sizeClasses[props.size],
    stateClasses,
    errorClasses
  )
})

const thumbClasses = computed(() => {
  const baseClasses = [
    'pointer-events-none inline-block rounded-full bg-white shadow transform ring-0',
    'transition duration-200 ease-in-out'
  ]

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }

  const positionClasses = {
    sm: props.modelValue ? 'translate-x-4' : 'translate-x-0',
    md: props.modelValue ? 'translate-x-5' : 'translate-x-0',
    lg: props.modelValue ? 'translate-x-5' : 'translate-x-0'
  }

  return cn(
    baseClasses,
    sizeClasses[props.size],
    positionClasses[props.size]
  )
})

const toggle = () => {
  if (props.disabled) return
  
  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>
