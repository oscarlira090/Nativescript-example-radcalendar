import Vue from 'vue';
import Vuex from 'vuex';
import eventModule from './store/event/module'
import taskModule from './store/task/module'
import databaseModule from './store/database/module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    event:eventModule,
    task:taskModule,
    database:databaseModule
  },
});
