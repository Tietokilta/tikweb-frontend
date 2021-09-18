module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Roboto"],
      mono: ["Source Code Pro"],
    },
    extend: {
      colors: {
        black: "#1B1B1E",
        gray: {
          darkest: "#212730",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
