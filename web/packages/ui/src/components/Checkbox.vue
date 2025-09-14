<template>
  <div class="flex items-start gap-3">
    <div class="relative flex items-center">
      <input
        :id="checkboxId"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :class="checkboxClasses"
        @change="handleChange"
      />
      <!-- Custom checkmark -->
      <div v-if="modelValue" class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    
    <div class="flex-1 min-w-0">
      <label 
        v-if="label"
        :for="checkboxId"
        :class="[
          'block text-sm font-medium cursor-pointer',
          disabled ? 'text-neutral-400 cursor-not-allowed' : 'text-neutral-700 dark:text-neutral-300',
          error ? 'text-red-600 dark:text-red-400' : ''
        ]"
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

export interface CheckboxProps {
  modelValue?: boolean
  label?: string
  description?: string
  error?: string
  disabled?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [event: Event]
}>()

const checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`

const checkboxClasses = computed(() => {
  const baseClasses = [
    'rounded border-2 transition-all duration-200 cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500/20',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ]

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const stateClasses = props.modelValue ? [
    'checkbox-checked'
  ] : [
    'bg-white border-neutral-300',
    'hover:border-primary-400',
    'dark:bg-neutral-900 dark:border-neutral-600',
    'dark:hover:border-primary-500'
  ]

  const errorClasses = props.error ? [
    'border-red-500 focus:ring-red-500/20'
  ] : []

  return cn(
    baseClasses,
    sizeClasses[props.size],
    stateClasses,
    errorClasses
  )
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', event)
}
</script>
