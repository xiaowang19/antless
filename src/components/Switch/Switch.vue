<script setup lang="ts">
import { computed } from 'vue';
import { Switch } from '@headlessui/vue';

// Define model for v-model
const model = defineModel<boolean>();

// Define Component Props
interface Props {
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

// Compute CSS classes based on state
const switchClasses = computed(() => [
  'ui-switch',
  {
    'is-active': model.value,
    'is-disabled': props.disabled,
  },
]);
</script>

<template>
  <Switch v-model="model" :class="switchClasses" :disabled="props.disabled">
    <span class="ui-switch__slider"></span>
  </Switch>
</template>
