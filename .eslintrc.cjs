module.exports = {
  root: true,
  env: { es6: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  rules: {
    eqeqeq: "error",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
