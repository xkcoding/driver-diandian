import Vue from 'vue'
import VueRouter from 'vue-router'
import Routers from './router'
import store from '../store'
import {UPDATE_DIRECTION} from '../store/mutation-types'
import storage from 'good-storage'

Vue.use(VueRouter)

const RouterConfig = {
  routes: Routers
}

const router = new VueRouter(RouterConfig)

let history = storage.session
history.clear()
let historyCount = history.get('count') * 1 || 0
history.set('/', 0)
let isFirst = true

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  const toIndex = history.get(to.path)
  const fromIndex = history.get(from.path)
  if (isFirst) {
    isFirst = false
    ++historyCount
    history.set('count', historyCount)
    store.commit(UPDATE_DIRECTION, {direction: ''})
  } else {
    if (toIndex) {
      if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
        store.commit(UPDATE_DIRECTION, {direction: 'forward'})
      } else {
        store.commit(UPDATE_DIRECTION, {direction: 'reverse'})
      }
    } else {
      ++historyCount
      history.set('count', historyCount)
      if (to.path !== '/') {
        history.set(to.path, historyCount)
        store.commit(UPDATE_DIRECTION, {direction: 'forward'})
      } else {
        store.commit(UPDATE_DIRECTION, {direction: 'reverse'})
      }
    }
  }
  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
