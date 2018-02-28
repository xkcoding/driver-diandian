import * as types from './mutation-types'

export const login = function ({commit}) {
  commit(types.SET_USER, {user: 'xkcoding'})
}
