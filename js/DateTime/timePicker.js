import {StringTime} from "./Support/dateSupport";

/**
 *
 * @param {{type : string,lang : string,minTime : number, maxTime : number, minuteInterval :number,h12:boolean}} config
 * @param {string} value
 */
export function timePicker (config, value) {
    return {
        config,
        value : new StringTime(value,config),
        value_text : null,
        show : false,
        toggle(){
            this.show = !this.show
        },
        changeHour(delta) {
            if (delta < 0) {
                if (this.value.hours !== this.config.minTime) {
                    this.value.hours -= 1
                }
            } else {
                if (this.value.hours !== this.config.maxTime) {
                    this.value.hours  +=1
                }
            }
        }, changeMinute(delta) {
            if (delta < 0) {
                if (this.value.minutes !== 0) {
                    this.value.minutes -= this.config.minuteInterval
                }
            } else {
                if (this.value.minutes !== (60 - this.config.minuteInterval)) {
                    this.value.minutes += this.config.minuteInterval
                }
            }
        }, 'changeHours': {
            ['x-on:wheel.prevent.stop']() {
                this.changeHour(this.$event.wheelDeltaY)
            },
        }, 'changeMinutes': {
            ['x-on:wheel.prevent.stop']() {
                this.changeMinute(this.$event.wheelDeltaY)
            }
        },


    }
}

export default timePicker
