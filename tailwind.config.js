/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      space: {
        100: '25rem', // 400px
      },
      colors: {
        'anthracite-gray': '#2F3132',
      },
      fontSize: {
        'custom-lg': ['1.125rem', '1.125rem'], // [18px, 18px]
        'custom-xl': ['1.25rem', '1.25rem'], // [20px, 20px]
      },
      boxShadow: {
        'button-hover': '0px 0px 0px 2px rgba(47, 49, 50, 1) inset',
      },
      gridTemplateColumns: {
        'catalog-products': 'repeat(auto-fill, minmax(20rem, 1fr))',
      },
    },
  },
  plugins: [],
}
