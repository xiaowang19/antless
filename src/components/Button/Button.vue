<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  inheritAttrs: false,
});

// Define Component Props
interface Props {
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  size?: 'large' | 'middle' | 'small';
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'middle',
  loading: false,
  disabled: false,
});

// Compute CSS classes based on props
const buttonClasses = computed(() => [
  'ui-button',
  `ui-button--${props.type}`,
  `ui-button--${props.size}`,
  {
    'is-loading': props.loading,
    'is-disabled': props.disabled,
  },
]);
</script>

<template>
  <button v-bind="$attrs" :class="buttonClasses" :disabled="disabled || loading">
    <!-- Loading Icon (will be added later) -->
    <span v-if="loading" class="ui-button__loader"></span>
    <span class="ui-button__content">
      <slot></slot>
    </span>
  </button>
</template>
