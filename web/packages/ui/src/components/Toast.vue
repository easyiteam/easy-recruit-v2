<template>
  <Teleport to="body">
    <div
      v-if="visible"
      :class="toastClasses"
      role="alert"
      aria-live="assertive"
      @mouseenter="pauseTimer"
      @mouseleave="resumeTimer"
    >
      <div class="flex items-start gap-3">
        <!-- Icon -->
        <div v-if="showIcon" class="flex-shrink-0 mt-0.5">
          <svg
            v-if="variant === 'success'"
            class="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg
            v-else-if="variant === 'error'"
            class="w-5 h-5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg
            v-else-if="variant === 'warning'"
            class="w-5 h-5 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <svg
            v-else
            class="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <!-- Content -->
        <div class="flex-1 min-w-0">
          <h4 v-if="title" class="font-medium text-sm mb-1 text-neutral-900 dark:text-neutral-100">
            {{ title }}
          </h4>
          <p class="text-sm text-neutral-700 dark:text-neutral-300">
            <slot>{{ message }}</slot>
          </p>
          
          <!-- Actions -->
          <div v-if="$slots.actions" class="mt-3 flex gap-2">
            <slot name="actions" />
          </div>
        </div>
        
        <!-- Close Button -->
        <button
          v-if="dismissible"
          type="button"
          class="flex-shrink-0 p-1 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors duration-200"
          @click="close"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Progress Bar -->
      <div
        v-if="showProgress && autoDismiss && duration > 0"
        class="absolute bottom-0 left-0 h-1 bg-current opacity-20 transition-all duration-100 ease-linear"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { cn } from '../lib/utils'

export interface ToastProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  message?: string
  duration?: number
  dismissible?: boolean
  showIcon?: boolean
  showProgress?: boolean
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  autoDismiss?: boolean
}

const props = withDefaults(defineProps<ToastProps>(), {
  variant: 'info',
  duration: 5000,
  dismissible: true,
  showIcon: true,
  showProgress: false,
  position: 'top-right',
  autoDismiss: true
})

const emit = defineEmits<{
  close: []
}>()

const visible = ref(false)
const progress = ref(100)
const timer = ref<number>()
const startTime = ref<number>()
const remainingTime = ref<number>()

const toastClasses = computed(() => {
  const baseClasses = [
    '!fixed z-[9999] max-w-sm w-full bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 p-4',
    'transform transition-all duration-300 ease-out',
    'relative overflow-hidden'
  ]

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
  }

  const variantClasses = {
    info: 'border-l-4 border-l-blue-500',
    success: 'border-l-4 border-l-green-500',
    warning: 'border-l-4 border-l-yellow-500',
    error: 'border-l-4 border-l-red-500'
  }

  const animationClasses = visible.value 
    ? 'translate-x-0 opacity-100 scale-100' 
    : 'translate-x-full opacity-0 scale-95'

  return cn(
    baseClasses,
    positionClasses[props.position],
    variantClasses[props.variant],
    animationClasses
  )
})

const show = () => {
  visible.value = true
  
  if (props.autoDismiss && props.duration > 0) {
    startTimer()
  }
}

const close = () => {
  visible.value = false
  clearTimer()
  emit('close')
}

const startTimer = () => {
  if (props.duration <= 0) return
  
  startTime.value = Date.now()
  remainingTime.value = props.duration
  
  const updateProgress = () => {
    if (!visible.value) return
    
    const elapsed = Date.now() - startTime.value!
    const remaining = Math.max(0, props.duration - elapsed)
    
    progress.value = (remaining / props.duration) * 100
    
    if (remaining <= 0) {
      close()
    } else {
      timer.value = requestAnimationFrame(updateProgress)
    }
  }
  
  timer.value = requestAnimationFrame(updateProgress)
}

const pauseTimer = () => {
  if (timer.value) {
    cancelAnimationFrame(timer.value)
    remainingTime.value = Math.max(0, props.duration - (Date.now() - startTime.value!))
  }
}

const resumeTimer = () => {
  if (remainingTime.value && remainingTime.value > 0) {
    startTime.value = Date.now() - (props.duration - remainingTime.value)
    startTimer()
  }
}

const clearTimer = () => {
  if (timer.value) {
    cancelAnimationFrame(timer.value)
    timer.value = undefined
  }
}

onMounted(() => {
  show()
})

onUnmounted(() => {
  clearTimer()
})

// Expose methods for programmatic control
defineExpose({
  show,
  close
})
</script>
