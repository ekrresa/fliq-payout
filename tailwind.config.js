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
  darkMode: false, // or 'media' or 'class'
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
        },
      },
      maxWidth: {
        9: '9rem',
      },
      minWidth: {
        32: '8rem',
      },
      outline: {
        solid: '1px solid #4305EB',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
