/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: '#7c3aed',
        accent2: '#a855f7',
      },
    },
  },
  plugins: [],
}