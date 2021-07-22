import Vue from 'vue'
import axios from 'axios'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Antd);
// Vue.use(VueResource)
// Vue.http.options.root = 'http://127.0.0.1:80';
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
