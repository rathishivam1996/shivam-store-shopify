module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "eslint-plugin-html",
    "plugin:@shopify/esnext",
    "plugin:@shopify/react",
    "plugin:@shopify/prettier",
    "airbnb",
    "prettier",
    "plugin:node/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier"],
  settings: {
    "html/javascript-mime-types": ["text/javascript", "text/worker"],
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      js: true,
      liquid: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
  },
};
