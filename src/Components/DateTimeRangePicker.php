<?php

declare(strict_types=1);

namespace Webplusmultimedia\DateTimeRangePicker\Components;

use Carbon\CarbonInterface;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class DateTimeRangePicker extends Component
{
    public string $name = '';

    public ?string $label = null;
    /**
     * @var array
     */
    public array $config = [
        'lang' => 'fr-FR',
        'type' => 'date', //date, datetime, time, range
        'minDate' => null,
        'maxDate' => null,
        'minTime' => 7,
        'maxTime' => 17,
        'rangeMinuteBy' => 5, // by 5 min
    ];

    public function __construct(
        ?string $type = 'date',
        ?string $lang = 'fr-FR',
        null|CarbonInterface $minDate = null,
        null|CarbonInterface $maxDate = null,
        null|int $rangeMinuteBy = 5,
        string $label = 'Mon label'

    ) {

        /**
         * @todo test if selectedDate is in [min,max]
         *
         * if ($minDate and $maxDate) {
         * $this->value = $minDate->toImmutable();
         * }*/
        $this->label = $label;
        $this->config['type'] = $type;
        $this->config['minDate'] = $minDate;
        $this->config['maxDate'] = $maxDate;
        $this->config['lang'] = $lang;
        $this->config['rangeMinuteBy'] = $rangeMinuteBy;
    }

    public function render(): View
    {
        return view('date-time-range-picker::components.date-time-range-picker');
    }
}
