/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        light: "#FAF3E0",
        brown: "#EABF9F",
        dark: "#1E212D",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
