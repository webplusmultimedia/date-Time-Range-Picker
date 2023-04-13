export default function () {
    return {
        changeHour(delta) {
            if (delta < 0) {
                if (this.selectedDay.getHours() !== this.config.minTime) {
                    this.selectedDay = new Date(this.selectedDay.setHours(this.selectedDay.getHours() - 1))
                }
            } else {
                if (this.selectedDay.getHours() !== this.config.maxTime) {
                    this.selectedDay = new Date(this.selectedDay.setHours(this.selectedDay.getHours() + 1))
                }
            }
        }, changeMinute(delta) {
            if (delta < 0) {
                if (this.selectedDay.getMinutes() !== 0) {
                    this.selectedDay = new Date(this.selectedDay.setMinutes(this.selectedDay.getMinutes() - this.config.rangeMinuteBy))
                }
            } else {
                if (this.selectedDay.getMinutes() !== (60 - this.config.rangeMinuteBy)) {
                    this.selectedDay = new Date(this.selectedDay.setMinutes(this.selectedDay.getMinutes() + this.config.rangeMinuteBy))
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
