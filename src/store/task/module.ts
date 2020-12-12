import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import { ObservableArray } from "@nativescript/core/data/observable-array";
const TaskModule = {
    namespaced: true,
    state: { 
      task:null,
      tasks: new ObservableArray([]),
     },
     mutations,
     actions,
     getters,
     strict: true,
  }

  export default TaskModule;