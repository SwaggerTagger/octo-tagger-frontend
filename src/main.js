// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import vueMoment from 'vue-moment'
import App from './components/App'
import router from './router'
import './utils/api'
import store from './store'

Vue.use(VueMaterial)
Vue.use(vueMoment)
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
  components: { App },
})
