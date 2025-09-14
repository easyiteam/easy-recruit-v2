<template>
  <div id="app" class="min-h-screen bg-neutral-50 dark:bg-neutral-900">
    <header class="bg-white dark:bg-neutral-800 shadow-sm border-b border-neutral-200 dark:border-neutral-700">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">
          Easy Recruit - Design System Demo
        </h1>
      </div>
    </header>

    <nav class="bg-primary-600 dark:bg-primary-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-baseline space-x-8 h-16">
          <RouterLink 
            to="/" 
            class="text-white hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Components
          </RouterLink>
          <RouterLink 
            to="/about" 
            class="text-white hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            About
          </RouterLink>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.router-link-active {
  background-color: rgb(var(--primary-700));
}
</style>
