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
      black: {
        DEFAULT:        '#29292E',
        'dark':         '#050206',
      },
      gray: {
        'light':        '#DBDCDD',
        'medium':       '#A8A8B3',
        'dark':         '#737380',
      },
      purple:           '#835AFD',
      danger:           '#E73F5D',
      pink: {
        'light':        '#D67EE2',
        'dark':         '#E559F9',
      },
      hover: {
        'purple':       '#6F4BD8',
        'danger':       '#D73754',
        'gray-medium':  '#7E7E86',
        'gray-light':   '#CECECE',
      }
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
