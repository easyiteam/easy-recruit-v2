<template>
  <div class="overflow-hidden">
    <div v-if="title || $slots.header" class="mb-4">
      <div class="flex items-center justify-between">
        <h3 v-if="title" class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {{ title }}
        </h3>
        <slot name="header" />
      </div>
    </div>

    <div :class="wrapperClasses">
      <table :class="tableClasses">
        <!-- Header -->
        <thead :class="headerClasses">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="getHeaderCellClasses(column)"
              @click="handleSort(column)"
            >
              <div class="flex items-center gap-2">
                <span>{{ column.label }}</span>
                <div v-if="column.sortable" class="flex flex-col">
                  <svg
                    :class="[
                      'w-3 h-3 transition-colors',
                      sortBy === column.key && sortOrder === 'asc' 
                        ? 'text-primary-600' 
                        : 'text-neutral-400'
                    ]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody :class="bodyClasses">
          <tr
            v-for="(row, index) in sortedData"
            :key="getRowKey(row, index)"
            :class="getRowClasses(row, index)"
            @click="() => emit('row-click', row, index)"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              :class="getCellClasses(column)"
            >
              <slot
                :name="`cell-${column.key}`"
                :row="row"
                :column="column"
                :value="getColumnValue(row, column.key)"
                :index="index"
              >
                {{ formatCellValue(getColumnValue(row, column.key), column) }}
              </slot>
            </td>
          </tr>
          
          <!-- Empty State -->
          <tr v-if="sortedData.length === 0">
            <td :colspan="columns.length" class="px-6 py-12 text-center text-neutral-500 dark:text-neutral-400">
              <slot name="empty">
                <div class="flex flex-col items-center gap-2">
                  <svg class="w-8 h-8 text-neutral-300 dark:text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414A1 1 0 0016 7.414V9" />
                  </svg>
                  <p>No data available</p>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '../lib/utils'

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  width?: string
  formatter?: (value: any) => string
}

export interface TableProps {
  columns: TableColumn[]
  data: Record<string, any>[]
  title?: string
  variant?: 'default' | 'striped' | 'bordered'
  size?: 'sm' | 'md' | 'lg'
  hoverable?: boolean
  clickableRows?: boolean
  rowKey?: string
}

const props = withDefaults(defineProps<TableProps>(), {
  variant: 'default',
  size: 'md',
  hoverable: true,
  clickableRows: false,
  rowKey: 'id'
})

const emit = defineEmits<{
  'row-click': [row: Record<string, any>, index: number]
  'sort-change': [column: string, order: 'asc' | 'desc']
}>()

const sortBy = ref<string>('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const wrapperClasses = computed(() => {
  const baseClasses = ['overflow-x-auto']
  
  const variantClasses = {
    default: [],
    striped: [],
    bordered: ['border border-neutral-200 dark:border-neutral-700 rounded-lg']
  }

  return cn(baseClasses, variantClasses[props.variant])
})

const tableClasses = computed(() => {
  const baseClasses = ['min-w-full divide-y divide-neutral-200 dark:divide-neutral-700']
  
  return cn(baseClasses)
})

const headerClasses = computed(() => {
  const baseClasses = ['bg-neutral-50 dark:bg-neutral-800']
  
  return cn(baseClasses)
})

const bodyClasses = computed(() => {
  const baseClasses = ['bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700']
  
  const variantClasses = {
    default: [],
    striped: ['[&>tr:nth-child(even)]:bg-neutral-50 dark:[&>tr:nth-child(even)]:bg-neutral-800/50'],
    bordered: []
  }

  return cn(baseClasses, variantClasses[props.variant])
})

const getHeaderCellClasses = (column: TableColumn) => {
  const baseClasses = [
    'px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider'
  ]

  const sizeClasses = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  const sortableClasses = column.sortable ? [
    'cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 select-none'
  ] : []

  return cn(
    baseClasses,
    sizeClasses[props.size],
    alignClasses[column.align || 'left'],
    sortableClasses
  )
}

const getRowClasses = (_row: Record<string, any>, _index: number) => {
  const baseClasses = ['transition-colors duration-200']
  
  const hoverClasses = props.hoverable ? [
    'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
  ] : []

  const clickableClasses = props.clickableRows ? [
    'cursor-pointer'
  ] : []

  return cn(baseClasses, hoverClasses, clickableClasses)
}

const getCellClasses = (column: TableColumn) => {
  const baseClasses = ['px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100']

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-4 text-sm',
    lg: 'px-8 py-6 text-base'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  return cn(
    baseClasses,
    sizeClasses[props.size],
    alignClasses[column.align || 'left']
  )
}

const sortedData = computed(() => {
  if (!sortBy.value) return props.data

  return [...props.data].sort((a, b) => {
    const aValue = getColumnValue(a, sortBy.value)
    const bValue = getColumnValue(b, sortBy.value)

    if (aValue === bValue) return 0

    const comparison = aValue < bValue ? -1 : 1
    return sortOrder.value === 'asc' ? comparison : -comparison
  })
})

const getRowKey = (row: Record<string, any>, index: number) => {
  return row[props.rowKey] || index
}

const getColumnValue = (row: Record<string, any>, key: string) => {
  return key.split('.').reduce((obj, k) => obj?.[k], row)
}

const formatCellValue = (value: any, column: TableColumn) => {
  if (column.formatter) {
    return column.formatter(value)
  }
  
  if (value === null || value === undefined) {
    return '-'
  }
  
  return String(value)
}

const handleSort = (column: TableColumn) => {
  if (!column.sortable) return

  if (sortBy.value === column.key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column.key
    sortOrder.value = 'asc'
  }

  emit('sort-change', column.key, sortOrder.value)
}

</script>
