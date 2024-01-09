/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const typography = require("@tailwindcss/typography");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      aspectRatio: {
        thumbnail: "1.5",
      },
      fontFamily: {
        sans: ["Cabin", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [typography],
};
