import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
const DatabaseModule = {
    namespaced: true,
    state: { 
      database:null,
     },
     mutations,
     actions,
     getters,
     strict: true,
  }

  export default DatabaseModule;