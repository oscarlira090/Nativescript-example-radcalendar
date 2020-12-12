import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import { ObservableArray } from "@nativescript/core/data/observable-array";
const EventModule = {
    namespaced: true,
    state: { 
      event:null,
      events: new ObservableArray([]),
      eventsCalendar: new ObservableArray([]),
     },
     mutations,
     actions,
     getters,
     strict: true,
  }

  export default EventModule;