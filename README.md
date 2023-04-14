# A date, dateTime, Time, Range Date picker with livewire and AlpineJs + TailwindCss

[![Latest Version on Packagist](https://img.shields.io/packagist/v/webplusmultimedia/date-time-range-picker.svg?style=flat-square)](https://packagist.org/packages/webplusmultimedia/date-time-range-picker)
[![GitHub Tests Action Status](https://img.shields.io/github/actions/workflow/status/webplusmultimedia/date-time-range-picker/run-tests.yml?branch=main&label=tests&style=flat-square)](https://github.com/webplusmultimedia/date-time-range-picker/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/actions/workflow/status/webplusmultimedia/date-time-range-picker/fix-php-code-style-issues.yml?branch=main&label=code%20style&style=flat-square)](https://github.com/webplusmultimedia/date-time-range-picker/actions?query=workflow%3A"Fix+PHP+code+style+issues"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/webplusmultimedia/date-time-range-picker.svg?style=flat-square)](https://packagist.org/packages/webplusmultimedia/date-time-range-picker)

Here is a date, dateTime and date range picker for livewire made for Tall Stack

## Support us

[<img src="https://i.postimg.cc/0jTRWDYR/Date-time-range-picker-webplus-multim-dia-2.jpg"  />](https://webplusm.net)

Here is a date, dateTime and date range picker for livewire made for Tall Stack

## Installation

You can install the package via composer:

```bash
composer require webplusmultimedia/date-time-range-picker
```

Add the following settings to your Tailwindcss config file, tailwind.config.js
```js
module.exports = {
    presets: [
        require('./vendor/webplusmultimedia/date-time-range-picker/tailwind.config.js')
    ],
    content: [
        '...',
        /* Date time Range */
        './vendor/webplusmultimedia/date-time-range-picker/js/**/*.js',
        './vendor/webplusmultimedia/date-time-range-picker/resources/views/**/*.blade.php',
    ],

    theme: {}
}
```

In your ./resources/js/app.js, import the js file
```js
import './../../vendor/webplusmultimedia/filemanager/resources/dist/js/filemanager'
```
### Changing color theme

You can customize the color theme by changing just one variable in your tailwind.config.js

```js
const colors = require('tailwindcss/colors')
 
module.exports = {
    ...
    theme: {
        extend: {
            colors: {
                ...
                'primary-datepicker' : colors.cyan // Or what ever you want
            },
        },
    },
    ...
}
```

Optionally, you can publish the views using, but don't need that.

```bash
php artisan vendor:publish --tag="date-time-range-picker-views"
```

## Usage

In your blade livewire view :
```html
<div class="pt-5">
    <x-webplusm-date-time-range-picker type="range" label="Dates de formation" 
                                       wire:model="date" 
    />
</div>
```

## Component attributes :

- **type** : {string} (date by default) date, datetime or range 
- **label** : {string} (null by default) the Label to play
- **minDate** and **maxDate** : {ISO8601 (Carbon\CarbonInterface|null)} (null by default), if you need restricting dates
- **lang** : {dateString} (fr by default(e.g : fr-FR ...))
- **minTime** : {int} (7(h) by default) , minimum time to reach
- **maxTime** : {int} (17(h) by default) , maximum time to reach
- **intervalMinute** : {int} (5 by default) , interval up/down for minutes (time and datetime type)

## Testing

Coming sooner
```bash
composer test
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [webplusm](https://github.com/webplusmultimedia)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
