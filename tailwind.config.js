// eslint-disable-next-line import/no-extraneous-dependencies
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'orange-yellow': '#e5e3dc',
        'smoky-black': '#0a0a0a',
      },
      fontFamily: {
        'noto-sans': ['Noto Sans', ...defaultTheme.fontFamily.sans],
        lora: ['Noto Sans', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
