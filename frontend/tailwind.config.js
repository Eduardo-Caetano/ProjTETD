/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172026",
        ocean: "#0f766e",
        coral: "#f9735b",
        amber: "#f59e0b"
      }
    }
  },
  plugins: []
};
