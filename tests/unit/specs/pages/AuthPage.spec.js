import { mount, createLocalVue } from 'vue-test-utils'
import assert from 'assert'
import sinon from 'sinon'
import Vuex from 'vuex'

import AuthPage from 'src/pages/AuthPage'
import AuthModule from 'src/store/modules/Auth'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AuthPage', function () {
  let wrapper
  let isAuthorized = false
  AuthModule.actions.verifyToken = () => sinon.stub().resolves(isAuthorized)()
  const $router = { push: () => sinon.stub() }
  const $toast = { open: () => sinon.stub() }
  const store = new Vuex.Store({ state: { authUrl: '' }, modules: { Auth: AuthModule } })

  function next(cb) {
    if (!cb) return false
    cb(wrapper.vm)
  }

  describe('beforeRouteEnter()', function () {
    it('stores token when the url contains hash', async function () {
      wrapper = mount(AuthPage, { store, mocks: { $router, $store: store, $toast } })
      const token = await wrapper.vm.$options.beforeRouteEnter({ hash: '#test' }, '', next)
      assert(token === 'test')
      assert(wrapper.vm.$store.state.Auth.token === 'test')
    })

    it('returns true when authorized', async function () {
      wrapper = mount(AuthPage, { store, mocks: { $router, $store: store, $toast } })
      isAuthorized = true
      const result = await wrapper.vm.$options.beforeRouteEnter({}, '', next)
      assert(result)
    })

    it('returns false when not authorized', async function () {
      wrapper = mount(AuthPage, { store, mocks: { $router, $store: store, $toast } })
      isAuthorized = false
      const result = await wrapper.vm.$options.beforeRouteEnter({}, '', next)
      assert(!result)
    })
  })
})
