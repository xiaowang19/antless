<script setup lang="ts">
import Card from '../components/Card/Card.vue';
import Dropdown from '../components/Dropdown/Dropdown.vue';
import Button from '../components/Button/Button.vue';
import { MenuItem, MenuButton, MenuItems } from '@headlessui/vue';
</script>

<template>
  <div class="space-y-8">
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
</template>
