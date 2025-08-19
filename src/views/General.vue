<script setup lang="ts">
import Button from '../components/Button/Button.vue';
import Tag from '../components/Tag/Tag.vue';
</script>

<template>
  <div class="space-y-8">
    <!-- ================================================================== -->
    <!-- Button Showcase -->
    <!-- ================================================================== -->
    <div class="p-6 bg-white rounded-lg shadow">
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
    <!-- Tag Showcase -->
    <!-- ================================================================== -->
    <div class="p-6 bg-white rounded-lg shadow">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Tag</h2>
      <div class="flex items-center space-x-4">
        <Tag>Default</Tag>
        <Tag color="blue">Blue</Tag>
        <Tag color="green">Green</Tag>
        <Tag color="red">Red</Tag>
        <Tag color="orange">Orange</Tag>
        <Tag color="gold">Gold</Tag>
        <Tag color="purple">Purple</Tag>
      </div>
    </div>
  </div>
</template>
