import Vue from 'vue'

import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

import store from './store'
import router from './router'
import * as filters from './filters'

import App from './app.vue'

UIkit.use(Icons)

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

new Vue({
  http: {
    root: window.INITIAL_STATE['api']
  },

  store,
  router,
  render: h => h(App)
}).$mount('#app');
