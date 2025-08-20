<script setup lang="ts">
import { computed, ref } from 'vue';

// --- Type Definitions for Props ---
interface Column {
  title: string;
  dataIndex: string;
  key: string;
  sorter?: (a: DataRecord, b: DataRecord) => number;
}

interface DataRecord {
  [key: string]: any;
}

// --- Component Props ---
interface Props {
  columns: Column[];
  data: DataRecord[];
}

const props = defineProps<Props>();

// --- Sorting State ---
const sortKey = ref<string | null>(null);
const sortOrder = ref<'ascend' | 'descend' | null>(null);

// --- Sorting Logic ---
const sortedData = computed(() => {
  if (!sortKey.value || !sortOrder.value) {
    return props.data;
  }

  const sorter = props.columns.find(c => c.key === sortKey.value)?.sorter;
  if (!sorter) {
    return props.data;
  }

  // Create a new array to avoid mutating the prop
  const dataCopy = [...props.data];

  dataCopy.sort((a, b) => {
    const result = sorter(a, b);
    return sortOrder.value === 'ascend' ? result : -result;
  });

  return dataCopy;
});

const handleSort = (key: string) => {
  if (sortKey.value === key) {
    // Cycle through states: ascend -> descend -> null
    if (sortOrder.value === 'ascend') {
      sortOrder.value = 'descend';
    } else if (sortOrder.value === 'descend') {
      sortOrder.value = null;
      sortKey.value = null;
    }
  } else {
    // Start with ascend on new column
    sortKey.value = key;
    sortOrder.value = 'ascend';
  }
};


// --- Computed Properties ---
const tableClasses = computed(() => ['ui-table']);

</script>

<template>
  <div :class="tableClasses">
    <table>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            @click="column.sorter && handleSort(column.key)"
            :class="{ 'is-sortable': column.sorter }"
          >
            <div class="flex items-center">
              <span>{{ column.title }}</span>
              <span v-if="column.sorter" class="ui-table__sorter">
                <span
                  class="ui-table__sorter-up"
                  :class="{ 'is-active': sortKey === column.key && sortOrder === 'ascend' }"
                >▲</span>
                <span
                  class="ui-table__sorter-down"
                  :class="{ 'is-active': sortKey === column.key && sortOrder === 'descend' }"
                >▼</span>
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in sortedData" :key="record.key || index">
          <td v-for="column in columns" :key="column.key">
            {{ record[column.dataIndex] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
