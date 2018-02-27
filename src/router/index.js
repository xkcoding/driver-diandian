import Vue from 'vue'
import VueRouter from 'vue-router'
import Routers from './router'

Vue.use(VueRouter)

const RouterConfig = {
  routes: Routers
}

const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
