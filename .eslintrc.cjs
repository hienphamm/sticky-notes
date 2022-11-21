module.exports = {
  globals: {
    JSX: true,
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard-with-typescript",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "react-hooks"],
  overrides: [],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "@typescript-eslint/strict-boolean-expressions": "warn",
  },
};
