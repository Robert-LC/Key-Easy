/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      colors: {
        'menu-blue': '#16252e',
        'menu-blue-modal': '#1c4159'
      }
    }
  },
  plugins: []
}
