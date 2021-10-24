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
      primary:          'var(--primary)',
      secondary:        'var(--secondary)',
      transparent:      'transparent',
      background:       '#F8F8F8',
      white:            '#FEFEFE',
      black: {
        DEFAULT:        '#29292E',
        'dark':         '#222222',
      },
      gray: {
        'light':        '#DBDCDD',
        DEFAULT:        '#A8A8B3',
        'dark':         '#737380',
      },
      red:              '#E73F5D',
      google:           '#EA4335',
      // Purple
      purpleTheme: {
        primary:        '#835AFD',
        secondary:      '#E559F9',
      },
      // Orange
      orangeTheme: {
        primary:        '#FD5A5A',
        secondary:      '#F99C59',
      },
      // Blue
      blueTheme: {
        primary:        '#5AAFFD',
        secondary:      '#54FF98',
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
