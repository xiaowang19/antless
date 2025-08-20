<script setup lang="ts">
import { computed } from 'vue';

// Define model for v-model
const model = defineModel<any>();

// Define Component Props
interface Props {
  disabled?: boolean;
  value: any; // The value this radio button represents
  name?: string; // The name for the radio group
}

const props = defineProps<Props>();

// Check if this radio is the one currently selected
const isChecked = computed(() => model.value === props.value);

// Compute CSS classes based on props
const wrapperClasses = computed(() => [
  'ui-radio-wrapper',
  {
    'is-checked': isChecked.value,
    'is-disabled': props.disabled,
  },
]);
</script>

<template>
  <label :class="wrapperClasses">
    <span class="ui-radio">
      <input
        type="radio"
        :checked="isChecked"
        :value="value"
        :name="name"
        @change="model = value"
        :disabled="disabled"
        class="ui-radio__input"
      />
      <span class="ui-radio__inner"></span>
    </span>
    <span v-if="$slots.default" class="ui-radio__label">
      <slot></slot>
    </span>
  </label>
</template>
