<template>
  <div class="relative">
    <label v-if="label" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="input-required">*</span>
    </label>
    
    <div 
      :class="containerClasses"
      @click="toggleDropdown"
      ref="containerRef"
    >
      <!-- Selected chips -->
      <div class="flex flex-wrap gap-1 min-h-[2rem] items-center">
        <div
          v-for="item in selectedItems"
          :key="item.value"
          class="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded-md dark:bg-primary-900 dark:text-primary-200"
        >
          <span>{{ item.label }}</span>
          <button
            @click.stop="removeItem(item.value)"
            class="hover:bg-primary-200 dark:hover:bg-primary-800 rounded-full p-0.5 transition-colors"
          >
            <X :size="14" />
          </button>
        </div>
        
        <!-- Placeholder when no items selected -->
        <span 
          v-if="selectedItems.length === 0" 
          class="text-neutral-500 dark:text-neutral-400"
        >
          {{ placeholder }}
        </span>
      </div>
      
      <!-- Dropdown arrow -->
      <ChevronDown 
        :size="20" 
        :class="['transition-transform duration-200', isOpen && 'rotate-180']"
      />
    </div>
    
    <!-- Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        :class="dropdownClasses"
        ref="dropdownRef"
      >
        <!-- Search input -->
        <div v-if="searchable" class="p-2 border-b border-neutral-200 dark:border-neutral-700">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
            @click.stop
          />
        </div>
        
        <!-- Options -->
        <div class="max-h-60 overflow-y-auto">
          <div
            v-for="option in filteredOptions"
            :key="option.value"
            :class="optionClasses(option)"
            @click="toggleOption(option)"
          >
            <div class="flex items-center gap-2">
              <div :class="checkboxClasses(option)">
                <Check v-if="isSelected(option.value)" :size="14" class="text-white" />
              </div>
              <span>{{ option.label }}</span>
            </div>
          </div>
          
          <div v-if="filteredOptions.length === 0" class="px-3 py-2 text-sm text-neutral-500 dark:text-neutral-400">
            No options found
          </div>
        </div>
      </div>
    </Transition>
    
    <p v-if="error && errorMessage" class="input-error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDown, X, Check } from 'lucide-vue-next'
import { cn } from '../lib/utils'

export interface MultiSelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

interface Props {
  modelValue?: (string | number)[]
  options?: MultiSelectOption[]
  placeholder?: string
  label?: string
  required?: boolean
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  searchable?: boolean
  maxItems?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'underlined'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  options: () => [],
  placeholder: 'Select items...',
  searchable: true,
  size: 'md',
  variant: 'default'
})

const emit = defineEmits<{
  'update:modelValue': [value: (string | number)[]]
  'change': [value: (string | number)[]]
}>()

const isOpen = ref(false)
const searchQuery = ref('')
const containerRef = ref<HTMLElement>()
const dropdownRef = ref<HTMLElement>()

const selectedItems = computed(() => {
  return props.options.filter(option => props.modelValue.includes(option.value))
})

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options
  }
  
  return props.options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const labelClasses = computed(() => [
  'input-label',
  props.error && 'input-label-error'
])

const containerClasses = computed(() => {
  const baseClasses = [
    'relative flex items-center justify-between gap-2 cursor-pointer transition-colors duration-200',
    'border rounded-md bg-white dark:bg-neutral-900',
    'focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500/20'
  ]

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm min-h-[2rem]',
    md: 'px-3 py-2 text-sm min-h-[2.5rem]',
    lg: 'px-4 py-3 text-base min-h-[3rem]'
  }

  const variantClasses = {
    default: [
      'border-neutral-300 dark:border-neutral-600',
      'hover:border-neutral-400 dark:hover:border-neutral-500',
      props.error && 'border-red-500 dark:border-red-400'
    ],
    filled: [
      'border-transparent bg-neutral-100 dark:bg-neutral-800',
      'hover:bg-neutral-200 dark:hover:bg-neutral-700',
      props.error && 'bg-red-50 dark:bg-red-950'
    ],
    underlined: [
      'border-0 border-b-2 rounded-none bg-transparent',
      'border-neutral-300 dark:border-neutral-600',
      'hover:border-neutral-400 dark:hover:border-neutral-500',
      props.error && 'border-red-500 dark:border-red-400'
    ]
  }

  const stateClasses = [
    props.disabled && 'opacity-50 cursor-not-allowed',
    isOpen.value && 'ring-2 ring-primary-500/20 border-primary-500'
  ]

  return cn(
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    stateClasses
  )
})

const dropdownClasses = computed(() => [
  'absolute z-50 w-full mt-1 bg-white dark:bg-neutral-900',
  'border border-neutral-200 dark:border-neutral-700',
  'rounded-md shadow-lg'
])

const optionClasses = (option: MultiSelectOption) => [
  'px-3 py-2 cursor-pointer transition-colors duration-150',
  'hover:bg-neutral-50 dark:hover:bg-neutral-800',
  option.disabled && 'opacity-50 cursor-not-allowed',
  isSelected(option.value) && 'bg-primary-50 dark:bg-primary-950'
]

const checkboxClasses = (option: MultiSelectOption) => [
  'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
  isSelected(option.value) 
    ? 'checkbox-checked' 
    : 'border-neutral-300 dark:border-neutral-600'
]

const isSelected = (value: string | number) => {
  return props.modelValue.includes(value)
}

const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
  }
}

const toggleOption = (option: MultiSelectOption) => {
  if (option.disabled) return
  
  const newValue = [...props.modelValue]
  const index = newValue.indexOf(option.value)
  
  if (index > -1) {
    newValue.splice(index, 1)
  } else {
    if (props.maxItems && newValue.length >= props.maxItems) {
      return
    }
    newValue.push(option.value)
  }
  
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const removeItem = (value: string | number) => {
  const newValue = props.modelValue.filter(v => v !== value)
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const handleClickOutside = (event: Event) => {
  if (
    containerRef.value &&
    dropdownRef.value &&
    !containerRef.value.contains(event.target as Node) &&
    !dropdownRef.value.contains(event.target as Node)
  ) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
