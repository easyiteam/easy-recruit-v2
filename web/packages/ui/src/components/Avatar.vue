<template>
  <div :class="avatarClasses" :style="customStyle">
    <img 
      v-if="src && !imageError" 
      :src="src" 
      :alt="alt || name || 'Avatar'"
      class="w-full h-full object-cover"
      @error="handleImageError"
    />
    
    <span 
      v-else-if="name && !src" 
      :class="initialsClasses"
    >
      {{ initials }}
    </span>
    
    <svg 
      v-else 
      class="w-full h-full text-neutral-400 dark:text-neutral-500" 
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
    
    <div v-if="status" :class="statusClasses" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '../lib/utils'

interface Props {
  src?: string
  name?: string
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  variant?: 'circular' | 'rounded' | 'square'
  status?: 'online' | 'offline' | 'away' | 'busy'
  fallbackColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'circular'
})

const imageError = ref(false)

const avatarClasses = computed(() => {
  const baseClasses = [
    'relative inline-flex items-center justify-center',
    'bg-neutral-100 dark:bg-neutral-700',
    'overflow-hidden',
    'transition-all duration-200 ease-in-out'
  ]

  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20'
  }

  const variantClasses = {
    circular: 'rounded-full',
    rounded: 'rounded-lg',
    square: 'rounded-none'
  }

  return cn(
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant]
  )
})

const initialsClasses = computed(() => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
    '2xl': 'text-xl'
  }

  return cn(
    'font-medium text-neutral-600 dark:text-neutral-300 uppercase',
    sizeClasses[props.size]
  )
})

const statusClasses = computed(() => {
  const baseStatusClasses = [
    'absolute -bottom-0 -right-0',
    'border-2 border-white dark:border-neutral-800',
    'rounded-full'
  ]

  const sizeClasses = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4',
    '2xl': 'w-5 h-5'
  }

  const statusColorClasses = {
    online: 'avatar-status-online',
    offline: 'avatar-status-offline',
    away: 'avatar-status-away',
    busy: 'avatar-status-busy'
  }

  return cn(
    baseStatusClasses,
    sizeClasses[props.size],
    statusColorClasses[props.status!]
  )
})

const initials = computed(() => {
  if (!props.name) return ''
  
  const names = props.name.trim().split(' ')
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase()
  }
  
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
})

const customStyle = computed(() => {
  if (!props.fallbackColor || props.src || imageError.value) return {}
  
  return {
    backgroundColor: props.fallbackColor
  }
})

const handleImageError = () => {
  imageError.value = true
}
</script>
