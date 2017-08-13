// App Setting
import 'filters'
import axios from 'axios'
import router from './router'

import App from 'App'

// Sass
import 'stylesheets/bulma'
import 'stylesheets/app'

// axios
Vue.prototype.$http = axios

new Vue({
  router,
  template: '<App ref="app" />',
  components: {
    'App': App
  },
}).$mount('#app')
