import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import assert from 'assert'
import sinon from 'sinon'

import { Xhr } from 'api/index'
import MyPage from 'src/pages/MyPage'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('MyPage', function () {
  const $router = { push: () => { return sinon.stub() } }
  const store = new Vuex.Store({
    modules: {
      Auth: {
        namespaced: true,
        state: { token: 'test' },
      },
    },
  })

  const users = [
    {
      avatar_url: 'https://avatars2.githubusercontent.com/u/3705391?v=4',
      login: 're-fort',
      html_url: 'https://github.com/re-fort',
    },
    {
      avatar_url: 'https://avatars2.githubusercontent.com/u/3705391?v=4',
      login: 're-fort2',
      html_url: 'https://github.com/re-fort2',
    },
  ]

  //delete mounted hook, because it contains methods to need a stub
  delete MyPage.mounted

  describe('fetchFollowers()', function () {
    it('renders followers when succeed', function () {
      const wrapper = mount(MyPage, { localVue, store, mocks: { $router } })
      let stub = sinon.stub(Xhr, 'getWithToken').callsFake(() => { wrapper.vm.success({ data: users }) })
      wrapper.findAll('.button').at(0).trigger('click')
      stub.restore()
      assert(wrapper.findAll('.media').length === 2)
      const image = wrapper.find('img')
      const link = wrapper.find('.content a')
      assert(image.element.getAttribute('src') === users[0].avatar_url)
      assert(link.element.getAttribute('href') === users[0].html_url)
      assert(link.text() === users[0].login)
    })

    it('adds "is-active" class on clicked button', function () {
      const wrapper = mount(MyPage, { localVue, store, mocks: { $router } })
      let stub = sinon.stub(Xhr, 'getWithToken').callsFake(() => { wrapper.vm.success({ data: users }) })
      wrapper.findAll('.button').at(0).trigger('click')
      stub.restore()
      assert(wrapper.findAll('li').at(0).classes().includes('is-active'))
    })

    it('renders 1 follower when setting "perPage" to 1', function () {
      const wrapper = mount(MyPage, { localVue, store, data: { perPage: 1 }, mocks: { $router } })
      let stub = sinon.stub(Xhr, 'getWithToken').callsFake(() => { wrapper.vm.success({ data: users }) })
      wrapper.findAll('.button').at(0).trigger('click')
      stub.restore()
      assert(wrapper.findAll('.media').length === 1)
    })

    it('renders a meesage when failed', function () {
      const wrapper = mount(MyPage, { localVue, store, mocks: { $router } })
      let stub = sinon.stub(Xhr, 'getWithToken').callsFake(() => { wrapper.vm.error({ response: { status: 404, data: { errorMessage: '404 Not Found' }} })})
      assert(wrapper.findAll('b-message').length === 0)
      wrapper.findAll('.button').at(0).trigger('click')
      stub.restore()
      assert(wrapper.findAll('b-message').length === 1)
    })
  })

  describe('fetchFollowing()', function () {
    it('renders followings when succeed', function () {
      const wrapper = mount(MyPage, { localVue, store, mocks: { $router } })
      let stub = sinon.stub(Xhr, 'getWithToken').callsFake(() => { wrapper.vm.success({ data: users }) })
      wrapper.findAll('.button').at(1).trigger('click')
      stub.restore()
      assert(wrapper.findAll('.media').length === 2)
      const image = wrapper.find('img')
      const link = wrapper.find('.content a')
      assert(image.element.getAttribute('src') === users[0].avatar_url)
      assert(link.element.getAttribute('href') === users[0].html_url)
      assert(link.text() === users[0].login)
    })

    it('adds "is-active" class on clicked button', function () {
      const wrapper = mount(MyPage, { localVue, store, mocks: { $router } })
      let stub = sinon.stub(Xhr, 'getWithToken').callsFake(() => { wrapper.vm.success({ data: users }) })
      wrapper.findAll('.button').at(1).trigger('click')
      stub.restore()
      assert(wrapper.findAll('li').at(1).classes().includes('is-active'))
    })

    it('renders 1 following when setting "perPage" to 1', function () {
      const wrapper = mount(MyPage, { localVue, store, data: { perPage: 1 }, mocks: { $router } })
      let stub = sinon.stub(Xhr, 'getWithToken').callsFake(() => { wrapper.vm.success({ data: users }) })
      wrapper.findAll('.button').at(1).trigger('click')
      stub.restore()
      assert(wrapper.findAll('.media').length === 1)
    })

    it('renders a meesage when failed', function () {
      const wrapper = mount(MyPage, { localVue, store, mocks: { $router } })
      let stub = sinon.stub(Xhr, 'getWithToken').callsFake(() => { wrapper.vm.error({ response: { status: 404, data: { errorMessage: '404 Not Found' }} })})
      assert(wrapper.findAll('b-message').length === 0)
      wrapper.findAll('.button').at(1).trigger('click')
      stub.restore()
      assert(wrapper.findAll('b-message').length === 1)
    })
  })
})
