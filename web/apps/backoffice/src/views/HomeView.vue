<script setup lang="ts">
import { ref } from 'vue'
import { 
  Button, Input, Card, Badge, Avatar, Modal,
  Select, Checkbox, Radio, Switch, Textarea, Tooltip, Popover,
  Accordion, Tabs, Table, Pagination, Breadcrumb, Progress,
  Skeleton, Alert, Toast, MultiSelect, FileUpload, Stepper, Timeline
} from '@easy-recruit/ui'

const showModal = ref(false)
const showToast = ref(false)
const selectValue = ref('')
const checkboxValue = ref(false)
const radioValue = ref('option1')
const switchValue = ref(false)
const textareaValue = ref('')
const currentPage = ref(1)
const activeTab = ref(0)
const progressValue = ref(65)
const showAlert = ref(true)
const multiSelectValue = ref([])
const uploadedFiles = ref([])
const currentStep = ref(1)
const showTooltip = ref(false)
const showPopover = ref(false)

// Sample data for components
const selectOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
]

const tableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
]

const tableColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: false }
]

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Demo', href: '/demo' }
]

const accordionItems = ref([
  {
    title: 'What is Vue.js?',
    content: 'Vue.js is a progressive JavaScript framework for building user interfaces.',
    open: false
  },
  {
    title: 'How to install Vue?',
    content: 'You can install Vue using npm, yarn, or include it via CDN.',
    open: false
  },
  {
    title: 'Vue vs React?',
    content: 'Both are excellent frameworks with different approaches to building UIs.',
    open: false
  }
])

const tabItems = [
  { label: 'Overview', content: 'This is the overview tab content with general information.' },
  { label: 'Details', content: 'Here are the detailed specifications and features.' },
  { label: 'Settings', content: 'Configure your preferences and options here.' }
]

const radioOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
]

const multiSelectOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt.js' }
]

const stepperSteps = [
  { title: 'Account Setup', description: 'Create your account' },
  { title: 'Profile Info', description: 'Add your details' },
  { title: 'Verification', description: 'Verify your email' },
  { title: 'Complete', description: 'All done!' }
]

const timelineItems = [
  {
    title: 'Project Created',
    subtitle: 'New project initialized',
    description: 'Started working on the new design system components.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    variant: 'primary',
    badge: { text: 'New', variant: 'primary' }
  },
  {
    title: 'Components Added',
    subtitle: 'MultiSelect, FileUpload, Stepper, Timeline',
    description: 'Added four new components to the design system.',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    variant: 'success',
    badge: { text: 'Feature', variant: 'success' }
  },
  {
    title: 'Testing Phase',
    subtitle: 'Quality assurance',
    description: 'Running comprehensive tests on all components.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    variant: 'warning',
    badge: { text: 'In Progress', variant: 'warning' }
  }
]
</script>

