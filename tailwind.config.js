module.exports = {
  mode: 'jit',
  // content: [],
  content: ['./src/**/*.{ts,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E72D2',
        secondary: '#5680F9',
        dark: '#111213',
        success: '#52c41a',
        warn: '#faad14',
        default: '#EFF2F6'
      },
      spacing: {
        4.5: '18px'
      },
    },
    screens: {
      'sm': {'min': '640px', 'max': '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }

      'hd': {'max': '1400px'},
      // => @media (min-width: 1536px) { ... }
    },
  },

  variants: {
    extend: {}
  },
  plugins: []
};
