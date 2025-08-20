<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

// This component will be a simple styled wrapper around Headless UI's Tab components.
// The user will be responsible for providing the tab titles and panel content.
// We expect the user to loop over their data and generate Tabs and TabPanels.

</script>

<template>
  <TabGroup as="div" class="ui-tabs">
    <TabList class="ui-tabs__list">
      <slot name="list"></slot>
    </TabList>
    <TabPanels class="ui-tabs__panels">
      <slot name="panels"></slot>
    </TabPanels>
  </TabGroup>
</template>
