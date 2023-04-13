const mix = require('laravel-mix')
const path = require('path')

mix.js('js', 'dist/date_time_range.js')
    .setPublicPath('dist')
    .postCss('resources/css/date-time-range.css', 'dist', [require('tailwindcss')])

if (mix.inProduction()) {
    mix.version()
}

mix.disableSuccessNotifications()
