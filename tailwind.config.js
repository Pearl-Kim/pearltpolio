/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6", // 기본 파랑
        sunny: "#fbbf24",
        cloudy: "#60a5fa",
        rainy: "#06b6d4",
      }
    },
  },
  plugins: [],
}