 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      transitionProperty: {
        'bg': 'background-color, background-image',
      },
    },
  },
  plugins: [],
}
