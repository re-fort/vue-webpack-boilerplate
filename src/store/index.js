import Vuex from 'vuex'
import Auth from './modules/Auth'
import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'
import Settings from 'settings'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authUrl: `${Settings.Api.baseUrl}/auth`,
  },
  modules: {
    Auth,
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      paths: ['Auth.token'],
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 1, secure: process.env.NODE_ENV === 'production' }),
    })
  ],
})
