module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'public/**/*.html',
      'src/**/*.js',
      'src/**/*.jsx',
      'src/**/*.ts',
      'src/**/*.tsx',
    ],
  },
  darkMode: false,
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
      colors: {
        green: {
          happy: '#6FAE75',
        },
        purple: {
          bright: '#4406ec',
          dark: '#2C0C6A',
          light: '#877E9E',
          normal: '#4305EB',
          accent: '#A98CF6',
          gloom: '#372271',
        },
        edge: '#E8E8E8',
        main: {
          light: '#8B8F96',
          spark: '#F2F2F2',
          spark2: '#F4F3F8',
          grey: '#404040',
          lightgrey: '#636166',
          dullgrey: '#B7B7B7',
        },
      },
      fontFamily: {
        sans: [
          'Sailec',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          'Noto Sans',
          'sans-serif',
        ],
      },
      maxWidth: {
        6: '6rem',
        9: '9rem',
      },
      minWidth: {
        32: '8rem',
      },
      outline: {
        solid: '1px solid #4305EB',
      },
      screens: { sm: '560px' },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
