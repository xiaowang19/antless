<script setup lang="ts">
import { ref, computed } from 'vue';

// Define Component Props
interface Props {
  type?: 'success' | 'info' | 'warning' | 'error';
  message: string;
  description?: string;
  closable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  closable: false,
});

// Local state to handle visibility
const visible = ref(true);

function handleClose() {
  visible.value = false;
}

// Compute CSS classes based on props
const alertClasses = computed(() => [
  'ui-alert',
  `ui-alert--${props.type}`,
  {
    'has-description': !!props.description,
  },
]);

// A simple map for icons. In a real project, we'd use an icon library.
const iconMap = {
  success: '✓',
  info: 'i',
  warning: '!',
  error: '×',
}
</script>

<template>
  <div v-if="visible" :class="alertClasses" role="alert">
    <span class="ui-alert__icon">{{ iconMap[type] }}</span>
    <div class="ui-alert__content">
      <div class="ui-alert__message">{{ message }}</div>
      <div v-if="description" class="ui-alert__description">{{ description }}</div>
    </div>
    <button v-if="closable" @click="handleClose" class="ui-alert__close-button">
      ×
    </button>
  </div>
</template>
