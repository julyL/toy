import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'search',
      component: require('@/router/searchInput').default
    },
    {
      path: '/quickStart',
      name: 'quickStart',
      component: require('@/router/quickStart').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
