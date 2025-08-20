<script setup lang="ts">
import { computed } from 'vue';

// --- Type Definitions for Props ---
interface Column {
  title: string;
  dataIndex: string;
  key: string;
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

// --- Computed Properties ---
const tableClasses = computed(() => ['ui-table']);

</script>

<template>
  <div :class="tableClasses">
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in data" :key="record.key || index">
          <td v-for="column in columns" :key="column.key">
            {{ record[column.dataIndex] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
