import * as types from './mutation-types'

const mutations = {
  [types.SET_USER](state, user) {
    state.user = user
  },
  [types.UPDATE_DIRECTION](state, payload) {
    state.direction = payload.direction
  }
}

export default mutations
