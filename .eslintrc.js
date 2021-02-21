module.exports = {
  // parser: "@typescript-eslint/parser",
  parserOptions: {
    // ecmaVersion: 2020,
    // sourceType: "module",
    project: "./tsconfig.json",
  },
  extends: [
    "airbnb-typescript",
    // "eslint:recommended",
    // "plugin:react/recommended",
    // "plugin:react-hooks/recommended",
    // "plugin:import/errors",
    // "plugin:import/warnings",
    // "plugin:jsx-a11y/recommended",
    // "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  // settings: {
  //   react: {
  //     version: "detect",
  //   },
  // },
  rules: {
    // React 17's new JSX transform doesn't require importing React
    "react/react-in-jsx-scope": "off",
  },
}
