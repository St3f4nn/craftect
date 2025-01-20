/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    container: false,
  },
  content: ["./dist/**/*.html", "./dist/js/**/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        "blue-building": "url('../assets/images/blue_building.jpg')",

        "pencil-on-paper": "url('../assets/images/pencil_on_paper.jpg')",
        "designer-working": "url('../assets/images/designer_working.jpg')",
      },
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
      spacing: {
        1.25: "0.3125rem",
        1.75: "0.4375rem",
        5.75: "1.4375rem",
        7.75: "1.9375rem",
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
