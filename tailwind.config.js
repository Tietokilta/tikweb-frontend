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
          dark: "#3F4B59",
          light: "#929FB2",
          lightest: "#E2E7ED",
        },
      },
    },
  },
  plugins: [],
}
