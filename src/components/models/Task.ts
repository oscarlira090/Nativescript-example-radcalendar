import Dates from "@/utils/Dates.ts";
import Reminder from "@/components/models/Reminder.ts";
import Event from "@/components/models/Event.ts";


export default class Task extends Event{
    
    reminder2:string
    
    constructor() {
        super()
        let date = new Date();
        this.id = 0
        this.title = ''
        this.description = ''
        this.startDate = Dates.formatDate(date)
        this.startTime = Dates.formatTime(date)
        this.isAllDay = true
        this.endDate = Dates.formatDate(date)
        this.endTime = Dates.formatTime(date)
        this.reminder = Reminder._NO_ALERTS
        this.reminder2 = Reminder._NO_ALERTS
        
    }
}
