// axios handling
import Settings from 'settings'

export class Xhr {
  static getWithToken(url, params = {}, token, success = null, failure = null) {
    params.headers = { 'Authorization' : `Bearer ${token}`}
    Vue.prototype.$http.get(Settings.Api.baseUrl + url, params).then(success).catch(failure)
  }

  static getWithoutToken(url, params = {}, success = null, failure = null) {
    Vue.prototype.$http.get(Settings.Api.baseUrl + url, params).then(success).catch(failure)
  }
}
