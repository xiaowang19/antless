<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';

// No specific props needed for this basic version,
// as functionality is controlled by slots.

</script>

<template>
  <Menu as="div" class="ui-dropdown">
    <MenuButton as="template">
      <!-- The trigger element is passed in via a slot -->
      <slot name="trigger"></slot>
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
        <!-- The menu items are passed in via the default slot -->
        <!-- We expect the user to wrap them in a container if needed -->
        <slot></slot>
      </MenuItems>
    </transition>
  </Menu>
</template>
