/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      bgdark: "#1E1E1E",
      bglight: "#363636",
      bglighter: "#3F3F3F",
      accentpurple: "#8884D8",
      accentpurpledark: "#5c5a94",
      accentpurplelight: "#bdb9ff",
      accentred: "#FF5353",
      accentgreen: "#22c55e",
      textdark: "#D1D1D1",
      textlight: "#FFFFFF"
    }
  },
  plugins: [],
}
