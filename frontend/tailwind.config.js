/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      boxShadow: {
        custom: "0 20px 69px 0 rgba(0, 0, 0, 0.07)",
      },
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
  plugins: [require("tailwind-scrollbar-hide")],
};
