<script setup lang="ts">
import { inject, computed, type Ref } from 'vue';

// Define Component Props
interface Props {
  label?: string;
}

const props = defineProps<Props>();

// Inject layout from parent Form component
const formLayout = inject<Ref<'horizontal' | 'vertical'>>('formLayout');

// Compute CSS classes based on props and injected layout
const formItemClasses = computed(() => [
  'ui-form-item',
  `ui-form-item--${formLayout?.value || 'horizontal'}`,
]);
</script>

<template>
  <div :class="formItemClasses">
    <label v-if="label" class="ui-form-item__label">
      {{ label }}
    </label>
    <div class="ui-form-item__control">
      <slot></slot>
    </div>
  </div>
</template>
