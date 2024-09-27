/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#993333',
        secondary: '#678765', // just put a random color
      },
    },
  },
  variants: {
    fill: ['hover', 'focus'],
  },
  plugins: [],
}
