// App Setting
import 'filters.js'
import axios from 'axios'
import routes from 'routes.js'
import VueRouter from 'vue-router'

import App from 'App.vue'

// Scss
import 'stylesheets/bulma.scss'
import 'stylesheets/app.scss'

// axios
Vue.prototype.$http = axios

// Vue Routing
Vue.use(VueRouter)
const router = new VueRouter(routes)
new Vue({
  router,
  template: '<App ref="app" />',
  components: {
    'App': App
  }
}).$mount('#app')