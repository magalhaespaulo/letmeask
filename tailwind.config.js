module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/icons/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      transparent:      'transparent',
      background:       '#F8F8F8',
      white:            '#FEFEFE',
      black:            '#29292E',
      gray: {
        'light':        '#DBDCDD',
        DEFAULT:        '#A8A8B3',
        'dark':         '#737380',
      },
      purple: {
        'light':        '#F4F0FF',
        DEFAULT:        '#835AFD',
      },
      pink:             '#E559F9',
      red:              '#E73F5D',
    },
    fontWeight: {
      normal:     400,
      medium:     500,
      bold:       700,
    },
    fontFamily: {
      'roboto':   ['Roboto', 'sans-serif'],
      'poppins':  ['Poppins', 'sans-serif'],
    },
    boxShadow: {
      DEFAULT: '0px 2px 12px rgba(0, 0, 0, 0.04)',
    },
    extend: {
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
        '6': '6 6 0%',
        '7': '7 7 0%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
