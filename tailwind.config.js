const { spacing, fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cereal', 'Cereal-Arabic', 'ban', ...fontFamily.sans],
      },
      boxShadow: {
        my: '0px 3px 12px rgb(0 0 0 / 20%)',
        my1: '0 0 0 1px rgb(221,221,221)',
        my2: '0 0 0 2px #333',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
