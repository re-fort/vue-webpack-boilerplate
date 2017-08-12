// App Setting
import 'filters'
import axios from 'axios'
import routes from 'routes'
import VueRouter from 'vue-router'

import App from 'App'

// Sass
import 'stylesheets/bulma'
import 'stylesheets/app'

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
