/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      valentine: ["Valentine"],
      naturaly: ["Naturaly"],
    },
    extend: {
      animation: {
        float: "floatUp 10s ease-in-out infinite", // Existing animation
        explode: "explode 1.5s ease-out forwards", // New explode animation
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(2.5vh)" }, // Start from the bottom
          "100%": { transform: "translateY(-100vh)" }, // End at the top
        },
        explode: {
          "0%": { opacity: "1", transform: "scale(0)" }, // Initial state
          "100%": { opacity: "0", transform: "scale(3)" }, // Exploding effect
        },
      },
    },
  },
  plugins: [],
};
