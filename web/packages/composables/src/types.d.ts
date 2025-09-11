declare module '@easy-recruit/composables' {
  export function useApi<T>(): {
    data: any
    loading: any
    error: any
    execute: (apiCall: () => Promise<T>) => Promise<void>
    reset: () => void
  }
  
  export function useLocalStorage<T>(key: string, defaultValue: T): {
    state: any
    setValue: (value: T) => void
  }
}
