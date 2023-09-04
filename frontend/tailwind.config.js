/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nanum: ['"Nanum Gothic"', 'sans-serif'],
        barun: ['NanumBarunGothic', 'sans-serif']
      },
      animation: {
        'ltr-linear-infinite': 'normal 100s linear infinite'
      }
    }
  },
  plugins: []
};
