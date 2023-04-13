<?php

namespace Webplusmultimedia\DateTimeRangePicker\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Webplusmultimedia\DateTimeRangePicker\DateTimeRangePicker
 */
class DateTimeRangePicker extends Facade
{
    protected static function getFacadeAccessor()
    {
        return \Webplusmultimedia\DateTimeRangePicker\DateTimeRangePicker::class;
    }
}
