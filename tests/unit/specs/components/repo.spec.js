import { mount } from 'avoriaz'
import assert from 'assert'
import sinon from 'sinon'

import { Xhr } from 'lib/axios'
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
      const wrapper = mount(Repo, { globals: { $store } })
      let stub = sinon.stub(Xhr, 'getWithoutToken').callsFake(() => { wrapper.vm.success({ data: { items: repos } }) })
      wrapper.first('.button').trigger('click')
      stub.restore()
      assert(wrapper.find('.media').length === 2)
      const image = wrapper.first('img')
      const link = wrapper.first('.content a')
      const description = wrapper.first('.content p')
      assert(image.getAttribute('src') === repos[0].owner.avatar_url)
      assert(link.getAttribute('href') === repos[0].html_url)
      assert(link.text() === repos[0].full_name)
      assert(description.text() === repos[0].description)
    })

    it('renders 1 repo when setting "dispItemSize" to 1', function () {
      const wrapper = mount(Repo, { data: { dispItemSize: 1 }, globals: { $store } })
      let stub = sinon.stub(Xhr, 'getWithoutToken').callsFake(() => { wrapper.vm.success({ data: { items: repos } }) })
      wrapper.first('.button').trigger('click')
      stub.restore()
      assert(wrapper.find('.media').length === 1)
    })

    it('renders a meesage when failed', function () {
      const wrapper = mount(Repo, { globals: { $store } })
      let stub = sinon.stub(Xhr, 'getWithoutToken').callsFake(() => { wrapper.vm.error({ response: { status: 403 } }) })
      let message = wrapper.find('.message')
      assert(message.length === 0)
      wrapper.first('.button').trigger('click')
      stub.restore()
      message = wrapper.find('.message')
      assert(message.length === 1)
    })
  })
})
