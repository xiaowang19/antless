<script setup lang="ts">
import { inject, computed, type Ref, onMounted, reactive } from 'vue';
import type { FormRules } from 'async-validator';

// Define Component Props
interface Props {
  label?: string;
  prop?: string;
}

const props = defineProps<Props>();

// --- Inject context from Form ---
const formLayout = inject<Ref<'horizontal' | 'vertical'>>('formLayout');
const formContext = inject<{
  model?: Record<string, any>;
  rules?: FormRules;
  formState: Record<string, { error: string, isValidating: boolean }>;
}>('formContext');

// --- Validation Logic for this item ---
const state = reactive({
  error: '',
  isValidating: false,
});

const validate = async () => {
  const { prop, label } = props;
  const model = formContext?.model;
  const rules = formContext?.rules;

  if (!prop || !model || !rules || !rules[prop]) {
    return true;
  }

  const descriptor = { [prop]: rules[prop] };
  const data = { [prop]: model[prop] };
  state.isValidating = true;

  try {
    await new (await import('async-validator')).default(descriptor).validate(data);
    state.error = '';
    if (formContext?.formState[prop]) {
      formContext.formState[prop].error = '';
    }
  } catch (e: any) {
    const errorMessage = e.errors[0].message || `${label || prop} is invalid`;
    state.error = errorMessage;
    if (formContext?.formState[prop]) {
      formContext.formState[prop].error = errorMessage;
    }
  } finally {
    state.isValidating = false;
  }
};

// Register this FormItem with the parent Form's state
onMounted(() => {
  if (props.prop && formContext) {
    formContext.formState[props.prop] = state;
  }
});

// --- Computed classes ---
const formItemClasses = computed(() => [
  'ui-form-item',
  `ui-form-item--${formLayout?.value || 'horizontal'}`,
  {
    'is-error': !!state.error,
  }
]);
</script>

<template>
  <div :class="formItemClasses">
    <label v-if="label" class="ui-form-item__label">
      {{ label }}
    </label>
    <div class="ui-form-item__control">
      <slot></slot>
      <div v-if="state.error" class="ui-form-item__error">
        {{ state.error }}
      </div>
    </div>
  </div>
</template>
