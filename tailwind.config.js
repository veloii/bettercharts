const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Hey August", ...defaultTheme.fontFamily.sans],
      },
      blur: {
        xs: "2px",
      },
      zIndex: {
        "-1": "-1",
      },
    },
    letterSpacing: {
      nav: "0.6em",
    },
  },
  plugins: [],
};
