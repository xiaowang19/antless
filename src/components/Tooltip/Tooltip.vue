<script setup lang="ts">
import { ref } from 'vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { createPopper, Placement } from '@popperjs/core';

// Define Component Props
interface Props {
  title: string;
  placement?: Placement;
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'top',
});

const triggerRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);

function setupPopper() {
  if (triggerRef.value && panelRef.value) {
    createPopper(triggerRef.value, panelRef.value, {
      placement: props.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8], // 8px offset from the trigger
          },
        },
      ],
    });
  }
}

// A helper to get the underlying DOM element from a Vue ref
function setTriggerRef(el: any) {
  triggerRef.value = el?.$el || el;
  setupPopper();
}
function setPanelRef(el: any) {
  panelRef.value = el?.$el || el;
  setupPopper();
}

</script>

<template>
  <Popover class="ui-tooltip-wrapper">
    <PopoverButton :ref="setTriggerRef" as="span">
      <slot></slot>
    </PopoverButton>
    <PopoverPanel :ref="setPanelRef" class="ui-tooltip">
      <div class="ui-tooltip__arrow" data-popper-arrow></div>
      <div class="ui-tooltip__content">
        {{ title }}
      </div>
    </PopoverPanel>
  </Popover>
</template>
