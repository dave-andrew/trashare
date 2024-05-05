/** @type {import('tailwindcss').Config}*/
const { addDynamicIconSelectors } = require('@iconify/tailwind');

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./component/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    addDynamicIconSelectors(),
  ],
};