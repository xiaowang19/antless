<script setup lang="ts">
import { computed } from 'vue';

// Define model for v-model
const model = defineModel<string>();

// Define Component Props
interface Props {
  size?: 'large' | 'middle' | 'small';
  disabled?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'middle',
  disabled: false,
  placeholder: 'Please enter text',
});

// Compute CSS classes based on props
const inputClasses = computed(() => [
  'ui-input',
  `ui-input--${props.size}`,
  {
    'is-disabled': props.disabled,
  },
]);
</script>

<template>
  <input
    v-model="model"
    :class="inputClasses"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    type="text"
  />
</template>
