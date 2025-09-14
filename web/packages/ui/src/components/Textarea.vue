<template>
  <div class="relative">
    <label 
      v-if="label" 
      :for="textareaId"
      :class="[
        'block text-sm font-medium mb-2',
        error ? 'input-label-error' : 'text-neutral-700 dark:text-neutral-300'
      ]"
    >
      {{ label }}
      <span v-if="required" :class="['ml-1', error ? 'input-label-error' : 'input-required']">*</span>
    </label>
    
    <div class="relative">
      <textarea
        :id="textareaId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :maxlength="maxLength"
        :class="textareaClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      
      <div v-if="maxLength" class="absolute bottom-2 right-2 text-xs text-neutral-400">
        {{ (modelValue?.length || 0) }}/{{ maxLength }}
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

export interface TextareaProps {
  modelValue?: string
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  rows?: number
  maxLength?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  variant?: 'default' | 'filled'
}

const props = withDefaults(defineProps<TextareaProps>(), {
  rows: 4,
  resize: 'vertical',
  variant: 'default'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const textareaId = `textarea-${Math.random().toString(36).substr(2, 9)}`
const isFocused = ref(false)

const textareaClasses = computed(() => {
  const baseClasses = [
    'w-full rounded-lg border transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'placeholder:text-neutral-400 dark:placeholder:text-neutral-500'
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

  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize'
  }

  const paddingClasses = props.maxLength ? 'p-3 pb-8' : 'p-3'

  const errorClasses = props.error ? [
    props.variant === 'filled' ? 'input-filled-error' : 'input-error'
  ] : []

  return cn(
    baseClasses,
    variantClasses[props.variant],
    resizeClasses[props.resize],
    paddingClasses,
    errorClasses
  )
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  emit('input', event)
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
