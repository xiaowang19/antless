<script setup lang="ts">
import { Menu } from '@headlessui/vue';

// This component now acts as a simple wrapper for the Menu context.
// The user will provide MenuButton and MenuItems directly.

</script>

<template>
  <Menu as="div" class="ui-dropdown">
    <!-- Default slot for user to place MenuButton and MenuItems -->
    <slot></slot>
  </Menu>
</template>
