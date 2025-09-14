<template>
  <div class="space-y-2">
    <label v-if="label" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="input-required">*</span>
    </label>
    
    <div
      :class="dropzoneClasses"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
      @click="triggerFileInput"
    >
      <input
        ref="fileInputRef"
        type="file"
        :multiple="multiple"
        :accept="accept"
        :disabled="disabled"
        class="hidden"
        @change="handleFileSelect"
      />
      
      <div class="flex flex-col items-center justify-center py-8">
        <Upload :size="48" class="text-neutral-400 dark:text-neutral-500 mb-4" />
        
        <div class="text-center">
          <p class="text-lg font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            {{ isDragOver ? 'Drop files here' : 'Upload files' }}
          </p>
          <p class="text-sm text-neutral-500 dark:text-neutral-400">
            Drag and drop files here, or <span class="text-primary-600 dark:text-primary-400 font-medium">browse</span>
          </p>
          <p v-if="accept" class="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
            Accepted formats: {{ accept }}
          </p>
          <p v-if="maxSize" class="text-xs text-neutral-400 dark:text-neutral-500">
            Max size: {{ formatFileSize(maxSize) }}
          </p>
        </div>
      </div>
    </div>
    
    <!-- File list -->
    <div v-if="files.length > 0" class="space-y-2">
      <h4 class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        Selected Files ({{ files.length }})
      </h4>
      
      <div class="space-y-2 max-h-40 overflow-y-auto">
        <div
          v-for="(file, index) in files"
          :key="index"
          class="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
        >
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <div class="flex-shrink-0">
              <FileText v-if="isTextFile(file)" :size="20" class="text-blue-500" />
              <Image v-else-if="isImageFile(file)" :size="20" class="text-green-500" />
              <File v-else :size="20" class="text-neutral-500" />
            </div>
            
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                {{ file.name }}
              </p>
              <p class="text-xs text-neutral-500 dark:text-neutral-400">
                {{ formatFileSize(file.size) }}
              </p>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <!-- Upload progress -->
            <div v-if="uploadProgress[index] !== undefined" class="flex items-center gap-2">
              <div class="w-16 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                <div 
                  class="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${uploadProgress[index]}%` }"
                ></div>
              </div>
              <span class="text-xs text-neutral-500">{{ uploadProgress[index] }}%</span>
            </div>
            
            <!-- Status icons -->
            <CheckCircle v-if="uploadProgress[index] === 100" :size="16" class="text-green-500" />
            <AlertCircle v-else-if="uploadErrors[index]" :size="16" class="text-red-500" />
            
            <!-- Remove button -->
            <button
              @click="removeFile(index)"
              class="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full transition-colors"
              :disabled="disabled"
            >
              <X :size="16" class="text-neutral-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <p v-if="error && errorMessage" class="input-error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Upload, FileText, Image, File, X, CheckCircle, AlertCircle } from 'lucide-vue-next'
import { cn } from '../lib/utils'

interface Props {
  modelValue?: File[]
  label?: string
  required?: boolean
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  multiple?: boolean
  accept?: string
  maxSize?: number // in bytes
  maxFiles?: number
  variant?: 'default' | 'compact'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  multiple: true,
  variant: 'default'
})

const emit = defineEmits<{
  'update:modelValue': [files: File[]]
  'change': [files: File[]]
  'upload': [file: File, index: number]
  'error': [error: string, file?: File]
}>()

const isDragOver = ref(false)
const fileInputRef = ref<HTMLInputElement>()
const uploadProgress = ref<Record<number, number>>({})
const uploadErrors = ref<Record<number, string>>({})

const files = computed(() => props.modelValue)

const labelClasses = computed(() => [
  'input-label',
  props.error && 'input-label-error'
])

