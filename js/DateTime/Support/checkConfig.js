import {Period,getDateTime} from "./dateSupport";

/**
 *
 * @param {Object<webplusDateTime>} data
 */
export const checkConfig = data => {
    let date
    if (Array.isArray(data.get_selectedDay()) && data.get_selectedDay().length === 2){
       date = new Date(data.get_selectedDay()[0])
       let date2 = new Date(data.get_selectedDay()[1])
        date = getDateTime(date)
        date2 = getDateTime(date2)
        data.selectedDay = data.rangeSelected  = { start_at :  date ,end_at : date2 }
        data.periodRange = Period.createFromRange(data.rangeSelected)
    }
    else {
        date = getDateTime(new Date(data.get_selectedDay()))
        data.selectedDay = date
    }

    if (data.configTypeMatch(['date','range']) && data.config.minDate && data.config.maxDate){
            date = new Date(data.config.minDate)

       /* if(data.selectedDay.getTime() < date.getTime() ){
            data.day = date
        }*/
    }
    if (data.configTypeMatch('time') && !data.get_selectedDay()) {
        date.setHours(data.config.minTime)
        date.setMinutes(0)
        console.log(date.toLocaleDateString())
    }
    data.day = date.toISOString()
    data.getDates()
};


