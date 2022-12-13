module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["airbnb"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    quotes: ["off", "single"],
    "class-methods-use-this": "off",
    "arrow-body-style": "off",
    "no-use-before-define": ["error", { variables: false }],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-no-bind": "off",
    "react/jsx-one-expression-per-line": "off",
    "comma-dangle": "off",
    "object-curly-newline": "off",
    "consistent-return": "off",
    "no-underscore-dangle": "off",

    // "max-depth": ["error", 2],
    // "max-lines-per-function": ["error", 10],
    // "max-params":npm["error", 3],
  },
  plugins: ["import", "react"],
};
