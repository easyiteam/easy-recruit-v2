<template>
  <div class="relative">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="relative flex gap-4 pb-8 last:pb-0"
    >
      <!-- Timeline line -->
      <div 
        v-if="index < items.length - 1"
        class="absolute left-1/2 top-8 w-0.5 h-full bg-neutral-200 dark:bg-neutral-700 transform -translate-x-1/2"
      ></div>
      
      <!-- Timeline dot -->
      <div class="relative z-10 flex-shrink-0">
        <div :class="dotClasses(item, index)">
          <component 
            v-if="item.icon" 
            :is="item.icon" 
            :size="dotIconSize" 
            class="text-white" 
          />
          <span 
            v-else-if="!item.avatar"
            :class="dotNumberClasses"
          >
            {{ index + 1 }}
          </span>
          <img
            v-else-if="item.avatar"
            :src="item.avatar"
            :alt="item.title"
            class="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      
      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div :class="cardClasses">
          <!-- Header -->
          <div class="flex items-start justify-between gap-4 mb-2">
            <div class="flex-1 min-w-0">
              <h3 :class="titleClasses">
                {{ item.title }}
              </h3>
              <p v-if="item.subtitle" :class="subtitleClasses">
                {{ item.subtitle }}
              </p>
            </div>
            
            <div class="flex items-center gap-2 flex-shrink-0">
              <span v-if="item.badge" :class="badgeClasses(item.badge)">
                {{ item.badge.text }}
              </span>
              <time :class="timeClasses">
                {{ formatTime(item.timestamp) }}
              </time>
            </div>
          </div>
          
          <!-- Description -->
          <div v-if="item.description" :class="descriptionClasses">
            {{ item.description }}
          </div>
          
          <!-- Content slot -->
          <div v-if="item.content" class="mt-3">
            <component :is="item.content" v-bind="item.contentProps" />
          </div>
          
          <!-- Actions -->
          <div v-if="item.actions && item.actions.length > 0" class="flex gap-2 mt-4">
            <button
              v-for="action in item.actions"
              :key="action.label"
              :class="actionButtonClasses(action)"
              @click="action.handler"
            >
              <component v-if="action.icon" :is="action.icon" :size="16" class="mr-1" />
              {{ action.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../lib/utils'

export interface TimelineBadge {
  text: string
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
}

export interface TimelineAction {
  label: string
  icon?: any
  variant?: 'default' | 'primary' | 'secondary'
  handler: () => void
}

export interface TimelineItem {
  title: string
  subtitle?: string
  description?: string
  timestamp: Date | string
  icon?: any
  avatar?: string
  badge?: TimelineBadge
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  content?: any
  contentProps?: Record<string, any>
  actions?: TimelineAction[]
}

interface Props {
  items: TimelineItem[]
  variant?: 'default' | 'compact'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md'
})

const dotIconSize = computed(() => {
  const sizes = {
    sm: 14,
    md: 16,
    lg: 20
  }
  return sizes[props.size]
})

const dotClasses = (item: TimelineItem) => {
  const baseClasses = [
    'flex items-center justify-center rounded-full border-2 transition-all duration-200'
  ]

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const variantClasses = {
    default: 'bg-neutral-500 border-neutral-500',
    primary: 'bg-primary-600 border-primary-600',
    success: 'bg-green-500 border-green-500',
    warning: 'bg-yellow-500 border-yellow-500',
    error: 'bg-red-500 border-red-500'
  }

  return cn(
    baseClasses,
    sizeClasses[props.size],
    variantClasses[item.variant || 'default']
  )
}

const dotNumberClasses = computed(() => {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return cn('font-medium text-white', sizeClasses[props.size])
})

const cardClasses = computed(() => {
  const baseClasses = [
    'bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700',
    'shadow-sm hover:shadow-md transition-shadow duration-200'
  ]

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }

  const variantClasses = props.variant === 'compact' ? [] : baseClasses

  return cn(variantClasses, sizeClasses[props.size])
})

const titleClasses = computed(() => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  return cn(
    'font-semibold text-neutral-900 dark:text-neutral-100',
    sizeClasses[props.size]
  )
})

const subtitleClasses = computed(() => {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return cn(
    'text-neutral-600 dark:text-neutral-400',
    sizeClasses[props.size]
  )
})

const descriptionClasses = computed(() => {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return cn(
    'text-neutral-700 dark:text-neutral-300 leading-relaxed',
    sizeClasses[props.size]
  )
})

const timeClasses = computed(() => {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return cn(
    'text-neutral-500 dark:text-neutral-400 font-medium',
    sizeClasses[props.size]
  )
})

const badgeClasses = (badge: TimelineBadge) => {
  const baseClasses = [
    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium'
  ]

  const variantClasses = {
    default: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200',
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }

  return cn(baseClasses, variantClasses[badge.variant || 'default'])
}

const actionButtonClasses = (action: TimelineAction) => {
  const baseClasses = [
    'inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md',
    'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  ]

  const variantClasses = {
    default: [
      'text-neutral-700 bg-neutral-100 hover:bg-neutral-200',
      'dark:text-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700',
      'focus:ring-neutral-500/20'
    ],
    primary: [
      'text-white bg-primary-600 hover:bg-primary-700',
      'focus:ring-primary-500/20'
    ],
    secondary: [
      'text-primary-700 bg-primary-100 hover:bg-primary-200',
      'dark:text-primary-300 dark:bg-primary-900 dark:hover:bg-primary-800',
      'focus:ring-primary-500/20'
    ]
  }

  return cn(baseClasses, variantClasses[action.variant || 'default'])
}

const formatTime = (timestamp: Date | string): string => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
  
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) {
    return 'Just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes}m ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours}h ago`
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days}d ago`
  } else {
    return date.toLocaleDateString()
  }
}
</script>
