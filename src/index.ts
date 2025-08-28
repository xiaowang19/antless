// Export all components from a single entry point

import Alert from './components/Alert/Alert.vue';
import Button from './components/Button/Button.vue';
import Card from './components/Card/Card.vue';
import Checkbox from './components/Checkbox/Checkbox.vue';
import Dropdown from './components/Dropdown/Dropdown.vue';
import Form from './components/Form/Form.vue';
import FormItem from './components/Form/FormItem.vue';
import Input from './components/Input/Input.vue';
import Modal from './components/Modal/Modal.vue';
import Pagination from './components/Pagination/Pagination.vue';
import Radio from './components/Radio/Radio.vue';
import Select from './components/Select/Select.vue';
import Switch from './components/Switch/Switch.vue';
import Table from './components/Table/Table.vue';
import Tabs from './components/Tabs/Tabs.vue';
import Tag from './components/Tag/Tag.vue';
import Tooltip from './components/Tooltip/Tooltip.vue';

export {
  Alert,
  Button,
  Card,
  Checkbox,
  Dropdown,
  Form,
  FormItem,
  Input,
  Modal,
  Pagination,
  Radio,
  Select,
  Switch,
  Table,
  Tabs,
  Tag,
  Tooltip,
};

// We can also export our theme CSS if users want to import it directly
import './styles/index.css';
