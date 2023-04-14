<div x-data="webplusDateTime(@entangle($attributes->wire('model')).defer,@js($config))"
     x-id="['text-input']"
     class="relative"

     x-cloak
    wire:ignore
>
    <div class="relative" >
        <label :for="$id('text-input')">{{ $label }}</label>
        <input type="text" x-model="value" :id="$id('text-input')" x-on:click="toggle" class="cursor-pointer"
               readonly
        >
        <div class="flex justify-between absolute right-3 bottom-0">
            <button x-on:click.prevent="clearDate" x-show="selectedDay">
                <x-date-time-range-picker::icons.close class="w-3 text-gray-300 hover:text-red-600"/>
            </button>
        </div>
        <div class="fixed top-0 bottom-0 right-0 left-0 bg-gray-600 bg-opacity-60 bg-blend-darken backdrop-blur-sm z-20 sm:hidden" x-show="show"></div>
        <div class="flex flex-col bg-white border border-gray-100 px-3 py-2 shadow-sm
        w-full fixed left-0 right-0 bottom-0 bg-blend-darken rounded-0
        sm:absolute z-30 sm:bottom-unset sm:w-[330px] sm:left-0  sm:rounded-lg sm:z-20"
             x-show="show"
             x-on:click.outside="show=false"
             x-transition

        >
            <div x-show="!isTimes()"  >
                <div class="flex items-center justify-between pb-4">
                    <button x-data="btnUpDownDate" class="text-slate-400 hover:text-slate-600 duration-200 pl-4"
                            x-show="isCalendar" x-bind="downBtnDate"
                    >
                        <x-date-time-range-picker::icons.arrow-left class="w-5"/>
                    </button>
                    <div class="flex justify-center items-center w-full text-slate-600 ">
                        <button x-text="monthName" x-on:click.prevent="showMonth()" class="py-2 px-3 "></button>
                    </div>
                    <button x-data="btnUpDownDate" class="text-slate-400 hover:text-slate-600 duration-200 pr-4"
                            x-show="isCalendar" x-bind="upBtnDate"
                    >
                        <x-date-time-range-picker::icons.arrow-right class="w-5"/>
                    </button>
                </div>
                <div class="flex flex-wrap"
                     x-show="isCalendar"
                >
                    <template x-for="dayName in getDaysName"  >
                        <div class="flex justify-center basis-[14.2857%] py-1 text-slate-600 text-xs">
                            <span x-text="dayName"></span>
                        </div>
                    </template>
                </div>
                <template x-if="configTypeMatch(['date','range'])" >
                    <div class="flex flex-wrap" x-show="isCalendar()">
                        <template x-for="jour in daysText" :key="jour.getTime()">
                            <div x-data="listeDate(jour)"
                                 class="relative flex justify-center basis-[14.2857%] py-1 text-slate-600 duration-200"
                                 x-bind="listeGrid"
                            >
                                <button class="w-7 h-6 text-sm focus:outline-none rounded-md   duration-200 disabled:text-gray-300 "
                                        x-bind="dateListe"
                                >
                                </button>
                            </div>
                        </template>
                    </div>
                </template>
                <template x-if="configTypeMatch(['date','range'])">
                    <div class="flex flex-wrap" x-show="isMonthNames()">
                        <template x-for="monthName in getMonthNames()">
                            <div class="flex justify-center basis-1/3 py-1 text-slate-600">
                                <button x-text="monthName.toLocaleDateString(config.lang, {month: 'long'})"
                                        class="flex-1 py-2 mx-0.5 hover:bg-primary-datepicker-200 focus:border focus:border-primary-datepicker-400 text-xs uppercase duration-200 text-primary-800"
                                        :class="{
                                        'bg-primary-datepicker-200' : new Date(day).getMonth() === monthName.getMonth(),
                                        'bg-gray-100' : new Date(day).getMonth() !== monthName.getMonth()
                                 }"
                                        type="button"
                                        x-on:click="setMonth(monthName.getMonth())"
                                >
                                </button>
                            </div>
                        </template>
                    </div>
                </template>
                <template x-if="configTypeMatch(['date','range'])" >
                    <div class="flex flex-wrap" x-show="isYears()">
                        <template x-for="year in 20">
                            <div class="flex justify-center basis-1/4 py-1 text-slate-600">
                                <button x-text="new Date(day).getFullYear() - 10 + year"
                                        class="flex-1 py-2 mx-0.5 bg-gray-100 hover:bg-primary-datepicker-200 focus:border focus:border-primary-datepicker-400 text-xs uppercase duration-200"
                                        :class="{'!bg-primary-datepicker-200' : new Date(day).getFullYear() === (new Date(day).getFullYear() - 10 + year)}"
                                        type="button"
                                        x-on:click="setYears(new Date(day).getFullYear() - 10 + year)"
                                >
                                </button>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
            <template x-if="configTypeMatch('time')">
                <div class="flex flex-col py-10 relative" x-show="isTimes()" x-data="time"  >
                    <div class="absolute top-0 right-0">
                        <x-date-time-range-picker::icons.close class="w-5 text-gray-300 hover:text-gray-400 transition" role="button" x-on:click.prevent="show=false"/>
                    </div>
                    <div
                        class="flex items-center justify-center  text-primary-datepicker-400 border border-primary-datepicker-100 bg-gradient-to-t from-white from-0% via-primary-datepicker-50 via-10%  to-white to-100% rounded-3xl">
                        <div class="relative font-bold text-[6rem] w-32 transition select-none group">
                            <x-date-time-range-picker::datetime.arrow class="top-4 border-t-2 border-r-2 origin-center -rotate-45 group-hover:-translate-y-3"
                                              x-on:click.prevent="changeHour(1)"
                            />
                            <x-date-time-range-picker::datetime.time x-text="getHoursText()" x-bind="changeHours"/>
                            <x-date-time-range-picker::datetime.arrow class="bottom-4 border-b-2 border-r-2 origin-center rotate-45 group-hover:translate-y-3"
                                              x-on:click.prevent="changeHour(-1)"
                            />
                        </div>
                        <div class="text-center font-bold text-[6rem]">:</div>
                        <div class="relative font-bold text-[6rem] w-32 transition select-none group">
                            <x-date-time-range-picker::datetime.arrow class="top-4 border-t-2 border-r-2 origin-center -rotate-45 group-hover:-translate-y-3"
                                              x-on:click.prevent="changeMinute(1)"
                            />
                            <x-date-time-range-picker::datetime.time x-text="getMinutesText()" x-bind="changeMinutes"/>
                            <x-date-time-range-picker::datetime.arrow class="bottom-4 border-b-2 border-r-2 origin-center rotate-45 group-hover:translate-y-3"
                                              x-on:click.prevent="changeMinute(-1)"
                            />
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</div>
