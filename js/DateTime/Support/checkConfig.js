import {Period} from "./dateSupport";

/**
 *
 * @param {Object<webplusDateTime>} data
 */
export const checkConfig = data => {
    let date
    if (Array.isArray(data.get_selectedDay()) && data.get_selectedDay().length === 2){
       date = new Date(data.get_selectedDay()[0])
        data.selectedDay = data.rangeSelected  = { start_at :  new Date(data.get_selectedDay()[0]) ,end_at : new Date(data.get_selectedDay()[1]) }
        data.periodRange = Period.createFromRange(data.rangeSelected)
    }
    else {
        date = new Date(data.get_selectedDay())
        data.selectedDay = date
    }

    //console.log(date,data.get_selectedDay())

    if (data.configTypeMatch(['date','range']) && data.config.minDate && data.config.maxDate){
            date = new Date(data.config.minDate)
       /* if(data.selectedDay.getTime() < date.getTime() ){
            data.day = date
        }*/
    }
    if (data.configTypeMatch('time')) {
        date.setHours(data.config.minTime)
        date.setMinutes(0)

    }
    data.day = date.toISOString()
};
