module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto"],
      mono: ["Source Code Pro"],
      pixel: ["VT323"],
    },
    extend: {
      colors: {
        black: "#1B1B1E",
        orange: "#F77F1C",
        red: "#A31F0D",
        yellow: "#F4D227",
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
