import { mount } from 'vue-test-utils'
import assert from 'assert'
import sinon from 'sinon'

import { Xhr } from 'api'
import Repo from 'src/components/Repo'

describe('Repo', function () {
  const $store = { state: { Auth: { token: '' } } }
  const repos = [
    {
      full_name: 're-fort/vue-webpack-boilerplate',
      description: 'A webpack boilerplate with vue-loader,axios, vue-router and vuex',
      owner: { avatar_url: 'https://avatars2.githubusercontent.com/u/3705391?v=4' },
      html_url: 'https://github.com/re-fort/vue-webpack-boilerplate',
    },
    {
      full_name: 're-fort/TV-kko',
      description: 'Search TV programs by the casts',
      owner: { avatar_url: 'https://avatars2.githubusercontent.com/u/3705391?v=4' },
      html_url: 'https://github.com/re-fort/TV-kko',
    },
  ]

  describe('searchRepo()', function () {
    it('renders repos when succeed', function () {
      const wrapper = mount(Repo, { mocks: { $store } })
      let stub = sinon.stub(Xhr, 'getWithoutToken').callsFake(() => { wrapper.vm.success({ data: { items: repos } }) })
      wrapper.find('.button').trigger('click')
      stub.restore()
      assert(wrapper.findAll('.media').length === 2)
      const image = wrapper.find('img')
      const link = wrapper.find('.content a')
      const description = wrapper.find('.content p')
      assert(image.element.getAttribute('src') === repos[0].owner.avatar_url)
      assert(link.element.getAttribute('href') === repos[0].html_url)
      assert(link.text() === repos[0].full_name)
      assert(description.text() === repos[0].description)
    })

    it('renders 1 repo when setting "dispItemSize" to 1', function () {
      const wrapper = mount(Repo, { data: { dispItemSize: 1 }, mocks: { $store } })
      let stub = sinon.stub(Xhr, 'getWithoutToken').callsFake(() => { wrapper.vm.success({ data: { items: repos } }) })
      wrapper.find('.button').trigger('click')
      stub.restore()
      assert(wrapper.findAll('.media').length === 1)
    })

    it('renders a meesage when failed', function () {
      const wrapper = mount(Repo, { mocks: { $store } })
      let stub = sinon.stub(Xhr, 'getWithoutToken').callsFake(() => { wrapper.vm.error({ response: { status: 403 } }) })
      let message = wrapper.findAll('.message')
      assert(message.length === 0)
      wrapper.find('.button').trigger('click')
      stub.restore()
      message = wrapper.findAll('.message')
      assert(message.length === 1)
    })
  })
})
