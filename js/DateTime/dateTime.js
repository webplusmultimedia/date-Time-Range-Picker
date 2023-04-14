import {checkConfig} from "./Support/checkConfig";

/**
 *
 * @param {string} dayDate
 * @param {{type : string,lang : string,minDate:Date|boolean,maxDate:Date|boolean,minTime : number, maxTime : number, intervalMinute :number}} config
 */
export function webplusDateTime(dayDate, config) {
    return {
        /**
         * @type {{start_at: null|Date, end_at: null|Date}}
         */
        rangeSelected: {start_at: null, end_at: null},
        _rangeSelected: {start_at: null, end_at: null},
        range_start_at: null,
        _periodRange: null,
        periodRange: null,
        resetRange() {
            this.range_start_at = null
            this._periodRange = null
            return {start_at: null, end_at: null}
        },

        /**@param {number} month */
        setMonth(month) {
            let date = new Date(this.day).setMonth(month)
            this.day = new Date(date).toISOString()
            this.getDates()
            this.whatToShow = 'years'
        },
        config,
        /**@param {number} year **/
        setYears(year) {
            let date = new Date(this.day).setFullYear(year)
            this.day = new Date(date).toISOString()
            this.getDates()
            this.whatToShow = 'calendar'
        },
        whatToShow: 'calendar',
        showCalendar() {
            this.whatToShow = 'calendar'
        },
        isCalendar() {
            return this.whatToShow === 'calendar'
        },
        showMonth() {
            if (this.whatToShow === 'calendar') {
                this.whatToShow = 'month'

            } else this.whatToShow = 'calendar'
        },
        isMonthNames() {
            return this.whatToShow === 'month'
        },
        isYears() {
            return this.whatToShow === 'years'
        },
        isTimes() {
            return this.whatToShow === 'times'
        },
        getHoursText() {
            return `${this.selectedDay?.getHours()}`.padStart(2, '0')
        },
        getMinutesText() {
            return `${this.selectedDay?.getMinutes()}`.padStart(2, '0')
        },
        month: null,
        day: null,

        show: false,
        showDateTime() {
            if (this.configTypeMatch('time')) this.whatToShow = 'times'
            else this.show = false
        },
        toggle() {
            this.show = !this.show
            if (this.show && !this.configTypeMatch('time') && this.selectedDay) {
                if (!this.configTypeMatch('range')) {
                    this.day = this.selectedDay.toISOString()
                }
                else {
                    if(this.rangeSelected.start_at){
                        this.day = this.rangeSelected.start_at.toISOString()
                    }
                }
                this.getDates()
            }


            if (this.configTypeMatch(['date', 'range'])) {
                this.whatToShow = 'calendar'
                return
            }
            if (this.configTypeMatch('time')) {
                if (!this.selectedDay) {
                    this.selectedDay = new Date()
                    this.selectedDay.setHours(config.minTime)
                    this.selectedDay.setMinutes(0)
                }
                this.whatToShow = 'times'
                return
            }
            this.whatToShow = 'calendar'
        },
        /**
         *@type  {Date|null} selectedDay
         */
        selectedDay: null,
        dayDate,
        get_selectedDay() {
            return dayDate.initialValue
        },
        set_selectedDay(dateOrRange) {
            if (typeof dateOrRange === 'object' && dateOrRange.start_at) {
                this.dayDate = [dateOrRange.start_at, dateOrRange.end_at]
            }
            if(this.configTypeMatch('date')){
                this.dayDate = dateOrRange
                return
            }
            if(this.configTypeMatch('time')){
                this.dayDate = dateOrRange.toLocaleString()
                return
            }

        },
        getDaysName() {
            let date = new Date(Date.parse(this.day)),
                daysName = []
            date = new Date(date.setDate(date.getDate() - date.getDay() + 1))
            for (let i = 0; i < 7; i++) {
                daysName.push(this.upperCaseF(date.toLocaleDateString(config.lang, {weekday: 'short'})))
                date.setDate(date.getDate() + 1)
            }
            return daysName
        },

        upperCaseF(str) {
            if (str)
                return str.charAt(0).toUpperCase() + str.slice(1)
            return str
        },
        monthName(day) {
            let date = new Date(Date.parse(day ?? this.day))

            return this.upperCaseF(date.toLocaleDateString(config.lang, {month: 'long', year: "numeric"}))
        },
        daysText : [],
        getDates() {
            let date = new Date(Date.parse(this.day)),
                dates = []
            date = new Date(date.setDate(1))
            this.month = date.getMonth()
            date = this.startOfWeek(date)
            for (let i = 0; i < 42; i++) {
                dates.push(new Date(date))
                date.setDate(date.getDate() + 1)
            }
            this.daysText = dates
            return dates
        },
        /**
         *
         * @param {Date} date
         */
        startOfWeek(date) {
            if(date.getDay()===0) {
                return new Date(date.setDate(date.getDate() -6))
            }
            if(date.getDay()===1) {
                date.setDate(- 6)
            }
            return new Date(date.setDate(date.getDate() - date.getDay() + 1))
        },
        upMonth() {
            let date = new Date(this.day)
            this.day = new Date(date.setMonth(date.getMonth() + 1)).toISOString()
            this.getDates()
        },
        downMonth() {
            let date = new Date(this.day)
            //this.month = date.getMonth() - 1
            this.day = new Date(date.setMonth(date.getMonth() - 1)).toISOString()
            this.getDates()
        },
        getMonthNames() {
            let date = new Date(Date.parse(this.day)),
                dates = []
            for (let i = 0; i < 12; i++) {
                dates.push(new Date(date.setMonth(i)))
                date.setDate(date.getMonth() + 1)
            }
            return dates
        },
        clearDate() {
            this.selectedDay = null
            this.rangeSelected = this._rangeSelected = {start_at: null, end_at: null}
            this.periodRange = this._periodRange = null
            dayDate = null

        },
        configTypeMatch(match) {
            if (Array.isArray(match)) {
                let result = false
                match.forEach(reg => {
                    if (config.type.match(reg) !== null) result = true
                });
                return result
            }
            return config.type.match(match) !== null
        },
        value() {
            let options = {};
            if (this.selectedDay && !this.configTypeMatch('range')) {
                if (this.configTypeMatch('datetime')) {
                    options.hour = 'numeric'
                    options.minute = 'numeric'
                    return this.selectedDay.toLocaleDateString(config.lang, options)
                }
                if (this.configTypeMatch('date')) {
                    return this.selectedDay.toLocaleDateString(config.lang)
                }

                if (this.configTypeMatch('time')) {
                    options.hour = 'numeric'
                    options.minute = 'numeric'
                    return this.selectedDay.toLocaleTimeString(config.lang, options)
                }
                return this.selectedDay.toLocaleDateString(config.lang, options)
            }

            if (this.configTypeMatch('range')) {
                if (this.rangeSelected.start_at) {
                    return `${this.rangeSelected.start_at.toLocaleDateString(config.lang)} - ${this.rangeSelected.end_at.toLocaleDateString(config.lang)}`
                }
            }
            return null
        },

        /**
         *
         * @param {Date} date
         */
        firstMonthOfTheYear(date) {
            return new Date(date.setDate(date.getDate() - date.getDay() + 1))
        },
        init() {
            checkConfig(this)
        }

    }
}
