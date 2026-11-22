/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '"Noto Sans Myanmar"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', '"Noto Serif Myanmar"', 'ui-serif', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
