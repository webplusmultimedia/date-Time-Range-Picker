/** @type {import('tailwindcss').Config} */
const {yellow} = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
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
  plugins: [
      plugin(function ({addUtilities}) {
          addUtilities({
              '.bottom-unset': {
                  bottom: 'unset'
              }
          })
      })
  ],
}

