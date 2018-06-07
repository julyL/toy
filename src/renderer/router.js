import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
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
    path: '/desktop',
    name: 'desktop',
    component: require('@/router/desktop').default,
    children: [{
      path: 'staticServer',
      name: 'staticServer',
      component: require('@/router/staticServer').default,
    }, {
      path: 'minifyimg',
      name: 'minifyimg',
      component: require('@/router/minifyimg').default,
    }, {
      path: 'qrcode',
      name: 'qrcode',
      component: require('@/router/qrcode').default,
    }, {
      path: 'jsonformat',
      name: 'jsonformat',
      component: require('@/router/jsonformat').default,
    }, {
      path: 'encode',
      name: 'encode',
      component: require('@/router/encode').default,
    }]
  },
  {
    path: '*',
    redirect: '/'
  }
  ]
})