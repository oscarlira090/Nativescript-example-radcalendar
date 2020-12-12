import Dates from "@/utils/Dates.ts";
import Reminder from "@/components/models/Reminder.ts";


export default class Event {
    id: number
    title: string;
    description: string
    startDate: string
    startTime: string
    isAllDay:boolean
    endDate: string
    endTime: string
    //category: number
    //priority: number
    reminder:string
    dueDate: string
    dueTime: string
    scheduleid1:number
    scheduleid2:number

    constructor() {
        let date = new Date();
        this.id = 0
        this.title = ''
        this.description = ''
        this.startDate = Dates.formatDate(date)
        this.startTime = Dates.formatTime(date)
        this.isAllDay = false
        this.endDate = Dates.formatDate(date)
        this.endTime = Dates.formatTime(date)
        this.reminder = Reminder._NO_ALERTS
        this.dueDate = Dates.formatDate(date)
        this.dueTime = Dates.formatTime(date)
        this.scheduleid1 = 0
        this.scheduleid2 = 0
    }
}
