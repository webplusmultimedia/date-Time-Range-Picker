<?php

namespace Webplusmultimedia\DateTimeRangePicker;

use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use Webplusmultimedia\DateTimeRangePicker\Components\DateTimeRangePicker;

class DateTimeRangePickerServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package
            ->name('date-time-range-picker')
            ->hasConfigFile()
            ->hasViews()
            ->hasViewComponents(prefix: 'webplusm', viewComponentName: DateTimeRangePicker::class);
    }
}
