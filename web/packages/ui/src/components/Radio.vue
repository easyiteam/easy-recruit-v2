<template>
  <div class="space-y-3">
    <fieldset>
      <legend 
        v-if="label"
        :class="[
          'block text-sm font-medium mb-3',
          error ? 'text-red-600 dark:text-red-400' : 'text-neutral-700 dark:text-neutral-300'
        ]"
      >
        {{ label }}
        <span v-if="required" :class="['ml-1', error ? 'text-red-600' : 'input-required']">*</span>
      </legend>
      
      <div :class="['space-y-2', inline ? 'flex flex-wrap gap-4 space-y-0' : '']">
        <div 
          v-for="option in options" 
          :key="getOptionValue(option)"
          class="flex items-start gap-3"
        >
          <div class="relative flex items-center">
            <input
              :id="`${radioId}-${getOptionValue(option)}`"
              type="radio"
              :name="name || radioId"
              :value="getOptionValue(option)"
              :checked="modelValue === getOptionValue(option)"
              :disabled="disabled"
              :class="radioClasses"
              @change="handleChange"
            />
            <!-- Custom radio dot -->
            <div 
              v-if="modelValue === getOptionValue(option)" 
              class="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div class="flex-1 min-w-0">
            <label 
              :for="`${radioId}-${getOptionValue(option)}`"
              :class="[
                'block text-sm font-medium cursor-pointer',
                disabled ? 'text-neutral-400 cursor-not-allowed' : 'text-neutral-700 dark:text-neutral-300'
              ]"
            >
              {{ getOptionLabel(option) }}
            </label>
            
            <p 
              v-if="getOptionDescription(option)"
              :class="[
                'mt-1 text-sm',
                disabled ? 'text-neutral-400' : 'text-neutral-500 dark:text-neutral-400'
              ]"
            >
              {{ getOptionDescription(option) }}
            </p>
          </div>
        </div>
      </div>
    </fieldset>
    
    <p 
      v-if="error"
      class="text-sm text-red-600 dark:text-red-400"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../lib/utils'

export interface RadioOption {
  label: string
  value: string | number
  description?: string
}

export interface RadioProps {
  modelValue?: string | number
  options: RadioOption[] | string[] | number[]
  label?: string
  error?: string
  disabled?: boolean
  required?: boolean
  inline?: boolean
  name?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<RadioProps>(), {
  size: 'md',
  inline: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [event: Event]
}>()

const radioId = `radio-${Math.random().toString(36).substr(2, 9)}`

const getOptionValue = (option: RadioOption | string | number): string | number => {
  if (typeof option === 'object') return option.value
  return option
}

const getOptionLabel = (option: RadioOption | string | number): string => {
  if (typeof option === 'object') return option.label
  return String(option)
}

const getOptionDescription = (option: RadioOption | string | number): string | undefined => {
  if (typeof option === 'object') return option.description
  return undefined
}

const radioClasses = computed(() => {
  const baseClasses = [
    'rounded-full border-2 transition-all duration-200 cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500/20',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ]

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const stateClasses = [
    'bg-white border-neutral-300',
    'checked:radio-checked',
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
  const value = target.value
  emit('update:modelValue', value)
  emit('change', event)
}
</script>
