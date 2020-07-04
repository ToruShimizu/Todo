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
    "prettier.singleQuote": true,
"prettier.semi":false,
    "semi": [2, "never"],
    // 文字列はシングルクオートのみ
    "quotes": [2, "single"],
    "prettier/prettier": [
      "error",
      {
        
        "trailingComma": "es5",
      }
    ]
  }
  }

