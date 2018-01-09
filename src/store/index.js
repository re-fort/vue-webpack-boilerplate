import Vuex from 'vuex'
import Auth from './modules/Auth'
import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const state = {
  loading: false,
}

export const mutations = {
  updateLoading (state, loading) {
    state.loading = loading
  },
}

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    Auth,
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      paths: ['Auth.token'],
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 1, secure: process.env.NODE_ENV === 'production' }),
    }),
  ],
})
