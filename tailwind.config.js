/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    container: false,
  },
  content: ["./dist/**/*.html", "./dist/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        slate: {
          // Grey color
          950: "#0c1618",
        },
        yellow: {
          // Main color
          850: "#d1ac00",
        },
      },
      fontFamily: {
        "playfair-display": "'Playfair Display', serif",
        outfit: "'Outfit', sans-serif",
      },
    },
  },
  plugins: [
    require("tailwindcss-debug-screens"),

    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "90rem",
        },
      });
    },
  ],
};
