<template>
  <nav :class="breadcrumbClasses" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center"
      >
        <!-- Separator -->
        <svg
          v-if="index > 0"
          class="w-4 h-4 text-neutral-400 mx-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        
        <!-- Breadcrumb Item -->
        <component
          :is="getItemComponent(item, index)"
          :to="item.to"
          :href="item.href"
          :class="getItemClasses(item, index)"
          @click="handleClick(item, index, $event)"
        >
          <component v-if="item.icon" :is="item.icon" class="w-4 h-4 mr-1" />
          {{ item.label }}
        </component>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../lib/utils'

export interface BreadcrumbItem {
  label: string
  to?: string | object
  href?: string
  icon?: any
  disabled?: boolean
  onClick?: (item: BreadcrumbItem, index: number) => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  size: 'md'
})

const emit = defineEmits<{
  'item-click': [item: BreadcrumbItem, index: number]
}>()

const breadcrumbClasses = computed(() => {
  const baseClasses = ['flex items-center']
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base'
  }

  return cn(baseClasses, sizeClasses[props.size])
})

const getItemComponent = (item: BreadcrumbItem, index: number) => {
  const isLast = index === props.items.length - 1
  
  if (isLast || item.disabled) return 'span'
  if (item.to) return 'router-link'
  if (item.href) return 'a'
  return 'button'
}

const getItemClasses = (item: BreadcrumbItem, index: number) => {
  const isLast = index === props.items.length - 1
  
  const baseClasses = [
    'flex items-center transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/20 rounded'
  ]

  if (isLast) {
    return cn(baseClasses, [
      'text-neutral-900 dark:text-neutral-100 font-medium cursor-default'
    ])
  }

  if (item.disabled) {
    return cn(baseClasses, [
      'text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
    ])
  }

  return cn(baseClasses, [
    'text-neutral-500 dark:text-neutral-400',
    'hover:text-neutral-700 dark:hover:text-neutral-300',
    'cursor-pointer'
  ])
}

const handleClick = (item: BreadcrumbItem, index: number, event: Event) => {
  const isLast = index === props.items.length - 1
  
  if (isLast || item.disabled) {
    event.preventDefault()
    return
  }

  if (item.onClick) {
    item.onClick(item, index)
  }
  
  emit('item-click', item, index)
}
</script>
