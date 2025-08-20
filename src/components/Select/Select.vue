<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';

// Define model for v-model
const model = defineModel<any>();

// Define Component Props
interface Option {
  value: any;
  label: string;
}
interface Props {
  options: Option[];
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
});

</script>

<template>
  <Listbox v-model="model" as="div" class="ui-select">
    <div class="relative">
      <ListboxButton class="ui-select__button">
        <span class="block truncate">{{ model?.label || placeholder }}</span>
        <span class="ui-select__arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-5 w-5"><path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.24a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd"></path></svg>
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions class="ui-select__options">
          <ListboxOption
            v-for="option in options"
            :key="option.value"
            :value="option"
            as="template"
            v-slot="{ active, selected }"
          >
            <li :class="['ui-select__option', { 'is-active': active, 'is-selected': selected }]">
              <span class="block truncate">{{ option.label }}</span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
