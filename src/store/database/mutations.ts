import * as types from './mutation-types'

const mutations = {
  [types.INIT](state, item) {
    state.database = item.database;
  },
}

export default mutations;