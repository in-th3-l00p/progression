/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{html,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "background": "#0C0C0C",
        "lighter-background": "#1A1A1A",
        "text": "#FFFFFF",
        "dark-text": "#909090",
        "dark-green": "#0D6A21",
        "green": "#12992D",
        "accent": "#0267A9",
        "danger": "#921D1D"
      }
    },
  },
  plugins: [],
}

