export default class Reminder {
    static readonly _NO_ALERTS = 'NO ALERTS'
    static readonly _10_MINUTES_BEFORE = '10 MINUTES BEFORE'
    static readonly _1_HOUR_BEFORE = '1 HOUR BEFORE'
    static readonly _1_DAY_BEFORE = '1 DAY BEFORE'

    static getReminders() {
        return [this._NO_ALERTS, this._10_MINUTES_BEFORE, this._1_HOUR_BEFORE, this._1_DAY_BEFORE]
    }
    
}