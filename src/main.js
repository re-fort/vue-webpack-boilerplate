// App Setting
import 'filters'
import settings from 'settings'
import axios from 'axios'
import router from './router'
import store from './store'
import VuexRouterSync from 'vuex-router-sync'
import VueAnalytics from 'vue-analytics'

import App from 'App'

// Sass
import 'stylesheets/bulma'

// axios
Vue.prototype.$http = axios

// vue-router and vuex store in sync.
VuexRouterSync.sync(store, router)

// GA tracking
Vue.use(VueAnalytics, {
  id: settings.GA.trackingId,
  router,
  checkDuplicatedScript: true,
})

new Vue({
  router,
  store,
  template: '<App ref="app" />',
  components: {
    'App': App,
  },
}).$mount('#app')
