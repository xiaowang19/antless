<script setup lang="ts">
import { ref } from 'vue';
import Alert from '../components/Alert/Alert.vue';
import Modal from '../components/Modal/Modal.vue';
import Button from '../components/Button/Button.vue';
import Tooltip from '../components/Tooltip/Tooltip.vue';

const isModalOpen = ref(false);

function openModal() {
  isModalOpen.value = true;
}
</script>

<template>
  <div class="space-y-8">
    <!-- ================================================================== -->
    <!-- Alert Showcase -->
    <!-- ================================================================== -->
    <div class="p-6 bg-white rounded-lg shadow space-y-4">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Alert</h2>
      <Alert message="Info Text" type="info" description="This is a detailed description." closable />
      <Alert message="Success Text" type="success" />
      <Alert message="Warning Text" type="warning" />
      <Alert message="Error Text" type="error" closable />
    </div>

    <!-- ================================================================== -->
    <!-- Modal Showcase -->
    <!-- ================================================================== -->
    <div class="p-6 bg-white rounded-lg shadow">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Modal</h2>
      <Button type="primary" @click="openModal">Open Modal</Button>
      <Modal v-model="isModalOpen" title="This is a Modal">
        <p>This is the content of the modal. You can put any content here.</p>
        <template #footer>
          <Button @click="isModalOpen = false">Cancel</Button>
          <Button type="primary" @click="isModalOpen = false">Confirm</Button>
        </template>
      </Modal>
    </div>

    <!-- ================================================================== -->
    <!-- Tooltip Showcase -->
    <!-- ================================================================== -->
    <div class="p-6 bg-white rounded-lg shadow">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Tooltip</h2>
      <div class="flex items-center space-x-4">
        <Tooltip title="This is a tooltip">
          <Button>Hover Me</Button>
        </Tooltip>
        <Tooltip title="Tooltip on bottom" placement="bottom">
          <Button>Bottom</Button>
        </Tooltip>
      </div>
    </div>
  </div>
</template>
