module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto"],
      mono: ["Source Code Pro"],
    },
    extend: {
      colors: {
        black: "#1B1B1E",
        orange: "#F77F1C",
        gray: {
          darkest: "#212730",
        },
        white: "#F5F5F5",
      },
    },
  },
  plugins: [],
}
