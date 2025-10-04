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
          primary: '#6c63ff',
          'primary-content': '#f9f8ff',
          secondary: '#0ea5e9',
          'secondary-content': '#041f2f',
          accent: '#f97316',
          'accent-content': '#120708',
          neutral: '#1f2937',
          'neutral-content': '#f8fafc',
          'base-100': '#f9fafb',
          'base-200': '#edf1ff',
          'base-300': '#dfe5ff',
          'base-content': '#111928',
          info: '#38bdf8',
          success: '#22c55e',
          warning: '#fbbf24',
          error: '#f87171',
          '--rounded-box': '1.5rem',
          '--rounded-btn': '999px',
          '--rounded-badge': '999px',
          '--tab-radius': '1rem'
        }
      },
      {
        dark: {
          primary: '#818cf8',
          'primary-content': '#0b1120',
          secondary: '#38bdf8',
          'secondary-content': '#04121f',
          accent: '#fb923c',
          'accent-content': '#190b03',
          neutral: '#0b1220',
          'neutral-content': '#e2e8f0',
          'base-100': '#0b1120',
          'base-200': '#111a2e',
          'base-300': '#1e293b',
          'base-content': '#e2e8f0',
          info: '#60a5fa',
          success: '#34d399',
          warning: '#fbbf24',
          error: '#f87171',
          '--rounded-box': '1.5rem',
          '--rounded-btn': '999px',
          '--rounded-badge': '999px',
          '--tab-radius': '1rem',
          'color-scheme': 'dark'
        }
      }
    ],
    darkTheme: 'dark',
    rtl: true
  },
  plugins: [daisyui]
};

export default config;
