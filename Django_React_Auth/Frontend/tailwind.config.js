/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins, sans-serif"],
      },
      transitionTimingFunction: {
        "just-bounce": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
      },
      colors: {
        neutral: {
          150: "#f0f0f0", // Your chosen neutral-150 color
        },
      },
    },
  },

  plugins: [],
};
