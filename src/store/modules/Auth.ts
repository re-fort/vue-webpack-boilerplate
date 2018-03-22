import Vue from 'vue'
import { ActionContext } from 'vuex'
import { Xhr } from 'src/api/index'
import { IRootState, IAuthState } from 'src/interfaces/store';

export const state: IAuthState = {
  token: '',
}

export const actions = {
  verifyToken({ commit, state }: ActionContext<IAuthState, IRootState>) {
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
  updateToken (state: IAuthState, token: string) {
    state.token = token
  },
}

export const getters = {
  isLoggedIn(state: IAuthState) {
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
