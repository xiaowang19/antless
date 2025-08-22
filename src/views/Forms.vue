<script setup lang="ts">
import { ref, reactive } from 'vue';
import Switch from '../components/Switch/Switch.vue';
import Input from '../components/Input/Input.vue';
import Checkbox from '../components/Checkbox/Checkbox.vue';
import Radio from '../components/Radio/Radio.vue';
import Select from '../components/Select/Select.vue';
import Form from '../components/Form/Form.vue';
import FormItem from '../components/Form/FormItem.vue';
import Button from '../components/Button/Button.vue';
import type { FormRules } from 'async-validator';

// State for non-form components
const switchState = ref(false);
const radioState = ref('A');
const inputValue = ref('');
const checkboxState = ref(false);
const selectOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
];
const selectedOption = ref(selectOptions[1]); // A different default for this standalone select

// State for the Form
const formRef = ref<InstanceType<typeof Form> | null>(null);
const formData = reactive({
  username: '',
  fruit: null,
  agree: false,
});

const formRules: FormRules = {
  username: [{ required: true, message: 'Username is required' }],
  fruit: [{ required: true, message: 'Please select a fruit' }],
  agree: [{ type: 'enum', enum: [true], message: 'You must agree to the terms' }],
};

const handleSubmit = () => {
  formRef.value?.validate().then((valid) => {
    if (valid) {
      alert('Form submitted successfully!');
    } else {
      alert('Validation failed!');
    }
  });
};
</script>

<template>
  <div class="space-y-8">
    <!-- ================================================================== -->
    <!-- Input Showcase -->
    <!-- ================================================================== -->
    <div class="p-6 bg-white rounded-lg shadow">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Input</h2>
      <div class="w-1/3">
        <Input v-model="inputValue" placeholder="Enter your name" />
        <p class="mt-2 text-gray-600">Value: {{ inputValue }}</p>
      </div>
    </div>

    <!-- ================================================================== -->
    <!-- Switch Showcase -->
    <!-- ================================================================== -->
    <div class="p-6 bg-white rounded-lg shadow">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Switch</h2>
      <div class="flex items-center space-x-4">
        <Switch v-model="switchState" />
        <span class="text-gray-600">State: {{ switchState }}</span>
        <Switch :model-value="true" disabled />
        <Switch :model-value="false" disabled />
      </div>
    </div>

    <!-- ================================================================== -->
    <!-- Checkbox & Radio Showcase -->
    <!-- ================================================================== -->
    <div class="p-6 bg-white rounded-lg shadow">
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
    <!-- Select Showcase -->
    <!-- ================================================================== -->
    <div class="p-6 bg-white rounded-lg shadow">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Select</h2>
      <div class="w-1/3">
        <Select v-model="selectedOption" :options="selectOptions" />
        <p class="mt-2 text-gray-600">Selected: {{ selectedOption }}</p>
      </div>
    </div>

    <!-- ================================================================== -->
    <!-- Form Showcase -->
    <!-- ================================================================== -->
    <div class="p-6 bg-white rounded-lg shadow">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Form</h2>
      <Form :model="formData" :rules="formRules" ref="formRef" class="w-1/2">
        <FormItem label="Username" prop="username">
          <Input v-model="formData.username" placeholder="Enter username" />
        </FormItem>
        <FormItem label="Favorite Fruit" prop="fruit">
          <Select v-model="formData.fruit" :options="selectOptions" placeholder="Select a fruit" />
        </FormItem>
        <FormItem label="Agreement" prop="agree">
          <Checkbox v-model="formData.agree">I agree to the terms and conditions</Checkbox>
        </FormItem>
        <FormItem label="">
          <Button type="primary" @click="handleSubmit">Submit</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
