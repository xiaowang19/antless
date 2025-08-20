<script setup lang="ts">
import { computed } from 'vue';

// Define Component Props
interface Props {
  // Ant Design has preset colors. We can add more later.
  color?: 'default' | 'blue' | 'green' | 'red' | 'orange' | 'gold' | 'purple';
}

const props = withDefaults(defineProps<Props>(), {
  color: 'default',
});

// Compute CSS classes based on props
const tagClasses = computed(() => [
  'ui-tag',
  `ui-tag--${props.color}`,
]);
</script>

<template>
  <span :class="tagClasses">
    <slot></slot>
  </span>
</template>
