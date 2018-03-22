// axios handling
import Vue from 'vue'
import { AxiosRequestConfig } from 'axios'
import Settings from 'src/config/settings'

export const URL = {
  FETCH_REPOSITORIES: '/search/repositories',
  FETCH_USERS: '/search/users',
  FETCH_FOLLOWERS: '/user/followers',
  FETCH_FOLLOWING: '/user/following',
}

export class Xhr {
  static getWithToken(url: string, params: AxiosRequestConfig = {}, token: string) {
    params.headers = { 'Authorization' : `Bearer ${token}` }
    return this._call(url, params)
  }

  static getWithoutToken(url: string, params = {}) {
    return this._call(url, params)
  }

  static _call(url: string, params = {}) {
    return Vue.prototype.$http.get(Settings.Api.baseUrl + url, params)
  }
}
