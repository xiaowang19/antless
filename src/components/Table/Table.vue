<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import Pagination from '../Pagination/Pagination.vue';
import Checkbox from '../Checkbox/Checkbox.vue';
import Button from '../Button/Button.vue';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';


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
const tempFilters = reactive<Record<string, any[]>>({});

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
  alert(`Filtering by key: "${key}" with values: [${values.join(', ')}]`);
  currentPage.value = 1;
  activeFilters[key] = values;
};

const openFilterMenu = (key: string) => {
  // When opening, sync temp state with active state
  tempFilters[key] = activeFilters[key] ? [...activeFilters[key]] : [];
};

const confirmFilter = (key: string, close: () => void) => {
  handleFilterChange(key, tempFilters[key]);
  close();
};

const resetFilter = (key: string, close: () => void) => {
  tempFilters[key] = [];
  handleFilterChange(key, []);
  close();
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
              <Menu as="div" class="ui-dropdown" v-if="column.filters" v-slot="{ close }">
                <MenuButton as="template" @click="openFilterMenu(column.key)">
                  <span class="ui-table__filter-trigger" :class="{'is-active': activeFilters[column.key]?.length > 0}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0110 18v-5.963a2.25 2.25 0 00-.659-1.59L4.659 5.78a2.25 2.25 0 01-.659-1.59V2.34a.75.75 0 01.628-.74z"></path></svg>
                  </span>
                </MenuButton>
                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems class="ui-table__filter-menu" static>
                    <div class="px-1 py-1 space-y-1">
                      <MenuItem v-for="filter in column.filters" :key="filter.value" as="template">
                        <label class="ui-dropdown-item flex items-center space-x-2">
                          <input
                            type="checkbox"
                            :value="filter.value"
                            v-model="tempFilters[column.key]"
                            class="ui-checkbox__input--hidden"
                          />
                          <span>{{ filter.text }}</span>
                        </label>
                      </MenuItem>
                    </div>
                    <div class="ui-table__filter-footer">
                      <Button type="link" size="small" @click="resetFilter(column.key, close)">Reset</Button>
                      <Button type="primary" size="small" @click="confirmFilter(column.key, close)">OK</Button>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
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
