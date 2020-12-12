import * as types from './mutation-types'
import { CalendarEvent } from 'nativescript-ui-calendar';
import { Color } from '@nativescript/core/color';

const mutations = {
  [types.SAVE](state, item) {
    //state.event = item;
    //state.events.push(item)
  },
  [types.UPDATE](state, item) {
    //state.event = item;
    //state.events.push(item)
  },
  [types.SCHEDULE_ID_1](state, item) {
    //state.event = item;
    //state.events.push(item)
  },
  [types.SCHEDULE_ID_2](state, item) {
    //state.event = item;
    //state.events.push(item)
  },
  [types.LOAD](state, data) {
    state.events = []
    state.eventsCalendar = []
    for (let i = 0; i < data.data.length; i++) {
      state.events.push({
        id: data.data[i][0],
        title: data.data[i][1],
        description: data.data[i][2],
        startDate: data.data[i][3],
        startTime: data.data[i][4],
        endDate: data.data[i][5],
        endTime: data.data[i][6],
        //reminder: data.data[i][7],
        //category: data.data[i][8],
        //priority: data.data[i][9],
        isAllDay: data.data[i][10],
        type: data.data[i][11],
      });
    }
  },
  [types.LOAD_BY_DATES_FOR_CALENDAR](state, data) {
    state.eventsCalendar = []
    for (let i = 0; i < data.data.length; i++) {
      let startDate = data.data[i][3];
      let endDate = data.data[i][5];

      let startTime = data.data[i][4];
      let endTime = data.data[i][6];
      let isAllDay = Boolean(data.data[i][10]);
      let type = data.data[i][11].toString();

      startDate = startDate.split('-')
      startTime = startTime.split(':')
      endDate = endDate.split('-')
      endTime = endTime.split(':')

      startDate = new Date(startDate[0], startDate[1] - 1, startDate[2], startTime[0], startTime[1])
      endDate = new Date(endDate[0], endDate[1] - 1, endDate[2], endTime[0], endTime[1])
      let color = new Color("#0288D1");
      if(type=='event'){
        color = new Color("#009688")
      }
      state.eventsCalendar.push(new CalendarEvent(data.data[i][1], startDate, endDate, isAllDay, color));
    }
    console.log('calendar events: ', state.eventsCalendar)
  },

  [types.LOAD_EVENTS](state, data) {
    state.events = []
    for (let i = 0; i < data.data.length; i++) {
      state.events.push({
        id: data.data[i][0],
        title: data.data[i][1],
        description: data.data[i][2],
        startDate: data.data[i][3],
        startTime: data.data[i][4],
        endDate: data.data[i][5],
        endTime: data.data[i][6],
        reminder: data.data[i][7],
        //category: data.data[i][8],
        //priority: data.data[i][9],
        isAllDay: data.data[i][10],
        type: data.data[i][11],
        dueDate: data.data[i][12],
        dueTime: data.data[i][13],
        reminder2: data.data[i][14],
        scheduleid1: data.data[i][15],
        scheduleid2: data.data[i][16],
      });
    }
  },
  [types.LOAD_BY_TITLE_AND_DATES](state, item) {
    console.log('eventselect: ', item)
    //state.event = item;
    //state.events.push(item)
  },
  [types.SET_EVENT](state, item) {
    state.event = item.data;
  },
}

export default mutations;