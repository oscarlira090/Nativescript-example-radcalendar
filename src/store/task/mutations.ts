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
  [types.LOAD_TASKS](state, data) {
    state.tasks = []
    for (let i = 0; i < data.data.length; i++) {
      state.tasks.push({
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
        done: data.data[i][17],
      });
    }
  },
  [types.LOAD_BY_TITLE_AND_DATES](state, item) {
    //state.event = item;
    //state.events.push(item)
  },
  [types.SET_TASK](state, item) {
    state.task = item.data;
  },
}

export default mutations;