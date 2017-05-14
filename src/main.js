// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueMoment from 'vue-moment'
import VueSlider from 'vue-slider-component'

import 'vue-material/dist/vue-material.css'
import App from './components/App'
import router from './router'
import store from './store'
import './utils/api'

Vue.use(VueMaterial)
Vue.use(VueMoment)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  http: {
    root: '/api',
  },
  template: '<App/>',
  components: { App, VueSlider },
})
