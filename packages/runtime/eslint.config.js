const { defineConfig } = require("eslint/config");

const globals = require("globals");
const js = require("@eslint/js");

module.exports = defineConfig([
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    rules: {},
  },
]);
