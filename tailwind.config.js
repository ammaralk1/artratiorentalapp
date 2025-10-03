import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './index.html',
    './src/**/*.{html,js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        tajawal: ['"Tajawal"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b'
        }
      },
      boxShadow: {
        soft: '0 20px 35px -15px rgba(79, 70, 229, 0.35)'
      }
    },
    container: {
      center: true,
      padding: '1.25rem'
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: '#4f46e5',
          'primary-content': '#f8fafc',
          secondary: '#0ea5e9',
          'secondary-content': '#042f2f',
          accent: '#f97316',
          'accent-content': '#0b1120',
          neutral: '#0f172a',
          'neutral-content': '#f8fafc',
          'base-100': '#f8fafc',
          'base-200': '#eef2ff',
          'base-300': '#e0e7ff',
          'base-content': '#0f172a',
          info: '#38bdf8',
          success: '#22c55e',
          warning: '#fbbf24',
          error: '#f87171'
        }
      },
      {
        ar_dark: {
          primary: '#3f5df5',
          'primary-content': '#0b1220',
          secondary: '#60a5fa',
          'secondary-content': '#071324',
          accent: '#38bdf8',
          'accent-content': '#041220',
          neutral: '#0a1120',
          'neutral-content': '#dbeafe',
          'base-100': '#0b1120',
          'base-200': '#111a2e',
          'base-300': '#16213d',
          'base-content': '#e2e8f0',
          info: '#60a5fa',
          success: '#34d399',
          warning: '#fbbf24',
          error: '#f87171',
          '--rounded-box': '1.25rem',
          '--rounded-btn': '999px',
          '--rounded-badge': '1.5rem',
          '--animation-btn': '0.2s',
          '--animation-input': '0.2s',
          '--btn-text-case': 'initial',
          '--btn-focus-scale': '0.98',
          '--border-btn': '1px',
          '--tab-radius': '0.75rem',
          'color-scheme': 'dark'
        }
      }
    ],
    darkTheme: 'ar_dark',
    rtl: true
  },
  plugins: [daisyui]
};

export default config;
