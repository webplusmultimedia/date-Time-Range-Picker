/** @type {import('tailwindcss').Config} */
const {yellow} = require("tailwindcss/colors");
module.exports = {
  content: [
      './js/**/*.js',
      './resources/views/**/*.blade.php',
      './src/**/*.php'
  ],
  theme: {
    extend: {
        colors: {
            'primary-datepicker' : yellow
        }
    },
  },
  plugins: [],
}