<template>
  <main>
    <div class="space-y-8">
      <!-- Header Section -->
      <div class="text-center">
        <h1 class="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Design System Components
        </h1>
        <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Découvrez notre système de design moderne avec des composants élégants et fluides.
        </p>
      </div>

      <!-- Buttons Section -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Buttons</h2>
        
        <!-- Button Variants -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Variants</h3>
          <div class="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>

        <!-- Button Sizes -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Sizes</h3>
          <div class="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </div>

        <!-- Button States -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">States</h3>
          <div class="flex flex-wrap gap-3">
            <Button>Normal</Button>
            <Button :loading="true">Loading</Button>
            <Button :disabled="true">Disabled</Button>
          </div>
        </div>
      </div>

      <!-- Inputs Section -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Inputs</h2>
        
        <!-- Input Variants -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Variants</h3>
          <div class="space-y-3">
            <Input label="Default Input" placeholder="Enter text..." />
            <Input label="Filled Input" variant="filled" placeholder="Enter text..." />
            <Input label="Underlined Input" variant="underlined" placeholder="Enter text..." />
          </div>
        </div>

        <!-- Input Sizes -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Sizes</h3>
          <div class="space-y-3">
            <Input label="Small" size="sm" placeholder="Small input" />
            <Input label="Medium" size="md" placeholder="Medium input" />
            <Input label="Large" size="lg" placeholder="Large input" />
          </div>
        </div>

        <!-- Input States -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">States</h3>
          <div class="space-y-3">
            <Input label="Normal" placeholder="Normal input" />
            <Input label="With Error" placeholder="Error input" error="This field is required" />
            <Input label="With Hint" placeholder="Hint input" hint="This is a helpful hint" />
            <Input label="Disabled" placeholder="Disabled input" :disabled="true" />
          </div>
        </div>
      </div>

      <!-- Cards Section -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Cards</h2>
        
        <!-- Card Variants -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Variants</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="default">
              <template name="header">
                <h4 class="font-semibold">Default Card</h4>
              </template>
              <p class="text-neutral-600 dark:text-neutral-400">This is a default card with header and content.</p>
            </Card>
            
            <Card variant="outlined">
              <template name="header">
                <h4 class="font-semibold">Outlined Card</h4>
              </template>
              <p class="text-neutral-600 dark:text-neutral-400">This is an outlined card variant.</p>
            </Card>
            
            <Card variant="elevated">
              <template name="header">
                <h4 class="font-semibold">Elevated Card</h4>
              </template>
              <p class="text-neutral-600 dark:text-neutral-400">This is an elevated card with shadow.</p>
            </Card>
            
            <Card variant="filled">
              <template name="header">
                <h4 class="font-semibold">Filled Card</h4>
              </template>
              <p class="text-neutral-600 dark:text-neutral-400">This is a filled card variant.</p>
            </Card>
          </div>
        </div>
      </div>

      <!-- Badges Section -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Badges</h2>
        
        <!-- Badge Variants -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Variants</h3>
          <div class="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>

        <!-- Badge Sizes -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Sizes</h3>
          <div class="flex flex-wrap items-center gap-3">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        </div>
      </div>

      <!-- Avatars Section -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Avatars</h2>
        
        <!-- Avatar Variants -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Variants</h3>
          <div class="flex flex-wrap gap-4">
            <Avatar variant="circular" initials="JD" />
            <Avatar variant="rounded" initials="AB" />
            <Avatar variant="square" initials="XY" />
          </div>
        </div>

        <!-- Avatar Sizes -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Sizes</h3>
          <div class="flex flex-wrap items-center gap-4">
            <Avatar size="sm" initials="S" />
            <Avatar size="md" initials="M" />
            <Avatar size="lg" initials="L" />
            <Avatar size="xl" initials="XL" />
          </div>
        </div>

        <!-- Avatar with Status -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Status Indicators</h3>
          <div class="flex flex-wrap gap-4">
            <Avatar initials="ON" status="online" />
            <Avatar initials="OF" status="offline" />
            <Avatar initials="AW" status="away" />
            <Avatar initials="BY" status="busy" />
          </div>
        </div>
      </div>

      <!-- Modal Section -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Modal</h2>
        
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Modal Example</h3>
          <Button @click="showModal = true">Open Modal</Button>
          
          <Modal v-model="showModal" title="Example Modal">
            <template name="header">
              <h3 class="text-lg font-semibold">Modal Header</h3>
            </template>
            
            <div class="space-y-4">
              <p class="text-neutral-600 dark:text-neutral-400">
                This is an example modal with header, content, and footer sections.
                You can close it by clicking the X button, pressing Escape, or clicking outside.
              </p>
              
              <Input label="Example Input" placeholder="Type something..." />
            </div>
            
            <template name="footer">
              <div class="flex justify-end gap-3">
                <Button variant="outline" @click="showModal = false">Cancel</Button>
                <Button variant="primary" @click="showModal = false">Save</Button>
              </div>
            </template>
          </Modal>
        </div>
      </div>

      <!-- Design System Status -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Design System Status</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card variant="elevated">
            <template name="header">
              <h4 class="font-semibold text-green-600">✅ Core Components</h4>
            </template>
            <ul class="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
              <li>• Button (5 variants)</li>
              <li>• Input (3 variants)</li>
              <li>• Card (4 variants)</li>
              <li>• Badge (7 variants)</li>
              <li>• Avatar (status indicators)</li>
              <li>• Modal (accessible)</li>
            </ul>
          </Card>

          <Card variant="elevated">
            <template name="header">
              <h4 class="font-semibold text-green-600">✅ Form Components</h4>
            </template>
            <ul class="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
              <li>• Select/Dropdown</li>
              <li>• Checkbox</li>
              <li>• Radio buttons</li>
              <li>• Switch/Toggle</li>
              <li>• Textarea</li>
            </ul>
          </Card>

          <Card variant="elevated">
            <template name="header">
              <h4 class="font-semibold text-green-600">✅ Navigation & Layout</h4>
            </template>
            <ul class="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
              <li>• Tooltip</li>
              <li>• Popover</li>
              <li>• Accordion</li>
              <li>• Tabs</li>
              <li>• Breadcrumb</li>
            </ul>
          </Card>

          <Card variant="elevated">
            <template name="header">
              <h4 class="font-semibold text-green-600">✅ Data Display</h4>
            </template>
            <ul class="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
              <li>• Table (sortable)</li>
              <li>• Pagination</li>
              <li>• Progress bars</li>
              <li>• Skeleton loaders</li>
            </ul>
          </Card>

          <Card variant="elevated">
            <template name="header">
              <h4 class="font-semibold text-green-600">✅ Feedback</h4>
            </template>
            <ul class="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
              <li>• Alert/Notifications</li>
              <li>• Toast messages</li>
            </ul>
          </Card>

          <Card variant="elevated">
            <template name="header">
              <h4 class="font-semibold text-blue-600">🎨 Features</h4>
            </template>
            <ul class="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
              <li>• TypeScript support</li>
              <li>• Dark mode ready</li>
              <li>• Tailwind v4 compatible</li>
              <li>• Accessibility (ARIA)</li>
              <li>• Responsive design</li>
            </ul>
          </Card>
        </div>

      <!-- Form Components Section -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Form Components</h2>
        
        <!-- Select Component -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Select</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Select 
                v-model="selectValue" 
                :options="selectOptions" 
                placeholder="Select an option..."
                label="Choose an option"
              />
              <p class="text-sm text-neutral-500">Selected: {{ selectValue || 'None' }}</p>
            </div>
          </div>
        </div>

        <!-- Checkbox Component -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Checkbox</h3>
          <div class="space-y-3">
            <Checkbox 
              v-model="checkboxValue"
              label="I agree to the terms and conditions"
            />
            <p class="text-sm text-neutral-500">Checked: {{ checkboxValue }}</p>
          </div>
        </div>

        <!-- Radio Component -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Radio Buttons</h3>
          <div class="space-y-3">
            <Radio 
              v-model="radioValue"
              :options="radioOptions"
              name="demo-radio"
            />
            <p class="text-sm text-neutral-500">Selected: {{ radioValue }}</p>
          </div>
        </div>

        <!-- Switch Component -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Switch</h3>
          <div class="space-y-3">
            <Switch 
              v-model="switchValue"
              label="Enable notifications"
            />
            <p class="text-sm text-neutral-500">Enabled: {{ switchValue }}</p>
          </div>
        </div>

        <!-- Textarea Component -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Textarea</h3>
          <div class="space-y-2">
            <Textarea 
              v-model="textareaValue"
              label="Your message"
              placeholder="Enter your message here..."
              :rows="4"
            />
            <p class="text-sm text-neutral-500">Characters: {{ textareaValue.length }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation Components Section -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Navigation & Layout</h2>
        
        <!-- Breadcrumb Component -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Breadcrumb</h3>
          <Breadcrumb :items="breadcrumbItems" />
        </div>

        <!-- Progress Component -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Progress</h3>
          <div class="space-y-4">
            <Progress :value="progressValue" label="Progress" />
            <div class="flex gap-2">
              <Button size="sm" @click="progressValue = Math.max(0, progressValue - 10)">-10%</Button>
              <Button size="sm" @click="progressValue = Math.min(100, progressValue + 10)">+10%</Button>
            </div>
          </div>
        </div>

        <!-- Accordion Component -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Accordion</h3>
          <Accordion :items="accordionItems" />
        </div>

        <!-- Tabs Component -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Tabs</h3>
          <Tabs v-model="activeTab" :tabs="tabItems" />
        </div>
      </div>

      <!-- Data Display Components Section -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Data Display</h2>
        
        <!-- Table Component -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Table</h3>
          <Table :columns="tableColumns" :data="tableData" />
        </div>

        <!-- Pagination Component -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Pagination</h3>
          <Pagination 
            v-model="currentPage" 
            :total="5" 
            :show-size-changer="false"
          />
        </div>

        <!-- Skeleton Component -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Skeleton Loaders</h3>
          <div class="space-y-3">
            <Skeleton class="h-4 w-3/4" />
            <Skeleton class="h-4 w-1/2" />
            <Skeleton class="h-4 w-5/6" />
          </div>
        </div>
      </div>

      <!-- Feedback Components Section -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Feedback</h2>
        
        <!-- Alert Component -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Alert</h3>
          <div class="space-y-3">
            <Alert 
              v-if="showAlert"
              variant="info"
              title="Info alert!"
              message="This is an informational message."
              :dismissible="true"
              @dismiss="showAlert = false"
            />
            <Button size="sm" @click="showAlert = true" v-if="!showAlert">Show Alert</Button>
          </div>
        </div>

        <!-- Toast Component -->
        <Card>
          <template name="header">
            <h3 class="text-lg font-semibold">Toast</h3>
          </template>
          <div class="space-y-4">
            <Button @click="showToast = true">Show Toast</Button>
            <Toast
              v-if="showToast"
              variant="success"
              title="Success!"
              message="Operation completed successfully."
              :auto-dismiss="true"
              :duration="3000"
              @close="showToast = false"
            />
          </div>
        </Card>

        <!-- Tooltip Component -->
        <Card>
          <template name="header">
            <h3 class="text-lg font-semibold">Tooltip</h3>
          </template>
          <div class="space-y-4">
            <div class="flex gap-4">
              <Tooltip content="This is a tooltip">
                <Button>Hover me</Button>
              </Tooltip>
              <Tooltip content="Tooltip on top" placement="top">
                <Button variant="secondary">Top</Button>
              </Tooltip>
              <Tooltip content="Tooltip on bottom" placement="bottom">
                <Button variant="outline">Bottom</Button>
              </Tooltip>
            </div>
          </div>
        </Card>

        <!-- Popover Component -->
        <Card>
          <template name="header">
            <h3 class="text-lg font-semibold">Popover</h3>
          </template>
          <div class="space-y-4">
            <Popover>
              <template name="trigger">
                <Button>Open Popover</Button>
              </template>
              <div class="space-y-2">
                <h4 class="font-semibold">Popover Title</h4>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  This is the popover content. You can put any content here.
                </p>
                <Button size="sm" variant="outline">Action</Button>
              </div>
            </Popover>
          </div>
        </Card>

        <!-- MultiSelect Component -->
        <Card>
          <template name="header">
            <h3 class="text-lg font-semibold">MultiSelect</h3>
          </template>
          <div class="space-y-4">
            <MultiSelect
              v-model="multiSelectValue"
              :options="multiSelectOptions"
              label="Select Technologies"
              placeholder="Choose your favorite frameworks..."
              :searchable="true"
              :max-items="3"
            />
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Selected: {{ multiSelectValue.join(', ') || 'None' }}
            </p>
          </div>
        </Card>

        <!-- FileUpload Component -->
        <Card>
          <template name="header">
            <h3 class="text-lg font-semibold">File Upload</h3>
          </template>
          <div class="space-y-4">
            <FileUpload
              v-model="uploadedFiles"
              label="Upload Files"
              :multiple="true"
              accept="image/*,.pdf,.doc,.docx"
              :max-size="5 * 1024 * 1024"
              :max-files="5"
              @upload="console.log"
              @error="console.error"
            />
          </div>
        </Card>

        <!-- Stepper Component -->
        <Card>
          <template name="header">
            <h3 class="text-lg font-semibold">Stepper</h3>
          </template>
          <div class="space-y-4">
            <Stepper
              :steps="stepperSteps"
              :current-step="currentStep"
              variant="primary"
              size="md"
            />
            <div class="flex gap-2">
              <Button 
                @click="currentStep = Math.max(0, currentStep - 1)"
                :disabled="currentStep === 0"
                variant="outline"
                size="sm"
              >
                Previous
              </Button>
              <Button 
                @click="currentStep = Math.min(stepperSteps.length - 1, currentStep + 1)"
                :disabled="currentStep === stepperSteps.length - 1"
                size="sm"
              >
                Next
              </Button>
            </div>
          </div>
        </Card>

        <!-- Timeline Component -->
        <Card>
          <template name="header">
            <h3 class="text-lg font-semibold">Timeline</h3>
          </template>
          <div class="space-y-4">
            <Timeline
              :items="timelineItems"
              variant="default"
              size="md"
            />
          </div>
        </Card>
      </div>

        <div class="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h3 class="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
            🎉 Design System Complete!
          </h3>
          <p class="text-green-700 dark:text-green-300 mb-4">
            All 18 components have been successfully created, exported, and are ready for use across Easy Recruit V2.
          </p>
          <div class="grid grid-cols-3 gap-4 text-sm">
            <div class="bg-white dark:bg-neutral-800 p-3 rounded">
              <strong>6 Core Components</strong><br/>
              Button, Input, Card, Badge, Avatar, Modal
            </div>
            <div class="bg-white dark:bg-neutral-800 p-3 rounded">
              <strong>7 Form Components</strong><br/>
              Select, Checkbox, Radio, Switch, Textarea, Tooltip, Popover
            </div>
            <div class="bg-white dark:bg-neutral-800 p-3 rounded">
              <strong>5 Data Components</strong><br/>
              Accordion, Tabs, Table, Pagination, Breadcrumb, Progress, Skeleton, Alert, Toast
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
