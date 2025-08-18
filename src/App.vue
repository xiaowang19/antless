<script setup lang="ts">
import { ref } from 'vue';
import Button from './components/Button/Button.vue';
import Switch from './components/Switch/Switch.vue';
import Input from './components/Input/Input.vue';
import Modal from './components/Modal/Modal.vue';

// State for interactive components
const switchState = ref(false);
const inputValue = ref('');
const isModalOpen = ref(false);

function openModal() {
  isModalOpen.value = true;
}
</script>

<template>
  <div class="theme-ant">
    <div class="p-8 bg-gray-50 min-h-screen font-sans">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Component Showcase</h1>

      <!-- ================================================================== -->
      <!-- Button Showcase -->
      <!-- ================================================================== -->
      <div class="p-6 bg-white rounded-lg shadow mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Button</h2>
        <div class="flex items-center space-x-4">
          <Button>Default</Button>
          <Button type="primary">Primary</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="text">Text</Button>
          <Button type="link">Link</Button>
          <Button type="primary" loading>Loading</Button>
          <Button type="primary" disabled>Disabled</Button>
        </div>
      </div>

      <!-- ================================================================== -->
      <!-- Switch Showcase -->
      <!-- ================================================================== -->
      <div class="p-6 bg-white rounded-lg shadow mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Switch</h2>
        <div class="flex items-center space-x-4">
          <Switch v-model="switchState" />
          <span class="text-gray-600">State: {{ switchState }}</span>
          <Switch :model-value="true" disabled />
          <Switch :model-value="false" disabled />
        </div>
      </div>

      <!-- ================================================================== -->
      <!-- Input Showcase -->
      <!-- ================================================================== -->
      <div class="p-6 bg-white rounded-lg shadow mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Input</h2>
        <div class="w-1/3">
          <Input v-model="inputValue" placeholder="Enter your name" />
          <p class="mt-2 text-gray-600">Value: {{ inputValue }}</p>
        </div>
      </div>

      <!-- ================================================================== -->
      <!-- Modal Showcase -->
      <!-- ================================================================== -->
      <div class="p-6 bg-white rounded-lg shadow">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Modal</h2>
        <Button type="primary" @click="openModal">Open Modal</Button>
        <Modal v-model="isModalOpen" title="This is a Modal">
          <p>This is the content of the modal. You can put any content here.</p>
          <template #footer>
            <Button @click="isModalOpen = false">Cancel</Button>
            <Button type="primary" @click="isModalOpen = false">Confirm</Button>
          </template>
        </Modal>
      </div>

    </div>
  </div>
</template>
