import {Period} from "./Support/dateSupport";

export function btnUpDownDate() {
    return {
        isBtnCanDown(nb) {
            if (this.config.minDate) {
                let date = this.getDates()[nb]
                const period = Period.createFromDate(new Date(this.config.minDate), new Date(this.config.maxDate))
                return !period.isBetween(date)
            }
            return false

        },
        'upBtnDate': {
            ['x-on:click.prevent']() {
                if (this.config.minDate) {
                    if (this.isBtnCanDown(41)) return //41 , take the last date show on calendar
                }
                 this.upMonth()
            },
            [':class']() {
                return {
                    'line-through cursor-not-allowed hover:!text-slate-300 !text-slate-300': this.isBtnCanDown(41)
                }
            }
        },
        'downBtnDate': {
            ['x-on:click.prevent']() {
                if (this.config.minDate) {
                    if (this.isBtnCanDown(0)) return
                }
                this.downMonth()
            },
            [':class']() {
                return {
                    'line-through cursor-not-allowed hover:!text-slate-300 !text-slate-300': this.isBtnCanDown(0)
                }
            }
        }

    }
}
