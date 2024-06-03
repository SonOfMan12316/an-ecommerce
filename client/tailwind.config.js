/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'ch-primary': '#1C5691',
        'ch-secondary': '#83BF4F',
        'ch-tertiary': '#1b3c77',
        'ch-danger': '#fe0808',
        'ch-grey': '#f8f8f8',
        'ch-border-grey': '#999999',
        'ch-trans-secondary': '#202124',
        'ch-footer': '#333333',
        'ch-footer-paragraph': '#f4f4f4',
      },
    },
    fontFamily: {
      dmSans: ['DM+Sans', 'Poppins', 'ui-sans-serif'],
      poppins: ['Poppins', 'ui-sans-serif'],
      manrope: ['Manrope', 'ui-sans-serif'],
    },
  },
  plugins: [],
};
