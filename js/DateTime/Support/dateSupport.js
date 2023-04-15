/**
 * @param {Date} date1
 * @param {Date} date2
 */
const isGreaterThan = (date1, date2) => {
    return date1.getTime() >= date2.getTime()
}
/**
 * @param {Date} date1
 * @param {Date} date2
 */
const isLowerThan = (date1, date2) => {
    return date1.getTime() <= date2.getTime()
}
/**
 * @param {Date} date
 * @return {Date}
 */
const getDateTime = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())
}

/**
 * @param {string} time - ISO8601
 * @return {boolean}
 */
const isValidTime = (time) => {
    const times = time.split(':')
    return times.length === 2 && parseInt(times[0]) < 23 && parseInt(times[1]) < 59
}
/**
 * @param {Object} date
 * @return {string}
 */
const setSelectedDate = (data) => {
    let hours = data.selectedDay?.getHours() ? data.selectedDay.getHours() : data.day.getHours(),
        minutes = data.selectedDay?.getMinutes() ? data.selectedDay.getMinutes() : data.day.getMinutes()
    data.selectedDay = new Date(data.date.getFullYear(), data.date.getMonth(), data.date.getDate(), hours, minutes)
    data.set_selectedDay(data.selectedDay)
}
/**
 * @param {Date} date
 * @return {string|null}
 */
const getModelValue = (date) => {
    if (!date) return null
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}
const getMutable = date => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)

class Period {
    /**@property {Date} _start_at  */
    _start_at;
    /**@property {Date} _end_at  */
    _end_at;

    /**
     * @param {Date} date1
     * @param {Date} date2
     */
    constructor(date1, date2) {
        this._start_at = getMutable(date1);
        this._end_at = getMutable(date2);
    }

    /**
     * @param {Date} date1
     * @param {Date} date2
     */
    static createFromDate(date1, date2) {
        return new Period(date1, date2)
    }

    isBetween(date, strict = false) {
        return (isGreaterThan(getMutable(date), this._start_at) && isLowerThan(getMutable(date), this._end_at))
    }

    /**
     * @param {{start_at: Date, end_at: Date}} rangeSelected
     * @return {Period}
     */
    static createFromRange(rangeSelected) {
        return new Period(rangeSelected.start_at, rangeSelected.end_at)
    }
}

class StringToTime {
    /**@type {string} */
    #_value
    #minTime = 7;
    #maxTime = 17;
    h12 = false;
    hours
    minutes

    constructor(value = null, config) {
        this.#minTime = config.minTime;
        this.#maxTime = config.maxTime;
        this.h12 = config.h12;
        //if (!value) throw new Error('Valeur heure incorrecte')
        if (!value) {
            this.hours = this.#minTime
            this.minutes = 0
        } else {
            this.#_value = value
            this.init()
        }
    }

    init() {
        this.hours = parseInt(this.splitTime()[0]) ?? 0
        this.minutes = parseInt(this.splitTime()[1]) ?? 0
    }

    /**
     *
     * @return {string[]}
     */
    splitTime() {
        return this.#_value.split(':')
    }

    /**
     *
     * @return {string}
     */

    getHoursText() {

        return `${this.hours}`.padStart(2, '0')
    }

    getMinutesText() {
        return `${this.minutes}`.padStart(2, '0')
    }

    getValueText() {
        let suffixe = '', hours
        if (this.h12) {
            suffixe = ' AM'
            if (this.hours > 12) {
                suffixe = ' PM'
                hours = this.hours - 12
            }
        }
        return `${hours ?? this.getHoursText()}:${this.getMinutesText()}${suffixe}`
    }
}

export {isGreaterThan, isLowerThan, getDateTime, setSelectedDate, getModelValue, isValidTime, Period, StringToTime};

