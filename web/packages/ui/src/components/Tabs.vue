<template>
  <div class="w-full">
    <!-- Tab Headers -->
    <div :class="tabListClasses" role="tablist">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.value || index"
        :class="getTabClasses(index)"
        :aria-selected="activeTab === index"
        :aria-controls="`tabpanel-${index}`"
        role="tab"
        @click="setActiveTab(index)"
      >
        <component v-if="tab.icon" :is="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
        <span v-if="tab.badge" :class="badgeClasses">{{ tab.badge }}</span>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="mt-4">
      <div
        v-for="(tab, index) in tabs"
        :key="`panel-${tab.value || index}`"
        v-show="activeTab === index"
        :id="`tabpanel-${index}`"
        role="tabpanel"
        :aria-labelledby="`tab-${index}`"
      >
        <div v-if="tab.content" v-html="tab.content" />
        <slot v-else :name="`tab-${index}`" :tab="tab" :index="index" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { cn } from '../lib/utils'

export interface Tab {
  label: string
  value?: string | number
  content?: string
  icon?: any
  badge?: string | number
  disabled?: boolean
}

export interface TabsProps {
  tabs: Tab[]
  modelValue?: number
  variant?: 'default' | 'pills' | 'underline'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: 0,
  variant: 'default',
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'tab-change': [index: number, tab: Tab]
}>()

const activeTab = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  activeTab.value = newValue
})

const tabListClasses = computed(() => {
  const baseClasses = 'flex'
  
  const variantClasses = {
    default: 'border-b border-neutral-200 dark:border-neutral-700',
    pills: 'bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg',
    underline: 'space-x-8'
  }

  return cn(baseClasses, variantClasses[props.variant])
})

const getTabClasses = (index: number) => {
  const tab = props.tabs[index]
  const isActive = activeTab.value === index
  
  const baseClasses = [
    'flex items-center gap-2 font-medium transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ]

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const variantClasses = {
    default: isActive ? [
      'border-b-2 border-primary-600 text-primary-600',
      'dark:border-primary-400 dark:text-primary-400'
    ] : [
      'border-b-2 border-transparent text-neutral-500 hover:text-neutral-700',
      'dark:text-neutral-400 dark:hover:text-neutral-300'
    ],
    pills: isActive ? [
      'bg-white text-primary-600 shadow-sm rounded-md',
      'dark:bg-neutral-700 dark:text-primary-400'
    ] : [
      'text-neutral-600 hover:text-neutral-900 rounded-md',
      'dark:text-neutral-400 dark:hover:text-neutral-100'
    ],
    underline: isActive ? [
      'border-b-2 border-primary-600 text-primary-600 pb-2',
      'dark:border-primary-400 dark:text-primary-400'
    ] : [
      'border-b-2 border-transparent text-neutral-500 hover:text-neutral-700 pb-2',
      'dark:text-neutral-400 dark:hover:text-neutral-300'
    ]
  }

  const disabledClasses = tab.disabled ? ['cursor-not-allowed opacity-50'] : ['cursor-pointer']

  return cn(
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    disabledClasses
  )
}

const badgeClasses = computed(() => [
  'ml-2 px-2 py-0.5 text-xs rounded-full',
  'bg-neutral-100 text-neutral-600',
  'dark:bg-neutral-700 dark:text-neutral-300'
])

const setActiveTab = (index: number) => {
  const tab = props.tabs[index]
  if (tab.disabled) return
  
  activeTab.value = index
  emit('update:modelValue', index)
  emit('tab-change', index, tab)
}
</script>
