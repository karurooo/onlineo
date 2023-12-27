/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      theme: {
        screens: {
          xs: "475px",
          sm: "640px",

          md: "768px",

          lg: "1024px",

          xl: "1280px",

          "2xl": "1536px",
        },
      },
    },
  },
  plugins: [],
};
