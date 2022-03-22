module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    // parser: 'babel-eslint',
    ecmaVersion: 2020,
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    '@vue/typescript/recommended',
    // '@vue/prettier/@typescript-eslint',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
}
