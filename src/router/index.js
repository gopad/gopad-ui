import Vue from 'vue'
import Router from 'vue-router'

import DashboardIndex from '../views/dashboard/index.vue'
import ProfileIndex from '../views/profile/index.vue'
import NotfoundIndex from '../views/notfound/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'uk-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardIndex
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileIndex
    },
    {
      path: '/*',
      name: 'catchall',
      component: NotfoundIndex
    }
  ]
})
