<script setup lang="ts">
import { computed } from 'vue';

// --- Component Props ---
interface Props {
  current?: number;
  pageSize?: number;
  total: number;
}

const props = withDefaults(defineProps<Props>(), {
  current: 1,
  pageSize: 10,
});

// --- Component Emits ---
const emit = defineEmits<{
  (e: 'change', page: number, pageSize: number): void;
}>();

// --- Core Logic ---
const totalPages = computed(() => Math.ceil(props.total / props.pageSize));

const pages = computed(() => {
  const pageCount = totalPages.value;
  const currentPage = props.current;
  const pageBufferSize = 2;

  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const pagesToShow: (number | string)[] = [1];
  let left = Math.max(2, currentPage - pageBufferSize);
  let right = Math.min(pageCount - 1, currentPage + pageBufferSize);

  if (currentPage - pageBufferSize > 2) {
    pagesToShow.push('...');
  }
  for (let i = left; i <= right; i++) {
    pagesToShow.push(i);
  }
  if (currentPage + pageBufferSize < pageCount - 1) {
    pagesToShow.push('...');
  }
  pagesToShow.push(pageCount);

  return pagesToShow;
});

const handleChange = (page: number) => {
  if (page < 1 || page > totalPages.value || page === props.current) {
    return;
  }
  emit('change', page, props.pageSize);
};
</script>

<template>
  <ul class="ui-pagination">
    <!-- Previous Button -->
    <li
      class="ui-pagination-item ui-pagination-prev"
      :class="{ 'is-disabled': current <= 1 }"
      @click="handleChange(current - 1)"
    >
      <a>&lt;</a>
    </li>

    <!-- Page Numbers -->
    <li
      v-for="(page, index) in pages"
      :key="`${page}-${index}`"
      class="ui-pagination-item"
      :class="{
        'is-active': page === current,
        'is-ellipsis': typeof page === 'string',
      }"
      @click="typeof page === 'number' && handleChange(page)"
    >
      <a v-if="typeof page === 'number'">{{ page }}</a>
      <span v-else>...</span>
    </li>

    <!-- Next Button -->
    <li
      class="ui-pagination-item ui-pagination-next"
      :class="{ 'is-disabled': current >= totalPages }"
      @click="handleChange(current + 1)"
    >
      <a>&gt;</a>
    </li>
  </ul>
</template>
