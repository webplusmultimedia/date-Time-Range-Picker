import {webplusDateTime} from "./DateTime/dateTime";
import time from "./DateTime/time";
import {listeDate} from "./DateTime/listeDate";
import {btnUpDownDate} from "./DateTime/btnUpDownDate";
import timePicker from "./DateTime/timePicker";
document.addEventListener('alpine:init', () => {
    window.Alpine.data('webplusDateTime', webplusDateTime)
    window.Alpine.data('listeDate', listeDate)
    window.Alpine.data('time', time)
    window.Alpine.data('btnUpDownDate', btnUpDownDate)
    window.Alpine.data('timePicker', timePicker)
})
