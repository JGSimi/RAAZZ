/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutralWhite: '#ffffff',
        neutralBlack: '#000000',
        lightGray: '#f5f5f5',
        mediumGray: '#444444',
        darkGray: '#333333',
      },
    },
  },
  plugins: [],
};



