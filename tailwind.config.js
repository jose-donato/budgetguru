/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#D4AF37",
        primaryHover: "#FFD700",
        primaryActive: "#DAA520",
        secondary: "#ff7e33",
        info: "#0C63E7",
      },
    },
  },
  plugins: [],
};
