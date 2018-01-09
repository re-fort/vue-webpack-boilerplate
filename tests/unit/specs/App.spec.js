import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import assert from 'assert'

import App from 'src/App'
import AuthModule from 'src/store/modules/Auth'
import { stubComponent } from 'tests/unit/stubs/component'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('App', function () {
  const routerView = stubComponent.create('router-view')
  const routerLink = stubComponent.create('router-link')

  Vue.component(routerView.name, routerView)
  Vue.component(routerLink.name, routerLink)

  //delete mounted hook, because it contains methods to need a stub
  delete App.created

  const authStore = {
    namespaced: true,
    mutations: AuthModule.mutations,
    getters: AuthModule.getters,
  }

  it('renders "log in" when not loginned', function () {
    const store = new Vuex.Store({
      modules: {
        Auth: {
          ...authStore,
          state: { token: '' },
        },
      },
    })
    const wrapper = mount(App, { localVue, store })
    const element = wrapper.find('.navbar-item.button.is-primary.is-inverted.is-outlined')
    assert(element.text() === 'log in')
  })

  it('renders "log out" when loginned', function () {
    const store = new Vuex.Store({
      modules: {
        Auth: {
          ...authStore,
          state: { token: 'test' },
        },
      },
    })
    const wrapper = mount(App, { localVue, store })
    const element = wrapper.find('.navbar-item.button.is-primary.is-inverted.is-outlined')
    assert(element.text() === 'log out')
  })
})
