// axios handling
import Settings from 'settings'

export const URL = {
  FETCH_REPOSITORIES: '/search/repositories',
  FETCH_USERS: '/search/users',
  FETCH_FOLLOWERS: '/user/followers',
  FETCH_FOLLOWING: '/user/following',
}

export class Xhr {
  static getWithToken(url, params = {}, token) {
    params.headers = { 'Authorization' : `Bearer ${token}` }
    return this._call(url, params)
  }

  static getWithoutToken(url, params = {}) {
    return this._call(url, params)
  }

  static _call(url, params = {}) {
    return Vue.prototype.$http.get(Settings.Api.baseUrl + url, params)
  }
}
