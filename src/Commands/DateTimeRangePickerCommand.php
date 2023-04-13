<?php

namespace Webplusmultimedia\DateTimeRangePicker\Commands;

use Illuminate\Console\Command;

class DateTimeRangePickerCommand extends Command
{
    public $signature = 'date-time-range-picker';

    public $description = 'My command';

    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}
