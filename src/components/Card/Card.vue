<script setup lang="ts">
import { computed } from 'vue';

// Define Component Props
interface Props {
  title?: string;
  size?: 'default' | 'small';
  bordered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  bordered: true,
});

// Compute CSS classes based on props
const cardClasses = computed(() => [
  'ui-card',
  `ui-card--${props.size}`,
  {
    'is-bordered': props.bordered,
  },
]);
</script>

<template>
  <div :class="cardClasses">
    <div v-if="title || $slots.extra" class="ui-card__header">
      <div v-if="title" class="ui-card__title">{{ title }}</div>
      <div v-if="$slots.extra" class="ui-card__extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <div class="ui-card__body">
      <slot></slot>
    </div>
  </div>
</template>
