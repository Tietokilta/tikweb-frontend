module.exports = {
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/jsx-runtime",
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  rules: {
    // We don't need these with TS
    "react/prop-types": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    // Not very good rule
    "import/prefer-default-export": "off",
    "react/require-default-props": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    // Custom components
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        labelComponents: ["FieldRow"],
        labelAttributes: ["label"],
        controlComponents: ["Field"],
        depth: 25,
      },
    ],
  },
}
