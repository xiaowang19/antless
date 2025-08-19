<script setup lang="ts">
import { provide, computed, reactive, ref } from 'vue';
import type { FormRules, FormValidateError } from 'async-validator';

// Define Component Props
interface Props {
  layout?: 'horizontal' | 'vertical';
  model?: Record<string, any>;
  rules?: FormRules;
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'horizontal',
});

// Provide layout to child FormItem components
provide('formLayout', props.layout);

// --- Validation Logic ---
interface FormState {
  [key: string]: {
    error: string;
    isValidating: boolean;
  }
}
const formState = reactive<FormState>({});

const validate = async () => {
  if (!props.model || !props.rules) return true;

  try {
    await new (await import('async-validator')).default(props.rules).validate(props.model);
    // Clear all errors
    Object.keys(formState).forEach(key => {
      formState[key].error = '';
    });
    return true;
  } catch (e) {
    const errors = e as { errors: FormValidateError[], fields: Record<string, FormValidateError[]> };
    // Clear all previous errors first
    Object.keys(formState).forEach(key => {
      formState[key].error = '';
    });
    // Set new errors
    Object.keys(errors.fields).forEach(key => {
      if (errors.fields[key].length > 0) {
        formState[key].error = errors.fields[key][0].message || '';
      }
    });
    return false;
  }
};

// Expose the validate method to be called from the parent component
defineExpose({ validate });

// Provide state and methods to FormItem
provide('formContext', {
  model: props.model,
  rules: props.rules,
  formState,
});


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
