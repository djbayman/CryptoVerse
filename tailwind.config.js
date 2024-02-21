/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      lg: "992px",
      // => @media (min-width: 1440px) { ... }
      xl: "1280px",
      "max-md": { max: "993px" },
      // => @media (max-width: 767px) { ... }
    },
  },
  plugins: [],
};
