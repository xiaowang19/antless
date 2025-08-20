<script setup lang="ts">
import { computed } from 'vue';

// Define model for v-model
const model = defineModel<boolean>();

// Define Component Props
interface Props {
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

// Compute CSS classes based on props
const wrapperClasses = computed(() => [
  'ui-checkbox-wrapper',
  {
    'is-checked': model.value,
    'is-disabled': props.disabled,
  },
]);
</script>

<template>
  <label :class="wrapperClasses">
    <span class="ui-checkbox">
      <input
        type="checkbox"
        :checked="model"
        @change="model = ($event.target as HTMLInputElement).checked"
        :disabled="disabled"
        class="ui-checkbox__input"
      />
      <span class="ui-checkbox__inner"></span>
    </span>
    <span v-if="$slots.default" class="ui-checkbox__label">
      <slot></slot>
    </span>
  </label>
</template>
