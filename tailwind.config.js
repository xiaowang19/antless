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
        'ant-g-primary-active': '#0958d9',
        'ant-border': '#d9d9d9',
        'ant-text': 'rgba(0,0,0,0.88)',
        'ant-text-secondary': 'rgba(0,0,0,0.65)',
        'ant-disabled': 'rgba(0,0,0,0.25)',
        'ant-bg-disabled': 'rgba(0,0,0,0.04)',
        'ant-bg-layout': '#f5f5f5',
      },
      borderRadius: {
        'ant-sm': '4px',
        'ant-base': '6px',
        'ant-lg': '8px',
      },
      fontSize: {
        'ant-sm': '14px',
        'ant-base': '14px',
        'ant-lg': '16px',
      }
    },
  },
  plugins: [],
}
