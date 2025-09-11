import { ref } from 'vue'

export function useApi<T>(): {
  data: any
  loading: any
  error: any
  execute: (apiCall: () => Promise<T>) => Promise<void>
  reset: () => void
} {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const execute = async (apiCall: () => Promise<T>) => {
    loading.value = true
    error.value = null
    
    try {
      data.value = await apiCall()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue'
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    data.value = null
    loading.value = false
    error.value = null
  }

  return {
    data,
    loading,
    error,
    execute,
    reset
  }
}
