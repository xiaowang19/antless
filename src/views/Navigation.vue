<script setup lang="ts">
import { ref } from 'vue';
import Tabs from '../components/Tabs/Tabs.vue';
import { Tab, TabPanel } from '@headlessui/vue';

const categories = ref([
  { id: 1, title: 'Tab 1', content: 'Content for Tab 1' },
  { id: 2, title: 'Tab 2', content: 'Content for Tab 2' },
  { id: 3, title: 'Tab 3', content: 'Content for Tab 3' },
]);
</script>

<template>
  <div class="space-y-8">
    <!-- ================================================================== -->
    <!-- Tabs Showcase -->
    <!-- ================================================================== -->
    <div class="p-6 bg-white rounded-lg shadow">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Tabs</h2>
      <Tabs>
        <template #list>
          <Tab v-for="category in categories" :key="category.id" as="template" v-slot="{ selected }">
            <button :class="['ui-tab', { 'is-selected': selected }]">
              {{ category.title }}
            </button>
          </Tab>
        </template>
        <template #panels>
          <TabPanel v-for="category in categories" :key="category.id" class="p-4">
            {{ category.content }}
          </TabPanel>
        </template>
      </Tabs>
    </div>
  </div>
</template>
