import * as types from './mutation-types'
const Sqlite = require("nativescript-sqlite");

export const init = ({ commit, rootGetters }, data) => {
    (new Sqlite("my.db")).then(db => {
        db.execSQL("CREATE TABLE IF NOT EXISTS event (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT,startDate TEXT, startTime TEXT,endDate TEXT, endTime TEXT, reminder INTEGER, category INTEGER, priority TEXT,isAllDay INTEGER,type TEXT, dueDate TEXT,dueTime TEXT,reminder2 INTEGER,scheduledId1 TEXT,scheduledId2 TEXT,done INTEGER)").then(id => {
            console.log("CREATE TABLE SUCCESS");
            commit(types.INIT, { database: db });
        }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        console.log("OPEN DB ERROR", error);
    });
}
