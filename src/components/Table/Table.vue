<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import Pagination from '../Pagination/Pagination.vue';

// --- Type Definitions for Props ---
interface Filter {
  text: string;
  value: any;
}
interface Column {
  title: string;
  dataIndex: string;
  key: string;
  sorter?: (a: DataRecord, b: DataRecord) => number;
  filters?: Filter[];
  onFilter?: (value: any, record: DataRecord) => boolean;
}

interface DataRecord {
  [key: string]: any;
}

// --- Component Props ---
interface Props {
  columns: Column[];
  data: DataRecord[];
  pagination?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  pagination: false,
});

// --- State Management ---
const sortKey = ref<string | null>(null);
const sortOrder = ref<'ascend' | 'descend' | null>(null);
const currentPage = ref(1);
const pageSize = ref(10);
const activeFilters = reactive<Record<string, any[]>>({});

// --- Event Handlers ---
const handleSort = (key: string) => {
  currentPage.value = 1;
  if (sortKey.value === key) {
    if (sortOrder.value === 'ascend') {
      sortOrder.value = 'descend';
    } else if (sortOrder.value === 'descend') {
      sortOrder.value = null;
      sortKey.value = null;
    }
  } else {
    sortKey.value = key;
    sortOrder.value = 'ascend';
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const handleFilterChange = (key: string, values: any[]) => {
  currentPage.value = 1;
  activeFilters[key] = values;
};


// --- Computed Properties ---
const tableClasses = computed(() => ['ui-table']);

const filteredData = computed(() => {
  let processed = [...props.data];
  const filterKeys = Object.keys(activeFilters).filter(key => activeFilters[key]?.length > 0);

  if (filterKeys.length > 0) {
    processed = processed.filter(record => {
      return filterKeys.every(key => {
        const column = props.columns.find(c => c.key === key);
        if (!column || !column.onFilter) return true;
        return activeFilters[key].some(value => column.onFilter!(value, record));
      });
    });
  }
  return processed;
});

const processedData = computed(() => {
  let processed = [...filteredData.value];

  // 2. Sorting
  if (sortKey.value && sortOrder.value) {
    const sorter = props.columns.find(c => c.key === sortKey.value)?.sorter;
    if (sorter) {
      processed.sort((a, b) => {
        const result = sorter(a, b);
        return sortOrder.value === 'ascend' ? result : -result;
      });
    }
  }

  // 3. Pagination
  if (props.pagination) {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    // We need the total count *before* slicing for the pagination component
    // This will be addressed when integrating UI. For now, this is fine.
    processed = processed.slice(start, end);
  }

  return processed;
});

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
              <!-- Placeholder for filter icon -->
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in processedData" :key="record.key || index">
          <td v-for="column in columns" :key="column.key">
            {{ record[column.dataIndex] }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="pagination" class="ui-table__pagination">
      <Pagination
        :current="currentPage"
        :page-size="pageSize"
        :total="filteredData.length"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>
