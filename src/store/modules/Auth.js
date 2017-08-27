import { Xhr } from 'lib/axios'

const state = {
  token: '',
}

const mutations = {
  token (state, token) {
    state.token = token
  },
}

const actions = {
  updateToken({ commit }, token) {
    commit('token', token)
  },

  verifyToken({ state }) {
    return new Promise((resolve, reject) => {
      Xhr.getWithToken('/verify', {}, state.token, (response) => {
        resolve(response.data.valid)
      }, (error) => {
        console.error(error)
        reject(false)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
