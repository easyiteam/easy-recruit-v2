declare module '@easy-recruit/ui' {
  import type { DefineComponent } from 'vue'
  
  export const Button: DefineComponent<{
    variant?: 'default' | 'outline' | 'secondary' | 'destructive'
    size?: 'default' | 'sm' | 'lg'
  }>
  
  export function cn(...inputs: any[]): string
}
