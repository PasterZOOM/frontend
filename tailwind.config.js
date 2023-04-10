/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      inset: {
        22: '5.5rem', // 88px
        26: '6.5rem', // 104px
      },
      space: {
        100: '25rem', // 400px
      },
      colors: {
        'anthracite-gray': '#2F3132',
        'light-gray': '#E1E2E3',
      },
      fontSize: {
        'custom-lg': ['1.125rem', '1.125rem'], // [18px, 18px]
        'custom-xl': ['1.25rem', '1.25rem'], // [20px, 20px]
      },
      boxShadow: {
        'button-hover': '0px 0px 0px 2px rgba(47, 49, 50, 1) inset',
        'button-hover-dark': '0px 0px 0px 2px rgba(225, 225, 225, 1) inset',
        'line-bottom': '0px 2px 2px rgba(0, 0, 0, 0.1)',
        'line-top': '0px -2px 2px rgba(0, 0, 0, 0.1)',
        'line-bottom-dark': '0px 2px 2px rgba(255, 255, 255, 0.2)',
        'line-top-dark': '0px -2px 2px rgba(255, 255, 255, 0.2)',
      },
      gridTemplateColumns: {
        'catalog-products': 'repeat(auto-fill, minmax(18.5rem, 1fr))',
      },
      animation: {
        opening: 'open var(--duration, 500ms) forwards',
        closing: 'closing var(--duration, 500ms) forwards',
        'hover-button': 'hover-button var(--duration, 700ms) ease-in-out',
      },
      keyframes: {
        open: {
          '0%': { height: 0 },
          '100%': { height: 'var(--h)' },
        },
        closing: {
          '0%': { height: 'var(--h)' },
          '100%': { height: 0 },
        },
        'hover-button': {
          '0%': { top: '0', bottom: '0', left: '0', right: '0' },
          '50%': { top: '-0.17rem', bottom: '-0.17rem', left: '-0.17rem', right: '-0.17rem' },
          '100%': {
            height: '-0.125rem',
            bottom: '-0.125rem',
            left: '-0.125rem',
            right: '-0.125rem',
          },
        },
      },
    },
  },
  plugins: [],
}
