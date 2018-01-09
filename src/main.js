// App Setting
import 'filters'
import settings from './config/settings'
import axios from 'axios'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import VuexRouterSync from 'vuex-router-sync'
import VueAnalytics from 'vue-analytics'

import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

import App from 'App'

// Sass
import 'stylesheets/bulma'

// Sentry
Raven.config(settings.Sentry.url).addPlugin(RavenVue, Vue).install()
Vue.prototype.$raven = Raven

// axios
Vue.prototype.$http = axios

// vue-router and vuex store in sync.
VuexRouterSync.sync(store, router)

// Buefy
Vue.use(Buefy, {
  defaultIconPack: 'fa',
})

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
