/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      fontFamily: {
        dosis: "Dosis, sans-serif",
        pacifico: "Pacifico, cursive",
        kanit: "Kanit', sans-serif",
      },
      colors: {
        primary: "#B1454A",
        background: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
