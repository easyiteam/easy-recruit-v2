<template>
  <div class="relative">
    <label 
      v-if="label" 
      :for="inputId"
      :class="[
        'block text-sm font-medium mb-2',
        error ? 'input-label-error' : 'text-neutral-700 dark:text-neutral-300'
      ]"
    >
      {{ label }}
      <span v-if="required" :class="['ml-1', error ? 'input-label-error' : 'input-required']">*</span>
    </label>
    
    <div class="relative">
      <span v-if="$slots.prefix" class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
        <slot name="prefix" />
      </span>
      
      <input
        :id="inputId"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :class="inputClasses"
        :value="modelValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        v-bind="$attrs"
      />
      
      <span v-if="$slots.suffix" class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
        <slot name="suffix" />
      </span>
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
import { computed, ref, useSlots } from 'vue'
import { cn } from '../lib/utils'

interface Props {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'underlined'
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  variant: 'default'
})

const emit = defineEmits<Emits>()
const slots = useSlots()

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)
const isFocused = ref(false)

const inputClasses = computed(() => {
  const baseClasses = [
    'w-full',
    'font-medium',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'placeholder:text-neutral-400 dark:placeholder:text-neutral-500'
  ]

  const variantClasses = {
    default: [
      'border border-neutral-300 dark:border-neutral-600',
      'bg-white dark:bg-neutral-800',
      'text-neutral-900 dark:text-neutral-100',
      'rounded-md',
      'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
      props.error ? 'input-error' : ''
    ],
    filled: [
      'border-0',
      'bg-neutral-100 dark:bg-neutral-700',
      'text-neutral-900 dark:text-neutral-100',
      'rounded-md',
      'focus:bg-white dark:focus:bg-neutral-600',
      'focus:ring-2 focus:ring-primary-500/20',
      props.error ? 'input-filled-error' : ''
    ],
    underlined: [
      'border-0 border-b-2 border-neutral-300 dark:border-neutral-600',
      'bg-transparent',
      'text-neutral-900 dark:text-neutral-100',
      'rounded-none',
      'focus:border-primary-500',
      props.error ? 'input-error' : ''
    ]
  }

  const hasSlots = slots.prefix || slots.suffix
  const sizeClasses = {
    sm: hasSlots ? 'h-8 px-8 text-sm' : 'h-8 px-3 text-sm',
    md: hasSlots ? 'h-10 px-10 text-sm' : 'h-10 px-3 text-sm',
    lg: hasSlots ? 'h-12 px-12 text-base' : 'h-12 px-4 text-base'
  }

  return cn(
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size]
  )
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
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
