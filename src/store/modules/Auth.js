import { Xhr } from 'api'

export const state = {
  token: '',
}

export const actions = {
  verifyToken({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Xhr.getWithToken('/verify', {}, state.token)
        if (!res.data.valid) commit('updateToken', '')
        resolve(res.data.valid)
      } catch(error) {
        Vue.prototype.$raven.captureException(error)
        reject(false)
      }
    })
  },
}

export const mutations = {
  updateToken (state, token) {
    state.token = token
  },
}

export const getters = {
  isLoggedIn(state) {
    return state.token !== ''
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
