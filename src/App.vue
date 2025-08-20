<script setup lang="ts">
import { ref, shallowRef, markRaw } from 'vue';

import General from './views/General.vue';
import Layout from './views/Layout.vue';
import Feedback from './views/Feedback.vue';
import Forms from './views/Forms.vue';
import Navigation from './views/Navigation.vue';
import DataDisplay from './views/DataDisplay.vue';

const views = {
  General: markRaw(General),
  Layout: markRaw(Layout),
  Feedback: markRaw(Feedback),
  Forms: markRaw(Forms),
  Navigation: markRaw(Navigation),
  DataDisplay: markRaw(DataDisplay),
};

const activeView = shallowRef(views.General);
</script>

<template>
  <div class="theme-ant">
    <div class="flex h-screen bg-ant-bg-layout font-sans">
      <!-- Sidebar -->
      <aside class="w-56 flex-shrink-0 bg-white border-r border-ant-border">
        <div class="p-4">
          <h1 class="text-xl font-bold text-gray-800">AntLess UI</h1>
        </div>
        <nav class="p-2 space-y-1">
          <a
            href="#"
            v-for="(view, name) in views"
            :key="name"
            @click.prevent="activeView = view"
            class="block px-4 py-2 rounded-md text-sm font-medium"
            :class="{
              'bg-ant-blue-bg text-ant-primary': activeView === view,
              'text-ant-text hover:bg-gray-100': activeView !== view,
            }"
          >
            {{ name }}
          </a>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto p-8">
        <component :is="activeView" />
      </main>
    </div>
  </div>
</template>
