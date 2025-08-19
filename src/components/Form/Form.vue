<script setup lang="ts">
import { provide, computed } from 'vue';

// Define Component Props
interface Props {
  layout?: 'horizontal' | 'vertical';
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'horizontal',
});

// Provide layout to child FormItem components
provide('formLayout', props.layout);

// Compute CSS classes based on props
const formClasses = computed(() => [
  'ui-form',
  `ui-form--${props.layout}`,
]);
</script>

<template>
  <form :class="formClasses" @submit.prevent>
    <slot></slot>
  </form>
</template>
