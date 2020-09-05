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
    'standard',
    'plugin:nuxt/recommended',
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'vue/max-attributes-per-line': 'off',
    "semi": [2, "never"],
    // "prettier.semi":false,
    "prettier/prettier": ["error", { "semi": false }]

    "no-console": "off",


    // 文字列はシングルクオートのみ
    "quotes": [2, "single"],
    singleQuote: true,
    trailingComma: 'none',
    printWidth: 100
  }
  }

