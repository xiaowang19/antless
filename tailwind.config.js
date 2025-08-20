/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ant-primary': '#1677ff',
        'ant-primary-hover': '#4096ff',
        'ant-primary-active': '#0958d9', // Corrected name
        'ant-border': '#d9d9d9',
        'ant-text': 'rgba(0,0,0,0.88)',
        'ant-text-secondary': 'rgba(0,0,0,0.65)',
        'ant-disabled': 'rgba(0,0,0,0.25)',
        'ant-bg-disabled': 'rgba(0,0,0,0.04)',
        'ant-bg-layout': '#f5f5f5',

        // Preset Tag Colors (approximations of Ant Design's palette)
        'ant-blue-bg': '#e6f7ff',
        'ant-blue-text': '#1677ff',
        'ant-green-bg': '#f6ffed',
        'ant-green-text': '#52c41a',
        'ant-red-bg': '#fff1f0',
        'ant-red-text': '#f5222d',
        'ant-orange-bg': '#fff7e6',
        'ant-orange-text': '#fa8c16',
        'ant-gold-bg': '#fffbe6',
        'ant-gold-text': '#faad14',
        'ant-purple-bg': '#f9f0ff',
        'ant-purple-text': '#722ed1',
      },
      borderRadius: {
        'ant-sm': '4px',
        'ant-base': '6px',
        'ant-lg': '8px',
      },
      fontSize: {
        'ant-sm': '12px', // Tags are smaller
        'ant-base': '14px',
        'ant-lg': '16px',
      }
    },
  },
  plugins: [],
}
