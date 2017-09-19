import { mount } from 'avoriaz'
import assert from 'assert'
import sinon from 'sinon'
import Vuex from 'vuex'

import Auth from 'src/components/Auth'
import AuthModule from 'src/store/modules/Auth'

Vue.use(Vuex)

describe('Auth', function () {
  let wrapper = {}
  let isAuthorized = false
  AuthModule.actions.verifyToken = () => { return sinon.stub().resolves(isAuthorized)() }
  const $router = { push: () => { return sinon.stub() } }
  const store = new Vuex.Store({ state: { authUrl: '' }, modules: { Auth: AuthModule } })

  function next(cb) {
    if (!cb) return false
    cb(wrapper.vm)
  }

  describe('beforeRouteEnter()', function () {
    it('stores token when the url contains hash', async function () {
      wrapper = mount(Auth, { store, globals: { $router } })
      const token = await wrapper.vm.$options.beforeRouteEnter({ hash: '#test' }, '', next)
      assert(token === 'test')
      assert(wrapper.vm.$store.state.Auth.token === 'test')
    })

    it('returns true when authorized', async function () {
      wrapper = mount(Auth, { store, globals: { $router } })
      isAuthorized = true
      const result = await wrapper.vm.$options.beforeRouteEnter({}, '', next)
      assert(result)
    })

    it('returns false when not authorized', async function () {
      wrapper = mount(Auth, { store, globals: { $router } })
      isAuthorized = false
      const result = await wrapper.vm.$options.beforeRouteEnter({}, '', next)
      assert(!result)
    })
  })
})
