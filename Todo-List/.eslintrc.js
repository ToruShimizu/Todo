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
    'prettier',
    'prettier/vue',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'vue/max-attributes-per-line': 'off',
    semi: [2, 'never'],
    'no-duplicate-imports': 0,
    'import/no-duplicates': 2,

    // "prettier.semi":false,
    'prettier/prettier': ['error', { semi: false }],
    'dot-notation': [2, { allowPattern: '^[a-z]+(_[a-z]+)+$' }],
    'no-console': 'off',

    // 文字列はシングルクオートのみ
    quotes: [2, 'single'],
    singleQuote: true,
    trailingComma: true,
    printWidth: 100
  }
}
