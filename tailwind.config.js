module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom_red: "#ff0056",
        custom_blue: "#0093ff",
        custom_orange: "#ff4c00",
        custom_dark: "#393E46fb",
        custom_yellow: "#FFC600",
      },
      fontFamily: {
        source: ['"Source Code Pro"'],
      },
    },
  },
  plugins: [],
};
