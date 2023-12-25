module.exports = {
  extends: ["@damilaredev/eslint-config", "plugin:prettier/recommended"],
  env: {
    node: true,
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": "off",
    "space-before-function-paren": "off",
    "no-useless-constructor": "off",
    "no-return-await": "off",
    "require-await": "warn",
  },
};
