import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/Auth'
import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'
import { IRootState } from 'src/interfaces/store'

Vue.use(Vuex)

export const state: IRootState = {
  loading: false,
}

export const mutations = {
  updateLoading (state: IRootState, loading: boolean) {
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
      getState: (key: string) => Cookies.getJSON(key),
      setState: (key: string, state: IRootState) => Cookies.set(key, state, { expires: 1, secure: process.env.NODE_ENV === 'production' }),
    }),
  ],
})
