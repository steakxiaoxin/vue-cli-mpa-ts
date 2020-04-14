import Vue from 'vue'
import { Button } from 'element-ui'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
