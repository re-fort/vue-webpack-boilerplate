// Vue-resource handling
import Settings from 'settings'
export class Xhr {
  static get(url, params = {}, success, failure) {
    Vue.http.get(Settings.Api.root + url, params).then(success, failure)
  }
}