/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        main: "#103931",
        text: "#11101c",
        white: "#fff",
        nanny: "#8a8a89",
        price: "#38cd3e",
      },
      fontFamily: {
        sans: ["Helvetica Neue", "sans-serif"],
      },
    },
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
};
