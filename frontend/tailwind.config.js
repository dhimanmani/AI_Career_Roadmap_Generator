/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          light: '#60A5FA',
        },
        secondary: {
          DEFAULT: '#7C3AED',
          dark: '#6D28D9',
          light: '#A78BFA',
        },
        success: {
          DEFAULT: '#22C55E',
          dark: '#15803D',
          light: '#86EFAC',
        },
        warning: {
          DEFAULT: '#F59E0B',
          dark: '#B45309',
          light: '#FDE047',
        },
        danger: {
          DEFAULT: '#EF4444',
          dark: '#B91C1C',
          light: '#FCA5A5',
        },
        darkBg: {
          DEFAULT: '#0B0F19',
          card: '#151B2C',
          border: '#1F293D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
