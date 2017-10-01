import { mount } from 'vue-test-utils'
import assert from 'assert'
import sinon from 'sinon'

import { Xhr } from 'lib/axios'
import User from 'src/components/User'

describe('User', function () {
  const $store = { state: { Auth: { token: '' } } }
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

  describe('searchUser()', function () {
    it('renders users when succeed', function () {
      const wrapper = mount(User, { mocks: { $store } })
      let stub = sinon.stub(Xhr, 'getWithoutToken').callsFake(() => { wrapper.vm.success({ data: { items: users } }) })
      wrapper.find('.button').trigger('click')
      stub.restore()
      assert(wrapper.findAll('.media').length === 2)
      const image = wrapper.find('img')
      const link = wrapper.find('.content a')
      assert(image.element.getAttribute('src') === users[0].avatar_url)
      assert(link.element.getAttribute('href') === users[0].html_url)
      assert(link.text() === users[0].login)
    })

    it('renders 1 user when setting "dispItemSize" to 1', function () {
      const wrapper = mount(User, { data: { dispItemSize: 1 }, mocks: { $store } })
      let stub = sinon.stub(Xhr, 'getWithoutToken').callsFake(() => { wrapper.vm.success({ data: { items: users } }) })
      wrapper.find('.button').trigger('click')
      stub.restore()
      assert(wrapper.findAll('.media').length === 1)
    })

    it('renders a meesage when failed', function () {
      const wrapper = mount(User, { mocks: { $store } })
      let stub = sinon.stub(Xhr, 'getWithoutToken').callsFake(() => { wrapper.vm.error({ response: { status: 401 } }) })
      let message = wrapper.findAll('.message')
      assert(message.length === 0)
      wrapper.find('.button').trigger('click')
      stub.restore()
      message = wrapper.findAll('.message')
      assert(message.length === 1)
    })
  })
})
