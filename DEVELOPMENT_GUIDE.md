# 开发说明文档

你好！欢迎使用这个基于 Vue 3, TailwindCSS 和 Headless UI 的可主题化组件库。

本文档旨在帮助你理解项目的结构、如何运行，以及如何在此基础上进行二次开发。

## 1. 项目初始化

本项目是使用 Vite 创建的。如果你需要从零开始重新创建这个项目，可以按照以下步骤操作。

**前提**: 请确保你的电脑上已经安装了 [Node.js](https://nodejs.org/) (推荐 v18+ 或更高版本) 和 npm。

```bash
# 1. 克隆项目仓库 (如果你是从 git 开始)
# git clone <your-repo-url>
# cd <your-repo-name>

# 2. 安装所有依赖项
npm install

# 3. 运行开发服务器
npm run dev
```

当你运行 `npm run dev` 后，你会在终端看到一个本地服务器地址 (通常是 `http://localhost:5173`)。在浏览器中打开它，你就可以看到 `App.vue` 中展示的组件了。

## 2. 项目结构

项目的核心代码都在 `src` 目录下。

```
.
├── src
│   ├── assets/              # 静态资源 (图片, svg 等)
│   ├── components/          # 所有的 UI 组件
│   │   ├── Button/
│   │   │   └── Button.vue
│   │   ├── Input/
│   │   │   └── Input.vue
│   │   ├── Modal/
│   │   │   └── Modal.vue
│   │   └── Switch/
│   │       └── Switch.vue
│   ├── views/               # 组件展示页的分类视图
│   │   ├── General.vue
│   │   ├── Layout.vue
│   │   ├── Feedback.vue
│   │   ├── Forms.vue
│   │   └── DataDisplay.vue
│   ├── styles/              # 全局样式
│   │   └── index.css        # CSS 主入口文件 (包含所有样式)
│   ├── App.vue              # 根组件，应用主布局
│   └── main.ts              # 应用主入口文件
├── tailwind.config.js       # TailwindCSS 配置文件
├── postcss.config.js        # PostCSS 配置文件
└── DEVELOPMENT_GUIDE.md     # 就是你正在看的这份文档
```

## 3. 主题系统是如何工作的

这是本项目的核心设计之一。我们的目标是能够通过切换一个根节点的类名来切换整套组件库的主题。

#### 3.1. 抽象样式类 (ui-*)

在每个组件的 `.vue` 文件中，我们不直接使用像 `bg-blue-500` 这样的原子类。相反，我们使用我们自己定义的、有语义的“抽象类”。例如，`<button class="ui-button ui-button--primary">`。

- **`.ui-button`**: 这是一个基础类。它定义了一个按钮的结构、过渡效果、禁用状态等不随主题变化的样式。
- **`.ui-button--primary`**: 这是一个修饰类。它定义了按钮在某个特定主题下的外观（例如，颜色、边框）。

所有这些样式现在都合并在了 `src/styles/index.css` 文件中。

#### 3.2. 主题定义

所有和“外观”相关的样式都定义在 `index.css` 文件中，并被一个根类名 `.theme-ant` 包裹。

```css
/* src/styles/index.css */

.theme-ant {
  /* 主题下的 primary 按钮样式 */
  .ui-button--primary {
    @apply bg-ant-primary text-white border-ant-primary;
  }

  /* 主题下的 default 按钮样式 */
  .ui-button--default {
    @apply bg-white text-ant-text border-ant-border;
  }
}
```

#### 3.3. 激活主题

我们在 `App.vue` 的最外层 `<div>` 上添加了 `class="theme-ant"`，这样所有被它包裹的、使用了 `ui-*` 类的组件，都会自动应用 Ant Design 的主题样式。

未来如果我们想添加一个 Element Plus 的主题，我们只需要在 `index.css` 中添加一个新的根类 `.theme-element` 和对应的样式即可。

## 4. 如何使用现有组件

我们在 `App.vue` 中展示了所有已实现组件的用法。

#### Button

```vue
<script setup>
import Button from './components/Button/Button.vue';
</script>

<template>
  <Button type="primary">Primary Button</Button>
  <Button>Default Button</Button>
</template>
```

- **Props**:
  - `type`: `'primary' | 'default' | 'dashed' | 'text' | 'link'`
  - `size`: `'large' | 'middle' | 'small'`
  - `loading`: `boolean`
  - `disabled`: `boolean`

#### Switch

```vue
<script setup>
import { ref } from 'vue';
import Switch from './components/Switch/Switch.vue';
const isChecked = ref(false);
</script>

<template>
  <Switch v-model="isChecked" />
</template>
```
- **v-model**: 控制开关的状态 (boolean)。
- **Props**:
  - `disabled`: `boolean`

#### Input

```vue
<script setup>
import { ref } from 'vue';
import Input from './components/Input/Input.vue';
const text = ref('');
</script>

<template>
  <Input v-model="text" placeholder="请输入..." />
</template>
```
- **v-model**: 绑定输入框的值 (string)。
- **Props**:
  - `size`: `'large' | 'middle' | 'small'`
  - `disabled`: `boolean`
  - `placeholder`: `string`

#### Modal

```vue
<script setup>
import { ref } from 'vue';
import Modal from './components/Modal/Modal.vue';
import Button from './components/Button/Button.vue';
const isOpen = ref(false);
</script>

<template>
  <Button @click="isOpen = true">Open Modal</Button>
  <Modal v-model="isOpen" title="Modal Title">
    <p>Modal content goes here.</p>
    <template #footer>
      <Button @click="isOpen = false">Cancel</Button>
      <Button type="primary" @click="isOpen = false">OK</Button>
    </template>
  </Modal>
</template>
```
- **v-model**: 控制模态框的显示与隐藏 (boolean)。
- **Props**:
  - `title`: `string`
- **Slots**:
  - `default`: 模态框主体内容。
  - `footer`: 模态框页脚，可以自定义按钮。

---

### Tag

```vue
<script setup>
import Tag from './components/Tag/Tag.vue';
</script>
<template>
  <Tag color="blue">Blue Tag</Tag>
</template>
```
- **Props**:
  - `color`: `'default' | 'blue' | 'green' | 'red' | 'orange' | 'gold' | 'purple'`

### Alert

```vue
<script setup>
import Alert from './components/Alert/Alert.vue';
</script>
<template>
  <Alert message="Success Text" type="success" closable />
</template>
```
- **Props**:
  - `type`: `'success' | 'info' | 'warning' | 'error'`
  - `message`: `string`
  - `description`: `string` (optional)
  - `closable`: `boolean` (optional)

### Checkbox

```vue
<script setup>
import { ref } from 'vue';
import Checkbox from './components/Checkbox/Checkbox.vue';
const checked = ref(false);
</script>
<template>
  <Checkbox v-model="checked">Checkbox Label</Checkbox>
</template>
```
- **v-model**: 控制多选框的选中状态 (boolean)。
- **Props**:
  - `disabled`: `boolean`

### Radio

```vue
<script setup>
import { ref } from 'vue';
import Radio from './components/Radio/Radio.vue';
const picked = ref('A');
</script>
<template>
  <Radio v-model="picked" value="A" name="group1">Option A</Radio>
  <Radio v-model="picked" value="B" name="group1">Option B</Radio>
</template>
```
- **v-model**: 绑定单选框组的值。
- **Props**:
  - `value`: `any` (当前单选框的值)
  - `name`: `string` (用于将多个 Radio 组合在一起)
  - `disabled`: `boolean`

### Card

```vue
<script setup>
import Card from './components/Card/Card.vue';
</script>
<template>
  <Card title="Card Title" bordered>
    <p>Card content.</p>
  </Card>
</template>
```
- **Props**:
  - `title`: `string`
  - `size`: `'default' | 'small'`
  - `bordered`: `boolean`
- **Slots**:
  - `default`: 卡片主体内容。
  - `extra`: 卡片右上角的额外内容。

### Tooltip

```vue
<script setup>
import Tooltip from './components/Tooltip/Tooltip.vue';
</script>
<template>
  <Tooltip title="Tooltip content">
    <Button>Hover me</Button>
  </Tooltip>
</template>
```
- **Props**:
  - `title`: `string` (提示框内容)
  - `placement`: `'(top|bottom|left|right)(-start|-end)?'` (位置)

### Tabs

```vue
<script setup>
import Tabs from './components/Tabs/Tabs.vue';
import { Tab, TabPanel } from '@headlessui/vue';
const categories = ref([...]); // Your data array
</script>
<template>
  <Tabs>
    <template #list>
      <Tab v-for="cat in categories" as="template" v-slot="{ selected }">
        <button :class="['ui-tab', { 'is-selected': selected }]">{{ cat.title }}</button>
      </Tab>
    </template>
    <template #panels>
      <TabPanel v-for="cat in categories" class="p-4">{{ cat.content }}</TabPanel>
    </template>
  </Tabs>
</template>
```
- **用法**: `Tabs` 组件提供插槽，你需要循环你的数据来生成 `Tab` 和 `TabPanel`。
- **Slots**:
  - `list`: 放置 `Tab` 组件的地方。你需要为 `Tab` 的子元素添加 `ui-tab` 类。
  - `panels`: 放置 `TabPanel` 组件的地方。

### Select

```vue
<script setup>
import { ref } from 'vue';
import Select from './components/Select/Select.vue';
const options = ref([{ label: 'Opt 1', value: 1 }, ...]);
const selected = ref(options.value[0]);
</script>
<template>
  <Select v-model="selected" :options="options" />
</template>
```
- **v-model**: 绑定当前选中的对象。
- **Props**:
  - `options`: `Array<{ label: string, value: any }>` (选项数组)
  - `placeholder`: `string`

### Form

```vue
<script setup>
import { reactive, ref } from 'vue';
import Form from './components/Form/Form.vue';
import FormItem from './components/Form/FormItem.vue';
import Input from './components/Input/Input.vue';

const formRef = ref(null);
const formData = reactive({ username: '' });
const formRules = {
  username: [{ required: true, message: 'Username is required' }]
};

const submitForm = () => {
  formRef.value.validate().then(valid => { ... });
}
</script>
<template>
  <Form :model="formData" :rules="formRules" ref="formRef">
    <FormItem label="Username" prop="username">
      <Input v-model="formData.username" />
    </FormItem>
  </Form>
</template>
```
- **Form Props**:
  - `layout`: `'horizontal' | 'vertical'` (表单布局)
  - `model`: `object` (表单数据对象)
  - `rules`: `object` (表单校验规则，使用 async-validator 格式)
- **FormItem Props**:
  - `label`: `string` (标签文本)
  - `prop`: `string` (对应 `model` 中的字段名)
- **Form Methods**:
  - `validate()`: 调用此方法来校验整个表单，返回一个 Promise。

### Table

```vue
<script setup>
import { ref } from 'vue';
import Table from './components/Table/Table.vue';

const columns = ref([
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
]);
const data = ref([
  { key: '1', name: 'John Doe', age: 32 },
  { key: '2', name: 'Jane Doe', age: 30 },
]);
</script>
<template>
  <Table :columns="columns" :data="data" />
</template>
```
- **Props**:
  - `columns`: `Array<{ title:string, dataIndex: string, key: string, sorter?: function }>` (列定义)
    - `sorter`: 一个函数 `(a, b) => number`，用于定义该列的排序逻辑。
  - `data`: `Array<object>` (表格数据)
  - `pagination`: `boolean` (是否显示分页，默认为 `false`)
- **Note**: The table is now styled and supports client-side sorting and pagination.

### Dropdown

```vue
<script setup>
import Dropdown from './components/Dropdown/Dropdown.vue';
import Button from './components/Button/Button.vue'; // The trigger
import { MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
</script>
<template>
  <Dropdown>
    <MenuButton as="template">
      <Button>Click Me</Button>
    </MenuButton>

    <transition ...>
      <MenuItems class="ui-dropdown__menu">
        <MenuItem v-slot="{ active }">
          <a href="#" :class="['ui-dropdown-item', { 'is-active': active }]">Item 1</a>
        </MenuItem>
      </MenuItems>
    </transition>
  </Dropdown>
</template>
```
- **用法**: `Dropdown` 组件是一个简单的包裹容器。你需要直接在其中使用 Headless UI 的 `MenuButton` 和 `MenuItems` 组件。
  - `MenuButton` 包裹你的触发器（例如我们的 `Button` 组件）。
  - `MenuItems` 包裹你的菜单项。
  - `MenuItem` 包裹每一个具体的菜单项，并为子元素（如 `<a>` 标签）添加 `ui-dropdown-item` 类以获得正确样式。

希望这份文档能帮助你快速上手！
