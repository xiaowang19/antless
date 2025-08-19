<script setup lang="ts">
import { ref } from 'vue';
import Button from './components/Button/Button.vue';
import Switch from './components/Switch/Switch.vue';
import Input from './components/Input/Input.vue';
import Modal from './components/Modal/Modal.vue';
import Tag from './components/Tag/Tag.vue';
import Alert from './components/Alert/Alert.vue';
import Checkbox from './components/Checkbox/Checkbox.vue';
import Radio from './components/Radio/Radio.vue';
import Card from './components/Card/Card.vue';
import Dropdown from './components/Dropdown/Dropdown.vue';
import { MenuItem, MenuButton, MenuItems } from '@headlessui/vue';

// State for interactive components
const switchState = ref(false);
const inputValue = ref('');
const isModalOpen = ref(false);
const checkboxState = ref(false);
const radioState = ref('A');

function openModal() {
  isModalOpen.value = true;
}
</script>

<template>
  <div class="theme-ant">
    <div class="p-8 bg-ant-bg-layout min-h-screen font-sans">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Component Showcase</h1>

      <!-- ================================================================== -->
      <!-- Button Showcase -->
      <!-- ================================================================== -->
      <div class="p-6 bg-white rounded-lg shadow mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Button</h2>
        <div class="flex items-center space-x-4">
          <Button>Default</Button>
          <Button type="primary">Primary</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="text">Text</Button>
          <Button type="link">Link</Button>
          <Button type="primary" loading>Loading</Button>
          <Button type="primary" disabled>Disabled</Button>
        </div>
      </div>

      <!-- ================================================================== -->
      <!-- Switch Showcase -->
      <!-- ================================================================== -->
      <div class="p-6 bg-white rounded-lg shadow mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Switch</h2>
        <div class="flex items-center space-x-4">
          <Switch v-model="switchState" />
          <span class="text-gray-600">State: {{ switchState }}</span>
          <Switch :model-value="true" disabled />
          <Switch :model-value="false" disabled />
        </div>
      </div>

      <!-- ================================================================== -->
      <!-- Input Showcase -->
      <!-- ================================================================== -->
      <div class="p-6 bg-white rounded-lg shadow mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Input</h2>
        <div class="w-1/3">
          <Input v-model="inputValue" placeholder="Enter your name" />
          <p class="mt-2 text-gray-600">Value: {{ inputValue }}</p>
        </div>
      </div>

      <!-- ================================================================== -->
      <!-- Modal Showcase -->
      <!-- ================================================================== -->
      <div class="p-6 bg-white rounded-lg shadow mb-8">
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
      <!-- Tag Showcase -->
      <!-- ================================================================== -->
      <div class="p-6 bg-white rounded-lg shadow mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Tag</h2>
        <div class="flex items-center space-x-4">
          <Tag>Default</Tag>
          <Tag color="blue">Blue</Tag>
          <Tag color="green">Green</Tag>
          <Tag color="red">Red</Tag>
          <Tag color="orange">Orange</Tag>
          <Tag color="gold">Gold</Tag>
          <Tag color="purple">Purple</Tag>
        </div>
      </div>

      <!-- ================================================================== -->
      <!-- Alert Showcase -->
      <!-- ================================================================== -->
      <div class="p-6 bg-white rounded-lg shadow mb-8 space-y-4">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Alert</h2>
        <Alert message="Info Text" type="info" description="This is a detailed description." closable />
        <Alert message="Success Text" type="success" />
        <Alert message="Warning Text" type="warning" />
        <Alert message="Error Text" type="error" closable />
      </div>

      <!-- ================================================================== -->
      <!-- Checkbox & Radio Showcase -->
      <!-- ================================================================== -->
      <div class="p-6 bg-white rounded-lg shadow mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Checkbox & Radio</h2>
        <div class="flex space-x-8">
          <div>
            <h3 class="font-medium mb-2">Checkbox</h3>
            <div class="flex flex-col space-y-2">
              <Checkbox v-model="checkboxState">Checkbox</Checkbox>
              <Checkbox :model-value="true" disabled>Disabled Checked</Checkbox>
              <Checkbox :model-value="false" disabled>Disabled Unchecked</Checkbox>
              <span>State: {{ checkboxState }}</span>
            </div>
          </div>
          <div>
            <h3 class="font-medium mb-2">Radio</h3>
            <div class="flex flex-col space-y-2">
              <Radio v-model="radioState" name="demo" value="A">Option A</Radio>
              <Radio v-model="radioState" name="demo" value="B">Option B</Radio>
              <Radio v-model="radioState" name="demo" value="C" disabled>Option C (Disabled)</Radio>
              <span>State: {{ radioState }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ================================================================== -->
      <!-- Card & Dropdown Showcase -->
      <!-- ================================================================== -->
      <div class="p-6 bg-white rounded-lg shadow">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Card & Dropdown</h2>
        <Card title="Card Title" size="small">
          <template #extra>
            <Dropdown>
              <MenuButton as="template">
                <Button type="link">More</Button>
              </MenuButton>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems class="ui-dropdown__menu">
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="['ui-dropdown-item', { 'is-active': active }]">Menu Item 1</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="['ui-dropdown-item', { 'is-active': active }]">Menu Item 2</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Dropdown>
          </template>
          <p>Card content goes here.</p>
        </Card>
      </div>

    </div>
  </div>
</template>
