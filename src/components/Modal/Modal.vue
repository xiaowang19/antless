<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';

// Define model for v-model on visibility
const open = defineModel<boolean>();

// Define Component Props
interface Props {
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
});

function closeModal() {
  if (open.value) {
    open.value = false;
  }
}
</script>

<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog @close="closeModal" class="ui-modal">
      <!-- Modal Overlay -->
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="ui-modal__overlay" />
      </TransitionChild>

      <div class="ui-modal__container">
        <div class="ui-modal__panel-container">
          <!-- Modal Panel -->
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="ui-modal__panel">
              <DialogTitle as="h3" class="ui-modal__title" v-if="title">
                {{ title }}
              </DialogTitle>

              <div class="ui-modal__body">
                <slot></slot>
              </div>

              <div class="ui-modal__footer">
                <slot name="footer">
                  <!-- Default footer can be a close button -->
                  <!-- For this example, we will let user provide buttons -->
                </slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
