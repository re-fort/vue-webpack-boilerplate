import { mount } from 'vue-test-utils'
import assert from 'assert'
import sinon from 'sinon'

import { Xhr } from 'lib/axios'
import MyPage from 'src/components/MyPage'

describe('MyPage', function () {
  const $store = { state: { Auth: { token: 'test' } } }
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
      const wrapper = mount(MyPage, { mocks: { $store } })
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
      const wrapper = mount(MyPage, { mocks: { $store } })
      let stub = sinon.stub(Xhr, 'getWithToken').callsFake(() => { wrapper.vm.success({ data: users }) })
      wrapper.findAll('.button').at(0).trigger('click')
      stub.restore()
      assert(wrapper.findAll('li').at(0).hasClass('is-active'))
    })

    it('renders 1 follower when setting "dispItemSize" to 1', function () {
      const wrapper = mount(MyPage, { data: { dispItemSize: 1 }, mocks: { $store } })
      let stub = sinon.stub(Xhr, 'getWithToken').callsFake(() => { wrapper.vm.success({ data: users }) })
      wrapper.findAll('.button').at(0).trigger('click')
      stub.restore()
      assert(wrapper.findAll('.media').length === 1)
    })

    it('renders a meesage when failed', function () {
      const wrapper = mount(MyPage, { mocks: { $store } })
      let stub = sinon.stub(Xhr, 'getWithToken').callsFake(() => { wrapper.vm.error({ response: { status: 404, data: { message: '404 Not Found' }} })})
      let message = wrapper.findAll('.message')
      assert(message.length === 0)
      wrapper.findAll('.button').at(0).trigger('click')
      stub.restore()
      message = wrapper.findAll('.message')
      assert(message.length === 1)
    })
  })

  describe('fetchFollowing()', function () {
    it('renders followings when succeed', function () {
      const wrapper = mount(MyPage, { mocks: { $store } })
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
      const wrapper = mount(MyPage, { mocks: { $store } })
      let stub = sinon.stub(Xhr, 'getWithToken').callsFake(() => { wrapper.vm.success({ data: users }) })
      wrapper.findAll('.button').at(1).trigger('click')
      stub.restore()
      assert(wrapper.findAll('li').at(1).hasClass('is-active'))
    })

    it('renders 1 following when setting "dispItemSize" to 1', function () {
      const wrapper = mount(MyPage, { data: { dispItemSize: 1 }, mocks: { $store } })
      let stub = sinon.stub(Xhr, 'getWithToken').callsFake(() => { wrapper.vm.success({ data: users }) })
      wrapper.findAll('.button').at(1).trigger('click')
      stub.restore()
      assert(wrapper.findAll('.media').length === 1)
    })

    it('renders a meesage when failed', function () {
      const wrapper = mount(MyPage, { mocks: { $store } })
      let stub = sinon.stub(Xhr, 'getWithToken').callsFake(() => { wrapper.vm.error({ response: { status: 404, data: { message: '404 Not Found' }} })})
      let message = wrapper.findAll('.message')
      assert(message.length === 0)
      wrapper.findAll('.button').at(1).trigger('click')
      stub.restore()
      message = wrapper.findAll('.message')
      assert(message.length === 1)
    })
  })
})
