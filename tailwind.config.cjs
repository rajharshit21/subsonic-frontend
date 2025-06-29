/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 8s ease-in-out infinite',
      },
      colors: {
        primary: "#802BB1",
        bgDark: "#2D283E",
        fgLight: "#D1D7E0",
        accent: "#FF5F7E",
        micGlow: "#8AFFEF",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.5rem",
      },
      boxShadow: {
        smooth: "0 4px 20px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
