// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as firebase from 'firebase'

import { sync } from 'vuex-router-sync'
import { config } from './firebase'

sync(store, router)

Vue.config.productionTip = false
Vue.prototype.$firebase = firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
