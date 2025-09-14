<template>
  <div class="w-full">
    <div class="flex items-center justify-between">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="flex items-center"
        :class="{ 'flex-1': index < steps.length - 1 }"
      >
        <!-- Step circle -->
        <div class="flex items-center">
          <div :class="stepCircleClasses(index)">
            <CheckCircle 
              v-if="index < currentStep" 
              :size="stepIconSize" 
              class="text-white" 
            />
            <div 
              v-else-if="step.loading"
              class="animate-spin rounded-full border-2 border-white border-t-transparent"
              :class="loadingSpinnerClasses"
            ></div>
            <span 
              v-else
              :class="stepNumberClasses(index)"
            >
              {{ index + 1 }}
            </span>
          </div>
          
          <!-- Step content -->
          <div v-if="!compact" class="ml-3">
            <div :class="stepTitleClasses(index)">
              {{ step.title }}
            </div>
            <div v-if="step.description" :class="stepDescriptionClasses(index)">
              {{ step.description }}
            </div>
          </div>
        </div>
        
        <!-- Connector line -->
        <div 
          v-if="index < steps.length - 1"
          :class="connectorClasses(index)"
        ></div>
      </div>
    </div>
    
    <!-- Compact mode labels -->
    <div v-if="compact" class="flex justify-between mt-4">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="text-center flex-1"
      >
        <div :class="stepTitleClasses(index)">
          {{ step.title }}
        </div>
        <div v-if="step.description" :class="stepDescriptionClasses(index)">
          {{ step.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle } from 'lucide-vue-next'
import { cn } from '../lib/utils'

export interface StepperStep {
  title: string
  description?: string
  loading?: boolean
  error?: boolean
}

interface Props {
  steps: StepperStep[]
  currentStep: number
  variant?: 'default' | 'primary' | 'success'
  size?: 'sm' | 'md' | 'lg'
  compact?: boolean
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  compact: false,
  clickable: false
})

const emit = defineEmits<{
  'step-click': [step: number]
}>()

const stepIconSize = computed(() => {
  const sizes = {
    sm: 16,
    md: 20,
    lg: 24
  }
  return sizes[props.size]
})

const loadingSpinnerClasses = computed(() => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  return sizes[props.size]
})

const stepCircleClasses = (index: number) => {
  const baseClasses = [
    'flex items-center justify-center rounded-full border-2 transition-all duration-200'
  ]

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const step = props.steps[index]
  const isCompleted = index < props.currentStep
  const isCurrent = index === props.currentStep
  // const isUpcoming = index > props.currentStep

  let stateClasses: string[] = []

  if (step?.error) {
    stateClasses = ['bg-red-500 border-red-500']
  } else if (isCompleted) {
    const completedVariants = {
      default: 'bg-green-500 border-green-500',
      primary: 'bg-primary-600 border-primary-600',
      success: 'bg-green-500 border-green-500'
    }
    stateClasses = [completedVariants[props.variant]]
  } else if (isCurrent) {
    const currentVariants = {
      default: 'bg-blue-500 border-blue-500',
      primary: 'bg-primary-600 border-primary-600',
      success: 'bg-green-500 border-green-500'
    }
    stateClasses = [currentVariants[props.variant]]
  } else {
    stateClasses = [
      'bg-neutral-200 border-neutral-300',
      'dark:bg-neutral-700 dark:border-neutral-600'
    ]
  }

  const interactionClasses = props.clickable ? [
    'cursor-pointer hover:scale-105'
  ] : []

  return cn(baseClasses, sizeClasses[props.size], stateClasses, interactionClasses)
}

const stepNumberClasses = (index: number) => {
  const baseClasses = ['font-medium']
  
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  const step = props.steps[index]
  const isCompleted = index < props.currentStep
  const isCurrent = index === props.currentStep

  const colorClasses = (isCompleted || isCurrent) ? 'text-white' : 'text-neutral-600 dark:text-neutral-400'

  return cn(baseClasses, sizeClasses[props.size], colorClasses)
}

const stepTitleClasses = (index: number) => {
  const baseClasses = ['font-medium transition-colors duration-200']
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const step = props.steps[index]
  const isCompleted = index < props.currentStep
  const isCurrent = index === props.currentStep

  let colorClasses: string[] = []
  
  if (step?.error) {
    colorClasses = ['text-red-600 dark:text-red-400']
  } else if (isCompleted) {
    colorClasses = ['text-green-600 dark:text-green-400']
  } else if (isCurrent) {
    colorClasses = ['text-primary-600 dark:text-primary-400']
  } else {
    colorClasses = ['text-neutral-500 dark:text-neutral-400']
  }

  return cn(baseClasses, sizeClasses[props.size], colorClasses)
}

const stepDescriptionClasses = (index: number) => {
  const baseClasses = ['transition-colors duration-200']
  
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  const step = props.steps[index]
  const isCompleted = index < props.currentStep
  const isCurrent = index === props.currentStep

  let colorClasses: string[] = []
  
  if (step?.error) {
    colorClasses = ['text-red-500 dark:text-red-400']
  } else if (isCompleted || isCurrent) {
    colorClasses = ['text-neutral-600 dark:text-neutral-300']
  } else {
    colorClasses = ['text-neutral-400 dark:text-neutral-500']
  }

  return cn(baseClasses, sizeClasses[props.size], colorClasses)
}

const connectorClasses = (index: number) => {
  const baseClasses = [
    'flex-1 h-0.5 mx-4 transition-colors duration-200'
  ]

  const isCompleted = index < props.currentStep - 1
  const isCurrent = index === props.currentStep - 1

  const colorClasses = (isCompleted || isCurrent) ? [
    'bg-primary-600 dark:bg-primary-400'
  ] : [
    'bg-neutral-300 dark:bg-neutral-600'
  ]

  return cn(baseClasses, colorClasses)
}

// const handleStepClick = (index: number) => {
//   if (props.clickable) {
//     emit('step-click', index)
//   }
// }
</script>
