const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./custom-blocks/*.{js,ts,jsx,tsx,mdx}", "./pages/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
    require("@headlessui/tailwindcss"),
  ],
};
