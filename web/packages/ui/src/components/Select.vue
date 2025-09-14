<template>
  <div class="relative">
    <label 
      v-if="label" 
      :for="selectId"
      :class="[
        'block text-sm font-medium mb-2',
        error ? 'input-label-error' : 'text-neutral-700 dark:text-neutral-300'
      ]"
    >
      {{ label }}
      <span v-if="required" :class="['ml-1', error ? 'input-label-error' : 'input-required']">*</span>
    </label>
    
    <div class="relative">
      <select
        :id="selectId"
        :value="modelValue"
        :disabled="disabled"
        :class="selectClasses"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option 
          v-for="option in options" 
          :key="getOptionValue(option)"
          :value="getOptionValue(option)"
        >
          {{ getOptionLabel(option) }}
        </option>
      </select>
      
      <!-- Chevron Icon -->
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg class="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    
    <p 
      v-if="error || hint" 
      :class="[
        'mt-2 text-sm',
        error ? 'text-red-600' : 'text-neutral-500 dark:text-neutral-400'
      ]"
    >
      {{ error || hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '../lib/utils'

export interface SelectOption {
  label: string
  value: string | number
}

export interface SelectProps {
  modelValue?: string | number
  options: SelectOption[] | string[] | number[]
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled'
}

const props = withDefaults(defineProps<SelectProps>(), {
  size: 'md',
  variant: 'default'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const selectId = `select-${Math.random().toString(36).substr(2, 9)}`
const isFocused = ref(false)

const getOptionValue = (option: SelectOption | string | number): string | number => {
  if (typeof option === 'object') return option.value
  return option
}

const getOptionLabel = (option: SelectOption | string | number): string => {
  if (typeof option === 'object') return option.label
  return String(option)
}

const selectClasses = computed(() => {
  const baseClasses = [
    'w-full appearance-none rounded-lg border transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'pr-10' // Space for chevron icon
  ]

  const variantClasses = {
    default: [
      'bg-white border-neutral-300 text-neutral-900',
      'focus:border-primary-500 focus:ring-primary-500/20',
      'dark:bg-neutral-900 dark:border-neutral-600 dark:text-neutral-100',
      'dark:focus:border-primary-400'
    ],
    filled: [
      'bg-neutral-50 border-transparent text-neutral-900',
      'focus:bg-white focus:border-primary-500 focus:ring-primary-500/20',
      'dark:bg-neutral-800 dark:text-neutral-100',
      'dark:focus:bg-neutral-900 dark:focus:border-primary-400'
    ]
  }

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base'
  }

  const errorClasses = props.error ? [
    props.variant === 'filled' ? 'input-filled-error' : 'input-error'
  ] : []

  return cn(
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    errorClasses
  )
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value
  emit('update:modelValue', value)
  emit('change', event)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}
</script>
