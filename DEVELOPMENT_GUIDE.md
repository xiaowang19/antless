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
│   ├── styles/              # 全局样式
│   │   └── index.css        # CSS 主入口文件 (包含所有样式)
│   ├── App.vue              # 根组件，也是我们的组件展示页
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

希望这份文档能帮助你快速上手！
