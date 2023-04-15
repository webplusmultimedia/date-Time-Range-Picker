import {Period, StringToTime, getDateTime, isValidTime} from "./dateSupport";

/**
 *
 * @param {Object<webplusDateTime>} data
 */
export const checkConfig = data => {
    let date = new Date(),
        entangleData = data.get_selectedDay()

    switch (data.config.type) {
        case 'range' :
            if (Array.isArray(entangleData)) {

                if (entangleData.length === 2) {
                    date = new Date(Date.parse(entangleData[0]))
                    let date2 = new Date(entangleData[1])
                    date = getDateTime(date)
                    date2 = getDateTime(date2)
                    data.selectedDay = data.rangeSelected = {start_at: date, end_at: date2}
                    data.periodRange = Period.createFromRange(data.rangeSelected)
                }

                data.day = date
            }

            break
        case 'date':
        case 'datetime':
            if (entangleData) {
                date = getDateTime(new Date(entangleData))
                data.selectedDay = date
            }

            break
        case "time" :
            if (entangleData === undefined || !entangleData) {
                date.setHours(data.config.minTime)
                date.setMinutes(0)

            } else {
                date = new Date(Date.parse(entangleData))
                if (!!date && isValidTime(entangleData)) {
                    const time = new StringToTime(entangleData,data.config)
                    date = new Date()
                    date.setHours(time.hours)
                    date.setMinutes(time.minutes)
                    data.selectedDay = date

                }
                else if(!!date){
                    date= new Date()
                    console.log('not empty', date.valueOf(), !!date,data.config.type)
                    data.set_selectedDay(null)
                    date.setHours(data.config.minTime)
                    date.setMinutes(0)
                }

            }
            //console.log(date.valueOf(),date/*,time.hours,time.minutes*/,entangleData,data.selectedDay)
            break
    }


    if (data.configTypeMatch(['date', 'range']) && data.config.minDate && data.config.maxDate) {
        date = new Date(data.config.minDate)
    }

    data.day = date
    data.getDates()
};


