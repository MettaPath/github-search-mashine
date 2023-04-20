module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes:
      {
        fadein: {
          '0%': { opacity: '0' },
          '30%': { opacity: '0.3' },
          '50%': { opacity: '0.5' },
          '70%': { opacity: '0.7' },
          '100%': { opacity: '1'},
        }
      },
      animation: {
        'menu-fade': 'fadein 0.4s linear 1'
      },
    },
  },
  plugins: [],
}
