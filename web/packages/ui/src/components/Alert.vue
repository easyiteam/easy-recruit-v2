<template>
  <div v-if="!dismissed" :class="alertClasses" role="alert">
    <div class="flex items-start gap-3">
      <!-- Icon -->
      <div v-if="showIcon" class="flex-shrink-0 mt-0.5">
        <component :is="iconComponent" :class="iconClasses" />
      </div>
      
      <!-- Content -->
      <div class="flex-1 min-w-0">
        <h4 v-if="title" :class="titleClasses">{{ title }}</h4>
        <div :class="contentClasses">
          <slot>{{ message }}</slot>
        </div>
        
        <!-- Actions -->
        <div v-if="$slots.actions" class="mt-3 flex gap-2">
          <slot name="actions" />
        </div>
      </div>
      
      <!-- Close Button -->
      <button
        v-if="dismissible"
        type="button"
        :class="closeButtonClasses"
        @click="dismiss"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '../lib/utils'

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  message?: string
  dismissible?: boolean
  showIcon?: boolean
}

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'info',
  dismissible: false,
  showIcon: true
})

const emit = defineEmits<{
  dismiss: []
}>()

const dismissed = ref(false)

const alertClasses = computed(() => {
  const baseClasses = [
    'rounded-lg border p-4 transition-all duration-200'
  ]

  const variantClasses = {
    info: [
      'bg-blue-50 border-blue-200 text-blue-800',
      'dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300'
    ],
    success: [
      'bg-green-50 border-green-200 text-green-800',
      'dark:bg-green-900/20 dark:border-green-800 dark:text-green-300'
    ],
    warning: [
      'bg-yellow-50 border-yellow-200 text-yellow-800',
      'dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300'
    ],
    error: [
      'bg-red-50 border-red-200 text-red-800',
      'dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
    ]
  }

  return cn(baseClasses, variantClasses[props.variant])
})

const iconClasses = computed(() => {
  const baseClasses = 'w-5 h-5'
  
  const variantClasses = {
    info: 'text-blue-500 dark:text-blue-400',
    success: 'text-green-500 dark:text-green-400',
    warning: 'text-yellow-500 dark:text-yellow-400',
    error: 'text-red-500 dark:text-red-400'
  }

  return cn(baseClasses, variantClasses[props.variant])
})

const titleClasses = computed(() => [
  'font-medium text-sm mb-1'
])

const contentClasses = computed(() => [
  'text-sm'
])

const closeButtonClasses = computed(() => {
  const baseClasses = [
    'flex-shrink-0 p-1 rounded-md transition-colors duration-200',
    'hover:bg-black/5 dark:hover:bg-white/5',
    'focus:outline-none focus:ring-2 focus:ring-offset-2'
  ]

  const variantClasses = {
    info: 'text-blue-500 focus:ring-blue-500/20',
    success: 'text-green-500 focus:ring-green-500/20',
    warning: 'text-yellow-500 focus:ring-yellow-500/20',
    error: 'text-red-500 focus:ring-red-500/20'
  }

  return cn(baseClasses, variantClasses[props.variant])
})

const iconComponent = computed(() => {
  const icons = {
    info: 'svg',
    success: 'svg',
    warning: 'svg',
    error: 'svg'
  }
  return icons[props.variant]
})

const dismiss = () => {
  dismissed.value = true
  emit('dismiss')
}
</script>
