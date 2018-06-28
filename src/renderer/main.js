import Vue from 'vue'

import App from './App'
import router from './router.js'
import $ from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '_src/util/db.js';
import logger from '../util/logger'
window.onerror = function (err, msg) {
  logger(err + ':' + msg)
  console.log('error' + msg);
}
logger.log("render __static", __static)
Vue.use(ElementUI);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  template: '<App/>'
}).$mount('#app')