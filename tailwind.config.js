module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
}
