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
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "trailingComma": "es5"
      }
    ]
  }
  }
}
