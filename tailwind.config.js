/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        valentine: ["Valentine"],
      },
      animation: {
        float: "floatUp 10s ease-in-out infinite",
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(5vh)" }, // Start from the bottom
          "100%": { transform: "translateY(-100vh)" }, // End at the top
        },
      },
    },
  },
  plugins: [],
};
