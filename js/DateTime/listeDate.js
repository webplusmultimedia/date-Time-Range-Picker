import {isGreaterThan, Period} from "./Support/dateSupport";

/**
 *
 * @param {Date} date
 */
export function listeDate(date) {
    return {
        date,
        isNotCurrentMonth() {
            return (this.month !== (this.date.getMonth() ) /*&& !this.isSelectDay(date)*/) || this.isDisabled()
        },
        isCurrentDate() {
            return this.date.toLocaleString(
                    this.config.lang, {year: 'numeric', month: 'numeric', day: 'numeric',}) ===
                new Date(Date.now()).toLocaleString(this.config.lang, {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                })
        },
        isDisabled() {
            return this.period && !this.period.isBetween(this.date)
        },
        /**@type {Period|boolean} */
        period: false,
        isSelectDay() {
            if(this.configTypeMatch('range')) return false
            return this.date.toLocaleDateString() === this.selectedDay?.toLocaleDateString()
        } ,
        select() {
            if (this.period) {
                if (!this.period.isBetween(this.date)) return
            }
            /*if (!this.selectedDay && this.configTypeMatch('time')) {
                this.date.setHours(this.config.minTime)
                this.date.setMinutes(0)
            }*/

            if (this.configTypeMatch('range')) {
                if (!this._rangeSelected.start_at) {
                    this._rangeSelected.start_at = this.date
                    this.range_start_at = this.date
                    this._periodRange = Period.createFromDate(this._rangeSelected.start_at, this.date)
                    this.periodRange = null
                } else {
                    this.rangeSelected = this.selectedDay = this._rangeSelected
                    this._rangeSelected = this.resetRange()
                    this.set_selectedDay(this.rangeSelected)
                    this.periodRange = Period.createFromRange(this.rangeSelected)
                }
                return;
            }
            this.selectedDay = new Date(this.date.getFullYear(),this.date.getMonth(),this.selectedDay.getDate(),this.selectedDay.getHours(),this.selectedDay.getMinutes())
            this.set_selectedDay(this.selectedDay)
            this.showDateTime()
        },
        /* Events binding for date btn */
        'dateListe': {
            [':class']() {
                return {
                    'text-slate-400': this.isNotCurrentMonth(),
                    'line-through cursor-not-allowed hover:bg-transparent': this.isDisabled(),
                    'focus:ring-2 focus:ring-offset-2 focus:ring-primary-datepicker-400 hover:bg-primary-datepicker-200': !this.isDisabled() && !this.configTypeMatch('range'),
                    'hover:bg-primary-datepicker-200': !this._periodRange && this.configTypeMatch('range'),
                    'ring-2 ring-offset-2 ring-primary-datepicker-200': this.isCurrentDate() && (this.configTypeMatch('range') && !this._periodRange && !this.isInRange()),
                    'ring-2 ring-offset-2 ring-primary-datepicker-400  bg-primary-datepicker-300  text-slate-700 font-bold': this.isSelectDay() && !this.configTypeMatch('range'),
                }
            },
            [':disabled']() {
                return this.isDisabled()
            },
            ['x-text']() {
                return this.date.getDate()
            },
            ['x-on:click.prevent.stop']() {
                return this.select(this.date)
            },

        },
        /*Events binding for liste grid */
        'listeGrid': {
            ['x-on:mouseenter.self.prevent.stop']() {
                if(this.period && !this.period.isBetween(this.date)) return
                if (this.range_start_at) {
                    if (this.range_start_at.getTime() < this.date.getTime()) {
                        this._rangeSelected = {end_at: this.date, start_at: this.range_start_at}
                    } else {
                        this._rangeSelected = {end_at: this.range_start_at, start_at: this.date}
                    }
                    this._periodRange = Period.createFromRange(this._rangeSelected)
                }
            },
            [':class']() {
                return {
                    'bg-primary-datepicker-100': (this.configTypeMatch('range') && this._periodRange && this.isInRange()) || (this.configTypeMatch('range') && this.periodRange && this.isInRange()),
                    "rounded-l before:absolute before:top-0 before:bottom-0  before:left-0 before:w-2 before:border-t-2 before:border-b-2 before:rounded-l before:border-l-4 before:border-primary-datepicker-400": this.isRangeLeft(),
                    "rounded-r after:absolute after:top-0 after:bottom-0 after:right-0 after:w-2 after:border-t-2 after:border-b-2 after:rounded-r after:border-r-4 after:border-primary-datepicker-400": this.isRangeRight(),
                }
            }
        },
        isInRange(){
            if (this._periodRange){
                return this._periodRange.isBetween(this.date)
            }
            if (this.periodRange){
                return this.periodRange.isBetween(this.date)
            }
            //return false
        },
        isRangeLeft() {
            if (this._periodRange) {
                return !!(this._rangeSelected.start_at && this._rangeSelected.start_at.getTime() === this.date.getTime());
            }
            if (this.periodRange) {
                return !!(this.rangeSelected.start_at && this.rangeSelected.start_at.getTime() === this.date.getTime());
            }
            return false
        },
        isRangeRight() {
            if (this._periodRange) {
                return !!(this._rangeSelected.end_at && this._rangeSelected.end_at.getTime() === this.date.getTime());
            }
            if (this.periodRange) {
                return !!(this.rangeSelected.end_at && this.rangeSelected.end_at.getTime() === this.date.getTime());
            }
            return false
        },
        init() {
            if (this.config.minDate) this.period = Period.createFromDate(new Date(this.config.minDate), new Date(this.config.maxDate))
        }
    }
}
