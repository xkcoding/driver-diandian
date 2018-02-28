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
import fastclick from 'fastclick'
import moment from 'moment'
import lodash from 'lodash'
import axios from 'axios'
import App from './App'
import router from './router'
import 'common/stylus/icon.styl'

Vue.use(Cube)
Vue.use(YDUI)
Vue.use(VueLazyload)
Vue.prototype.$moment = moment
Vue.prototype.$lodash = lodash
Vue.prototype.$http = axios

const debug = process.env.NODE_ENV !== 'production'
Vue.config.productionTip = debug

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
