<script setup lang="ts">
import { ref } from 'vue';
import Table from '../components/Table/Table.vue';

const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a: any, b: any) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    filters: [
      { text: 'London', value: 'London' },
      { text: 'New York', value: 'New York' },
    ],
    onFilter: (value: string, record: any) => record.address.includes(value),
  },
]);

// Generate a larger dataset
const data = ref(
  Array.from({ length: 45 }, (_, i) => ({
    key: `${i + 1}`,
    name: `User Name ${i + 1}`,
    age: Math.floor(Math.random() * 40) + 20, // Age between 20 and 60
    address: `London No. ${i + 1} Lake Park`,
  }))
);
</script>

<template>
  <div class="space-y-8">
    <!-- ================================================================== -->
    <!-- Table Showcase -->
    <!-- ================================================================== -->
    <div class="p-6 bg-white rounded-lg shadow">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Table with Pagination & Sorting</h2>
      <Table :columns="columns" :data="data" :pagination="true" />
    </div>
  </div>
</template>
