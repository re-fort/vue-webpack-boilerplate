import { Xhr } from 'api'

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
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Xhr.getWithToken('/verify', {}, state.token)
        resolve(res.data.valid)
      } catch(error) {
        console.error(error)
        reject(false)
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
