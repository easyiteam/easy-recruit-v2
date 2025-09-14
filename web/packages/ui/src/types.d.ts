declare module '@easy-recruit/ui' {
  import type { DefineComponent } from 'vue'
  
  export const Button: DefineComponent<any, any, any>
  export const Input: DefineComponent<any, any, any>
  export const Card: DefineComponent<any, any, any>
  export const Badge: DefineComponent<any, any, any>
  export const Avatar: DefineComponent<any, any, any>
  export const Modal: DefineComponent<any, any, any>
  export function cn(...classes: any[]): string
}

// Declare the module for the package itself
declare module '@easy-recruit/ui/dist/style.css'
declare module '@easy-recruit/ui/style.css'
