import * as types from './mutation-types'
import Dates from "@/utils/Dates.ts";

export const save = ({ commit, rootGetters, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        rootGetters["database/getDatabase"].execSQL("INSERT INTO event(title,description,startDate,startTime,endDate,endTime,category,priority,isAllDay,reminder,type,dueDate,dueTime, reminder2) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                data.title,
                data.description,
                data.startDate,
                data.startTime,
                data.endDate,
                data.endTime,
                1,
                "HIGH",
                0,
                data.reminder,
                'task',
                data.dueDate,
                data.dueTime,
                data.reminder2
            ]).then(function (id) {
                commit(types.SAVE, { data: data });
                dispatch("task/load", {
                    date: Dates.stringToDate(data.startDate)
                }, { root: true });
                console.log('Module: Task, Mutation: ', types.SAVE, ' INFO: ', id, data);
                resolve(id)
            }).catch(function (error) {
                console.log("INSERT ERROR", error);
            });
    });
}

export const update = ({ commit, rootGetters, dispatch }, data) => {

    return new Promise((resolve, reject) => {
        rootGetters["database/getDatabase"].execSQL("UPDATE event SET title = ?, description = ?,startDate = ?,startTime = ?,endDate = ?,endTime = ?,category = ?,priority = ?, isAllDay = ?, reminder = ?, dueDate = ?, dueTime = ?, reminder2 = ? WHERE id = ?",
            [
                data.title,
                data.description,
                data.startDate,
                data.startTime,
                data.endDate,
                data.endTime,
                1,
                "HIGH",
                0,
                data.reminder,
                data.dueDate,
                data.dueTime,
                data.reminder2,
                data.id
            ]).then(function (id) {
                commit(types.UPDATE, { data: data });
                dispatch("task/load", {
                    date: Dates.stringToDate(data.startDate)
                }, { root: true });
                resolve(data)
                console.log('Module: Task, Mutation: ', types.UPDATE, ' INFO: ', id, data);
            }).catch(function (error) {
                console.log("UPDATE ERROR", error);
                reject(error)
            });
    })
}


export const updateDone = ({ commit, rootGetters, dispatch }, data) => {

    return new Promise((resolve, reject) => {
        rootGetters["database/getDatabase"].execSQL("UPDATE event SET done = ? WHERE id = ?",
            [
                (data.done ? 1 : 0),
                data.id
            ]).then(function (id) {
                commit(types.UPDATE_DONE, { data: data });
                dispatch("task/load", {}, { root: true });
                resolve(data)
                console.log('Module: Task, Mutation: ', types.UPDATE_DONE, ' INFO: ', id, data);
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
            dispatch("task/load", {}, { root: true });
            console.log('Module: Task, Mutation: ', types.DELETE, ' INFO: ', id, data);
        }).catch(function (error) {
            console.log("DELETE ERROR", error);
        });
}

export const load = ({ commit, rootGetters, dispatch }, data) => {
    return rootGetters["database/getDatabase"].all("SELECT * FROM event WHERE type = 'task' ORDER BY startDate ", []).then(function (result) {
        commit(types.LOAD_TASKS, { data: result });
        console.log('Module: Task, Mutation: ', types.LOAD_TASKS, ' INFO: ', result);
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
    commit(types.SET_TASK, { data: data });
}
