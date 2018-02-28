// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import Cube from 'cube-ui'
import VueLazyload from 'vue-lazyload'
/* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css'
import App from './App'
import router from './router'
import 'common/stylus/icon.styl'

Vue.use(Cube)
Vue.use(YDUI)
Vue.use(VueLazyload)

const debug = process.env.NODE_ENV !== 'production'
Vue.config.productionTip = debug

document.addEventListener('DOMContentLoaded', function () {
  /* eslint-disable no-undef */
  typeof FastClick === 'function' && FastClick.attach(document.body)
}, false)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
