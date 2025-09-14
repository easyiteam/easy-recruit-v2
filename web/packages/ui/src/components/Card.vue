<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" :class="headerClasses">
      <slot name="header">
        <h3 v-if="title" class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {{ title }}
        </h3>
      </slot>
    </div>
    
    <div :class="contentClasses">
      <slot />
    </div>
    
    <div v-if="$slots.footer" :class="footerClasses">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../lib/utils'

interface Props {
  title?: string
  variant?: 'default' | 'outlined' | 'elevated' | 'filled'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
}

interface Slots {
  default?: any
  header?: any
  footer?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  rounded: 'lg',
  shadow: 'sm',
  hover: false
})

defineSlots<Slots>()

const cardClasses = computed(() => {
  const baseClasses = [
    'transition-all duration-200 ease-in-out',
    'overflow-hidden'
  ]

  const variantClasses = {
    default: [
      'bg-white dark:bg-neutral-800',
      'border border-neutral-200 dark:border-neutral-700'
    ],
    outlined: [
      'bg-transparent',
      'border-2 border-neutral-300 dark:border-neutral-600'
    ],
    elevated: [
      'bg-white dark:bg-neutral-800',
      'border-0'
    ],
    filled: [
      'bg-neutral-50 dark:bg-neutral-900',
      'border border-neutral-200 dark:border-neutral-700'
    ]
  }

  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl'
  }

  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  }

  const hoverClasses = props.hover ? [
    'hover:shadow-lg hover:-translate-y-1',
    'cursor-pointer'
  ] : []

  return cn(
    baseClasses,
    variantClasses[props.variant],
    roundedClasses[props.rounded],
    shadowClasses[props.shadow],
    hoverClasses
  )
})

const headerClasses = computed(() => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
    xl: 'px-8 py-6'
  }

  return cn(
    'border-b border-neutral-200 dark:border-neutral-700',
    paddingClasses[props.padding]
  )
})

const contentClasses = computed(() => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  }

  return cn(paddingClasses[props.padding])
})

const footerClasses = computed(() => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
    xl: 'px-8 py-6'
  }

  return cn(
    'border-t border-neutral-200 dark:border-neutral-700',
    'bg-neutral-50 dark:bg-neutral-900/50',
    paddingClasses[props.padding]
  )
})
</script>
