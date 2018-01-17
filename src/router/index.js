// vue-router
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

let router = new VueRouter({ routes })

router.beforeEach(async (to, from, next) => {
  try {
    store.commit('updateLoading', true)

    // requires authentication
    if (to.matched.some(record => record.meta.requiresAuth)) {
      const valid = await store.dispatch('Auth/verifyToken')
      valid ? next() : next({ path: '/auth' })
    } else {
      next()
    }
  } catch(e) {
    next({path: '/auth'})
  } finally {
    store.commit('updateLoading', false)
  }
})

export default router
