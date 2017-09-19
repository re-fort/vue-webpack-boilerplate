import { mount } from 'avoriaz'
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
      const wrapper = mount(User, { globals: { $store } })
      let stub = sinon.stub(Xhr, 'getWithoutToken').callsFake(() => { wrapper.vm.success({ data: { items: users } }) })
      wrapper.first('.button').trigger('click')
      stub.restore()
      assert(wrapper.find('.media').length === 2)
      const image = wrapper.first('img')
      const link = wrapper.first('.content a')
      assert(image.getAttribute('src') === users[0].avatar_url)
      assert(link.getAttribute('href') === users[0].html_url)
      assert(link.text() === users[0].login)
    })

    it('renders 1 user when setting "dispItemSize" to 1', function () {
      const wrapper = mount(User, { data: { dispItemSize: 1 }, globals: { $store } })
      let stub = sinon.stub(Xhr, 'getWithoutToken').callsFake(() => { wrapper.vm.success({ data: { items: users } }) })
      wrapper.first('.button').trigger('click')
      stub.restore()
      assert(wrapper.find('.media').length === 1)
    })

    it('renders a meesage when failed', function () {
      const wrapper = mount(User, { globals: { $store } })
      let stub = sinon.stub(Xhr, 'getWithoutToken').callsFake(() => { wrapper.vm.error({ response: { status: 401 } }) })
      let message = wrapper.find('.message')
      assert(message.length === 0)
      wrapper.first('.button').trigger('click')
      stub.restore()
      message = wrapper.find('.message')
      assert(message.length === 1)
    })
  })
})
