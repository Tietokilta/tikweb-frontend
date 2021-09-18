module.exports = {
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  rules: {
    // React 17's new JSX transform doesn't require importing React
    "react/react-in-jsx-scope": "off",
    // We don't need these with TS
    "react/prop-types": "off",
  },
}
