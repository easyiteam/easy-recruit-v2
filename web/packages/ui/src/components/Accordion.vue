<template>
  <div class="divide-y divide-neutral-200 dark:divide-neutral-700">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="border-b border-neutral-200 dark:border-neutral-700 last:border-b-0"
    >
      <button
        :class="headerClasses"
        @click="toggle(index)"
        :aria-expanded="isOpen(index)"
      >
        <span class="flex-1 text-left">{{ item.title }}</span>
        <svg
          :class="[
            'w-5 h-5 transition-transform duration-200',
            isOpen(index) ? 'rotate-180' : ''
          ]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div
        v-if="isOpen(index)"
        :class="contentClasses"
      >
        <div v-if="item.content" v-html="item.content" />
        <slot v-else :name="`content-${index}`" :item="item" :index="index" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '../lib/utils'

export interface AccordionItem {
  title: string
  content?: string
}

export interface AccordionProps {
  items: AccordionItem[]
  multiple?: boolean
  variant?: 'default' | 'bordered' | 'filled'
}

const props = withDefaults(defineProps<AccordionProps>(), {
  multiple: false,
  variant: 'default'
})

const openItems = ref<Set<number>>(new Set())

const headerClasses = computed(() => {
  const baseClasses = [
    'flex items-center justify-between w-full px-4 py-3',
    'text-left font-medium text-neutral-900 dark:text-neutral-100',
    'hover:bg-neutral-50 dark:hover:bg-neutral-800',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
    'transition-colors duration-200'
  ]

  const variantClasses = {
    default: [],
    bordered: ['border border-neutral-200 dark:border-neutral-700 rounded-lg mb-2'],
    filled: ['bg-neutral-50 dark:bg-neutral-800 rounded-lg mb-2']
  }

  return cn(baseClasses, variantClasses[props.variant])
})

const contentClasses = computed(() => {
  const baseClasses = [
    'px-4 pb-4 text-neutral-600 dark:text-neutral-400'
  ]

  const variantClasses = {
    default: [],
    bordered: ['border-l border-r border-b border-neutral-200 dark:border-neutral-700 rounded-b-lg -mt-2 mb-2'],
    filled: ['bg-neutral-25 dark:bg-neutral-850 rounded-b-lg -mt-2 mb-2']
  }

  return cn(baseClasses, variantClasses[props.variant])
})

const isOpen = (index: number): boolean => {
  return openItems.value.has(index)
}

const toggle = (index: number) => {
  if (props.multiple) {
    if (openItems.value.has(index)) {
      openItems.value.delete(index)
    } else {
      openItems.value.add(index)
    }
  } else {
    if (openItems.value.has(index)) {
      openItems.value.clear()
    } else {
      openItems.value.clear()
      openItems.value.add(index)
    }
  }
}
</script>
