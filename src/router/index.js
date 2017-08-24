// vue-router
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

let router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
  // requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('Auth/verifyToken')
      .then((valid) => {
        valid ? next() : next({ path: '/auth' })
      })
      .catch(() => {
        next({ path: '/auth' })
      })
  } else {
    next()
  }
})

export default router
