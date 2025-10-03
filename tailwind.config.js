import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './index.html',
    './src/**/*.{html,js,ts,jsx,tsx}'
  ],
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
    themes: ['light', 'dark'],
    darkTheme: 'dark',
    rtl: true
  },
  plugins: [daisyui]
};

export default config;
