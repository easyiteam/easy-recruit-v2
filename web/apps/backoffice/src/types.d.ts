declare module '@easy-recruit/ui' {
  import type { DefineComponent } from 'vue'
  
  export const Button: DefineComponent<{
    variant?: 'default' | 'outline' | 'secondary' | 'destructive'
    size?: 'default' | 'sm' | 'lg'
  }>
  
  export function cn(...inputs: any[]): string
}

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
