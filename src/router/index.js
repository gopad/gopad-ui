import Vue from 'vue'
import VueRouter from 'vue-router'

import DashboardIndex from '../views/dashboard/index.vue'
import ProfileIndex from '../views/profile/index.vue'
import NotfoundIndex from '../views/notfound/index.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior: () => ({ y: 0 }),
  linkActiveClass: 'uk-active',
  routes: [
     { path: '/', component: DashboardIndex },
     { path: '/profile', component: ProfileIndex },
     { path: '/*', component: NotfoundIndex }
  ]
})
