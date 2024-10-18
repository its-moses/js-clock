/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './public/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'selector',
  content: ['./public/index.html', './public/script.js'], // Adjust paths as needed
  theme: {
    extend: {},
  },
  plugins: [],
};
