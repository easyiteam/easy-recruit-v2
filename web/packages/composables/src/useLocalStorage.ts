import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const storedValue = localStorage.getItem(key)
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue
  
  const state = ref(initialValue)

  const setValue = (value: T) => {
    state.value = value
    localStorage.setItem(key, JSON.stringify(value))
  }

  // Watch for changes and update localStorage
  watch(state, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })

  return { state, setValue }
}
