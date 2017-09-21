import { mount } from 'vue-test-utils'
import assert from 'assert'

import App from 'src/App'
import { stubComponent } from 'tests/unit/stubs/component'

describe('App', function () {
  const routerView = stubComponent.create('router-view')
  const routerLink = stubComponent.create('router-link')

  Vue.component(routerView.name, routerView)
  Vue.component(routerLink.name, routerLink)

  it('renders "log in" when not loginned', function () {
    const $store = { state: { Auth: { token: '', authUrl: '' } } }
    const wrapper = mount(App, { intercept: { $store } })
    const element = wrapper.find('.navbar-item.button.is-primary.is-inverted.is-outlined')
    assert(element.text() === 'log in')
  })

  it('renders "log out" when loginned', function () {
    const $store = { state: { Auth: { token: 'test', authUrl: '' } } }
    const wrapper = mount(App, { intercept: { $store } })
    const element = wrapper.find('.navbar-item.button.is-primary.is-inverted.is-outlined')
    assert(element.text() === 'log out')
  })
})
