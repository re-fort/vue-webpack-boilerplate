// App Setting
import 'filters.js'
import routes from 'routes.js'
import App from 'App.vue'

// Scss
import 'stylesheets/bulma.scss'
import 'stylesheets/app.scss'

// Vue Resource
Vue.use(VueResource)

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