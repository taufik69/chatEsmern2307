/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      custonNunito: ["Nunito", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        Auth_main_color: "#11175D",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
