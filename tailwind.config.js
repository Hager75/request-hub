/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#13a7e9",
      secondary: "#9c27b0",
      warning: "#ff9800",
      success: "#198754",
      white: "#ffffff",
      black:"#000",
      error: "#FF0000",
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

