import { LocalNotifications } from "nativescript-local-notifications";
import Event from "@/components/models/Event.ts";
import Reminder from "@/components/models/Reminder.ts";
import Dates from "@/utils/Dates.ts";
import store from '@/store'

export default class Notification {
    static addNotification(event: Event, id: number, reminderNumber: number) {
        if (event.reminder == Reminder._NO_ALERTS) return;

        LocalNotifications.schedule([{
            //id: id, // generated id if not set
            title: 'Calendar',
            body: event.title,
            ticker: 'The ticker',
            //color: new Color("red"),
            badge: 1,
            //groupedMessages:["The first", "Second", "Keep going", "one more..", "OK Stop"], //android only
            //groupSummary:"Summary of the grouped messages above", //android only
            ongoing: true, // makes the notification ongoing (Android only)
            //icon: 'res://heart',
            //image: "https://cdn-images-1.medium.com/max/1200/1*c3cQvYJrVezv_Az0CoDcbA.jpeg",
            //thumbnail: true,
            //interval: 'minute',
            channel: 'My Channel', // default: 'Channel'
            //sound: "customsound-ios.wav", // falls back to the default sound on Android
            at: Notification.calcReminder(event, reminderNumber)
        }]).then(
            function (scheduledIds) {
                console.log("Notification id(s) scheduled: " + JSON.stringify(scheduledIds));
                let data = {
                    scheduledId: scheduledIds[0],
                    id: id
                }
                if (reminderNumber == 1) {
                    store.dispatch('event/updateScheduledId1', data)
                }
                else {
                    store.dispatch('event/updateScheduledId2', data)
                }
            },
            function (error) {
                console.log("scheduling error: " + error);
            }
        )
    }


    static calcReminder(event: Event, reminderNumber: number) {
        let at = null
        if (reminderNumber == 1) {
            at = Dates.stringToDateTime(event.startDate, event.startTime)
        } else {
            at = Dates.stringToDateTime(event.dueDate, event.dueTime)
        }

        switch (event.reminder) {
            case Reminder._10_MINUTES_BEFORE: {
                console.log('remeinder at', Dates.substract(at, Dates.MINUTE, 10))
                return Dates.substract(at, Dates.MINUTE, 10)
            }
            case Reminder._1_HOUR_BEFORE: {
                console.log('remeinder at', Dates.substract(at, Dates.HOUR, 1))
                return Dates.substract(at, Dates.HOUR, 1)
            }
            case Reminder._1_DAY_BEFORE: {
                console.log('remeinder at', Dates.substract(at, Dates.DAY, 1))
                return Dates.substract(at, Dates.DAY, 1)
            }
        }
        return at
    }

    static cancelNotification(id: number) {
        LocalNotifications.cancel(id).then(
            function (foundAndCanceled) {
                if (foundAndCanceled) {
                    console.log("OK, it's gone!", id);
                } else {
                    console.log("No ID "+id+" was scheduled");
                }
            }
        )
    }

}