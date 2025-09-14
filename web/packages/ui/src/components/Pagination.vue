<template>
  <nav class="flex items-center justify-between" aria-label="Pagination">
    <!-- Mobile View -->
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        :disabled="currentPage <= 1"
        :class="mobileButtonClasses(currentPage <= 1)"
        @click="goToPage(currentPage - 1)"
      >
        Previous
      </button>
      <button
        :disabled="currentPage >= totalPages"
        :class="mobileButtonClasses(currentPage >= totalPages)"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>
    </div>

    <!-- Desktop View -->
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-neutral-700 dark:text-neutral-300">
          Showing
          <span class="font-medium">{{ startItem }}</span>
          to
          <span class="font-medium">{{ endItem }}</span>
          of
          <span class="font-medium">{{ total }}</span>
          results
        </p>
      </div>
      
      <div class="flex items-center space-x-1">
        <!-- Previous Button -->
        <button
          :disabled="currentPage <= 1"
          :class="navigationButtonClasses(currentPage <= 1)"
          @click="goToPage(currentPage - 1)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Page Numbers -->
        <template v-for="page in visiblePages" :key="page">
          <button
            v-if="typeof page === 'number'"
            :class="pageButtonClasses(page === currentPage)"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <span v-else class="px-2 py-1 text-neutral-500">{{ page }}</span>
        </template>

        <!-- Next Button -->
        <button
          :disabled="currentPage >= totalPages"
          :class="navigationButtonClasses(currentPage >= totalPages)"
          @click="goToPage(currentPage + 1)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../lib/utils'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  total: number
  perPage?: number
  showFirstLast?: boolean
  maxVisiblePages?: number
}

const props = withDefaults(defineProps<PaginationProps>(), {
  perPage: 10,
  showFirstLast: true,
  maxVisiblePages: 7
})

const emit = defineEmits<{
  'page-change': [page: number]
}>()

const startItem = computed(() => {
  return (props.currentPage - 1) * props.perPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.perPage, props.total)
})

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const { currentPage, totalPages, maxVisiblePages } = props
  
  if (totalPages <= maxVisiblePages) {
    // Show all pages if total is less than max visible
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)
    
    const startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3)
    
    // Add ellipsis if there's a gap after first page
    if (startPage > 2) {
      pages.push('...')
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    
    // Add ellipsis if there's a gap before last page
    if (endPage < totalPages - 1) {
      pages.push('...')
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages)
    }
  }
  
  return pages
})

const mobileButtonClasses = (disabled: boolean) => {
  const baseClasses = [
    'relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/20'
  ]

  const stateClasses = disabled ? [
    'text-neutral-400 cursor-not-allowed',
    'dark:text-neutral-500'
  ] : [
    'text-neutral-700 bg-white border border-neutral-300',
    'hover:bg-neutral-50',
    'dark:text-neutral-300 dark:bg-neutral-800 dark:border-neutral-600',
    'dark:hover:bg-neutral-700'
  ]

  return cn(baseClasses, stateClasses)
}

const navigationButtonClasses = (disabled: boolean) => {
  const baseClasses = [
    'relative inline-flex items-center p-2 text-sm font-medium rounded-md',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/20'
  ]

  const stateClasses = disabled ? [
    'text-neutral-400 cursor-not-allowed',
    'dark:text-neutral-500'
  ] : [
    'text-neutral-500 hover:text-neutral-700',
    'dark:text-neutral-400 dark:hover:text-neutral-300'
  ]

  return cn(baseClasses, stateClasses)
}

const pageButtonClasses = (isActive: boolean) => {
  const baseClasses = [
    'relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-md',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/20'
  ]

  const stateClasses = isActive ? [
    'pagination-active'
  ] : [
    'text-neutral-700 hover:bg-neutral-50',
    'dark:text-neutral-300 dark:hover:bg-neutral-800'
  ]

  return cn(baseClasses, stateClasses)
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>