const dropzoneClasses = computed(() => {
  const baseClasses = [
    'relative border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200',
    'hover:border-primary-400 dark:hover:border-primary-500'
  ]

  const stateClasses = [
    isDragOver.value 
      ? 'border-primary-500 bg-primary-50 dark:bg-primary-950' 
      : 'border-neutral-300 dark:border-neutral-600',
    props.disabled && 'opacity-50 cursor-not-allowed',
    props.error && 'border-red-500 dark:border-red-400'
  ]

  const variantClasses = {
    default: 'min-h-[12rem]',
    compact: 'min-h-[8rem]'
  }

  return cn(baseClasses, stateClasses, variantClasses[props.variant])
})

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  if (props.disabled) return
  isDragOver.value = true
}

const handleDragEnter = (e: DragEvent) => {
  e.preventDefault()
  if (props.disabled) return
  isDragOver.value = true
}

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault()
  if (props.disabled) return
  // Only set to false if we're leaving the dropzone entirely
  if (!(e.currentTarget as Element)?.contains(e.relatedTarget as Node)) {
    isDragOver.value = false
  }
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  if (props.disabled) return
  
  isDragOver.value = false
  const droppedFiles = Array.from(e.dataTransfer?.files || [])
  processFiles(droppedFiles)
}

const triggerFileInput = () => {
  if (props.disabled) return
  fileInputRef.value?.click()
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const selectedFiles = Array.from(target.files || [])
  processFiles(selectedFiles)
  
  // Reset input value to allow selecting the same file again
  target.value = ''
}

const processFiles = (newFiles: File[]) => {
  const validFiles: File[] = []
  
  for (const file of newFiles) {
    // Check file size
    if (props.maxSize && file.size > props.maxSize) {
      emit('error', `File "${file.name}" is too large. Maximum size is ${formatFileSize(props.maxSize)}.`, file)
      continue
    }
    
    // Check file type
    if (props.accept && !isFileTypeAccepted(file)) {
      emit('error', `File "${file.name}" is not an accepted file type.`, file)
      continue
    }
    
    validFiles.push(file)
  }
  
  let updatedFiles = [...files.value, ...validFiles]
  
  // Check max files limit
  if (props.maxFiles && updatedFiles.length > props.maxFiles) {
    updatedFiles = updatedFiles.slice(0, props.maxFiles)
    emit('error', `Maximum ${props.maxFiles} files allowed.`)
  }
  
  // If not multiple, keep only the last file
  if (!props.multiple && updatedFiles.length > 1) {
    updatedFiles = [updatedFiles[updatedFiles.length - 1]]
  }
  
  emit('update:modelValue', updatedFiles)
  emit('change', updatedFiles)
  
  // Emit upload event for each new file
  validFiles.forEach((file, index) => {
    const fileIndex = files.value.length + index
    emit('upload', file, fileIndex)
  })
}

const removeFile = (index: number) => {
  if (props.disabled) return
  
  const updatedFiles = files.value.filter((_, i) => i !== index)
  emit('update:modelValue', updatedFiles)
  emit('change', updatedFiles)
  
  // Clean up progress and error tracking
  delete uploadProgress.value[index]
  delete uploadErrors.value[index]
}

const isFileTypeAccepted = (file: File): boolean => {
  if (!props.accept) return true
  
  const acceptedTypes = props.accept.split(',').map(type => type.trim())
  
  return acceptedTypes.some(acceptedType => {
    if (acceptedType.startsWith('.')) {
      return file.name.toLowerCase().endsWith(acceptedType.toLowerCase())
    }
    
    if (acceptedType.includes('*')) {
      const [type] = acceptedType.split('/')
      return file.type.startsWith(type)
    }
    
    return file.type === acceptedType
  })
}

const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/')
}

const isTextFile = (file: File): boolean => {
  return file.type.startsWith('text/') || 
         file.type === 'application/json' ||
         file.type === 'application/xml' ||
         file.name.endsWith('.md') ||
         file.name.endsWith('.txt')
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Expose methods for parent components to control upload progress
const setUploadProgress = (index: number, progress: number) => {
  uploadProgress.value[index] = progress
}

const setUploadError = (index: number, error: string) => {
  uploadErrors.value[index] = error
}

defineExpose({
  setUploadProgress,
  setUploadError
})
</script>
