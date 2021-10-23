module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/icons/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false,
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
      gradient: {
        '0':            '#485BFF',
        '1':            '#FF59F8',
      },
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
      animation: {
        fade:   'fadeIn 500ms ease-in-out',
        shake:  'shake 1s cubic-bezier(0.3, 0.07, 0.2, 0.97) both',
      },
      keyframes: () => ({
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
        shake: {
          '10%, 90%':      { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%':      { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%':      { transform: 'translate3d(4px, 0, 0)' },
        }
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
