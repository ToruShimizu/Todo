module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'vue/max-attributes-per-line': 'off',
    "semi": [2, "never"],
    "prettier.semi":false,

    // 文字列はシングルクオートのみ
    "quotes": [2, "single"],
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "trailingComma": "es5",
      }
    ]
  }
  }

