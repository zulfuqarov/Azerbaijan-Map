/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screen/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: "600px",
        ornek: "300px",
      },
    },
  },
  plugins: [],
};
