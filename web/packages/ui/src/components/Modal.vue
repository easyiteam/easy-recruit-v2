<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        <!-- Modal Content -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="modelValue"
            :class="modalClasses"
            @click.stop
          >
            <!-- Header -->
            <div v-if="$slots.header || title || closable" :class="headerClasses">
              <slot name="header">
                <h2 v-if="title" class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  {{ title }}
                </h2>
              </slot>
              
              <button
                v-if="closable"
                @click="close"
                class="p-1 rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:text-neutral-300 dark:hover:bg-neutral-700 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <!-- Content -->
            <div :class="contentClasses">
              <slot />
            </div>
            
            <!-- Footer -->
            <div v-if="$slots.footer" :class="footerClasses">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, nextTick } from 'vue'
import { cn } from '../lib/utils'

interface Props {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  closable?: boolean
  closeOnBackdrop?: boolean
  persistent?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
  (e: 'open'): void
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closable: true,
  closeOnBackdrop: true,
  persistent: false
})

const emit = defineEmits<Emits>()

const modalClasses = computed(() => {
  const baseClasses = [
    'relative',
    'bg-white dark:bg-neutral-800',
    'rounded-lg',
    'shadow-xl',
    'max-h-[90vh]',
    'overflow-hidden',
    'flex flex-col'
  ]

  const sizeClasses = {
    sm: 'w-full max-w-sm',
    md: 'w-full max-w-md',
    lg: 'w-full max-w-lg',
    xl: 'w-full max-w-xl',
    '2xl': 'w-full max-w-2xl',
    full: 'w-full max-w-[95vw] h-full max-h-[95vh]'
  }

  return cn(baseClasses, sizeClasses[props.size])
})

const headerClasses = computed(() => {
  return cn(
    'flex items-center justify-between',
    'px-6 py-4',
    'border-b border-neutral-200 dark:border-neutral-700',
    'bg-white dark:bg-neutral-800'
  )
})

const contentClasses = computed(() => {
  return cn(
    'flex-1 overflow-y-auto',
    'px-6 py-4'
  )
})

const footerClasses = computed(() => {
  return cn(
    'px-6 py-4',
    'border-t border-neutral-200 dark:border-neutral-700',
    'bg-neutral-50 dark:bg-neutral-900/50'
  )
})

const close = () => {
  if (!props.persistent) {
    emit('update:modelValue', false)
    emit('close')
  }
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    close()
  }
}

// Handle escape key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.modelValue && props.closable) {
    close()
  }
}

// Body scroll lock
const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
  document.body.style.overflow = ''
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        lockBodyScroll()
        document.addEventListener('keydown', handleEscape)
        emit('open')
      })
    } else {
      unlockBodyScroll()
      document.removeEventListener('keydown', handleEscape)
    }
  },
  { immediate: true }
)

// Cleanup on unmount
import { onUnmounted } from 'vue'
onUnmounted(() => {
  unlockBodyScroll()
  document.removeEventListener('keydown', handleEscape)
})
</script>
