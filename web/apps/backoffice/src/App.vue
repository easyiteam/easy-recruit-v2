<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Button } from '@easy-recruit/ui'
import { useApi } from '@easy-recruit/composables'

// Exemple d'utilisation du composable partagé
const { data, loading, error, execute } = useApi<string>()

const testApi = () => {
  execute(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return 'API call successful!'
  })
}
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-primary">Easy Recruit - Backoffice</h1>
        
        <nav class="mt-4 space-x-4">
          <RouterLink to="/" class="text-primary hover:text-primary/80">Home</RouterLink>
          <RouterLink to="/about" class="text-primary hover:text-primary/80">About</RouterLink>
        </nav>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-semibold mb-4">Test du Design System Partagé</h2>
          
          <div class="space-x-4">
            <Button @click="testApi" :disabled="loading">
              {{ loading ? 'Loading...' : 'Test API Call' }}
            </Button>
            
            <Button variant="outline">Outline Button</Button>
            <Button variant="secondary" size="sm">Small Secondary</Button>
          </div>

          <div v-if="data" class="mt-4 p-4 bg-green-100 text-green-800 rounded">
            {{ data }}
          </div>
          
          <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-800 rounded">
            {{ error }}
          </div>
        </div>

        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
