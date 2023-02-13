const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "app/**/*.{ts,tsx}",
    "pages/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        zinc: {
          ...colors.zinc,
          450: "#8E8E91",
        },
        red: {
          ...colors.red,
          "zinc-contrast": "#F15B5B",
        },
      },
    },
  },
  plugins: [],
};
