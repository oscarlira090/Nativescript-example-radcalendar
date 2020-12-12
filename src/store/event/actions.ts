import * as types from './mutation-types'
import Dates from "@/utils/Dates.ts";

export const save = ({ commit, rootGetters, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        rootGetters["database/getDatabase"].execSQL("INSERT INTO event(title,description,startDate,startTime,endDate,endTime,category,priority,isAllDay,reminder,type) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
            [
                data.title,
                data.description,
                data.startDate,
                data.startTime,
                data.endDate,
                data.endTime,
                1,
                "HIGH",
                (data.isAllDay ? 1 : 0),
                data.reminder,
                'event'
            ]).then(function (id) {
                commit(types.SAVE, { data: data });
                dispatch("load", {
                    date: Dates.stringToDate(data.startDate)
                  });
                console.log('Module: Event, Mutation: ', types.SAVE, ' INFO: ', id, data);
                resolve(id)
            }).catch(function (error) {
                console.log("INSERT ERROR", error);
            });
    });
}

export const update = ({ commit, rootGetters, dispatch }, data) => {

    return new Promise((resolve, reject) => {
        rootGetters["database/getDatabase"].execSQL("UPDATE event SET title = ?, description = ?,startDate = ?,startTime = ?,endDate = ?,endTime = ?,category = ?,priority = ?, isAllDay = ?, reminder = ? WHERE id = ?",
            [
                data.title,
                data.description,
                data.startDate,
                data.startTime,
                data.endDate,
                data.endTime,
                1,
                "HIGH",
                (data.isAllDay ? 1 : 0),
                data.reminder,
                data.id
            ]).then(function (id) {
                commit(types.UPDATE, { data: data });
                dispatch("load", {
                    date: Dates.stringToDate(data.startDate)
                  });
                resolve(data)
                console.log('Module: Event, Mutation: ', types.UPDATE, ' INFO: ', id, data);
            }).catch(function (error) {
                console.log("UPDATE ERROR", error);
                reject(error)
            });
    })
}



export const updateScheduledId1 = ({ commit, rootGetters, dispatch }, data) => {

    return new Promise((resolve, reject) => {
        rootGetters["database/getDatabase"].execSQL("UPDATE event SET scheduledId1 = ? WHERE id = ?",
            [
                data.scheduledId,
                data.id
            ]).then(function (id) {
                commit(types.SCHEDULE_ID_1, { data: data });
                resolve(data)
                console.log('Module: Event, Mutation: ', types.SCHEDULE_ID_1, ' INFO: ', id, data);
            }).catch(function (error) {
                console.log("UPDATE ERROR", error);
                reject(error)
            });
    })
}

export const updateScheduledId2 = ({ commit, rootGetters, dispatch }, data) => {

    return new Promise((resolve, reject) => {
        rootGetters["database/getDatabase"].execSQL("UPDATE event SET scheduledId2 = ? WHERE id = ?",
            [
                data.scheduledId,
                data.id
            ]).then(function (id) {
                commit(types.SCHEDULE_ID_2, { data: data });
                resolve(data)
                console.log('Module: Event, Mutation: ', types.SCHEDULE_ID_2, ' INFO: ', id, data);
            }).catch(function (error) {
                console.log("UPDATE ERROR", error);
                reject(error)
            });
    })
}


export const delete_ = ({ commit, rootGetters, dispatch }, data) => {
    return rootGetters["database/getDatabase"].execSQL("DELETE FROM event WHERE id = ?",
        [
            data.id,
        ]).then(function (id) {
            commit(types.DELETE, { data: data });
            dispatch("load", {
                date:new Date()
              });
            console.log('Module: Event, Mutation: ', types.DELETE, ' INFO: ', id, data);
        }).catch(function (error) {
            console.log("DELETE ERROR", error);
        });
}
//load events and tasks
/*
export const load = ({ commit, rootGetters, dispatch }, data) => {
    return rootGetters["database/getDatabase"].all("SELECT * FROM event ORDER BY startDate", []).then(function (result) {
        commit(types.LOAD, { data: result });
        console.log('Module: Event, Mutation: ', types.LOAD, ' INFO: ', result);
    }).catch(function (error) {
        console.log("SELECT ERROR", error);
    })
}
*/
//load events and tasks
export const loadByDatesForCalendar = ({ commit, rootGetters, dispatch }, data) => {
    console.log("SELECT * FROM event WHERE startDate " + Dates.betweenDate(data.date) +  " ORDER BY startDate")
    return rootGetters["database/getDatabase"].all("SELECT * FROM event WHERE startDate " + Dates.betweenDate(data.date) +  " ORDER BY startDate", []).then(function (result) {
        commit(types.LOAD_BY_DATES_FOR_CALENDAR, { data: result });
        console.log('Module: Event, Mutation: ', types.LOAD_BY_DATES_FOR_CALENDAR, ' INFO: ', result);
    }).catch(function (error) {
        console.log("SELECT ERROR", error);
    })
}

export const load = ({ commit, rootGetters, dispatch }, data) => {
    return rootGetters["database/getDatabase"].all("SELECT * FROM event WHERE type = 'event' ORDER BY startDate", []).then(function (result) {
        commit(types.LOAD_EVENTS, { data: result });
        console.log('Module: Event, Mutation: ', types.LOAD_EVENTS, ' INFO: ', result);
    }).catch(function (error) {
        console.log("SELECT ERROR", error);
    })
}

export const loadByTitleAndDates = ({ commit, rootGetters, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        rootGetters["database/getDatabase"].get("SELECT * FROM event WHERE title = ? AND startDate = ? AND startTime = ? AND endDate = ? AND endTime = ?", [
            data.title,
            Dates.formatDate(data.startDate),
            Dates.formatTime(data.startDate),
            Dates.formatDate(data.endDate),
            Dates.formatTime(data.endDate)
        ]).then(function (row) {
            resolve(row)
            commit(types.LOAD_BY_TITLE_AND_DATES, { data: row });
            console.log('Module: Event, Mutation: ', types.LOAD_BY_TITLE_AND_DATES, ' INFO: ', row);
        }).catch(function (error) {
            console.log("SELECT ERROR", error);
            reject(error)
        })
    })
}


export const set = ({ commit, rootGetters, dispatch }, data) => {
    if(data!=null)
        data.isAllDay = data.isAllDay == 1
    commit(types.SET_EVENT, { data: data });
}
