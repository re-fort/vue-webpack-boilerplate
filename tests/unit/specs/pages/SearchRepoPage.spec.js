import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import assert from 'assert'
import sinon from 'sinon'

import { Xhr } from 'api/index'
import SearchRepoPage from 'src/pages/SearchRepoPage'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SearchRepoPage', function () {
  const store = new Vuex.Store({
    modules: {
      Auth: {
        namespaced: true,
        state: { token: '' },
      },
    },
  })

  const repos = [
    {
      full_name: 're-fort/vue-webpack-boilerplate',
      description: 'A webpack boilerplate with vue-loader,axios, vue-router and vuex',
      owner: { avatar_url: 'https://avatars2.githubusercontent.com/u/3705391?v=4' },
      html_url: 'https://github.com/re-fort/vue-webpack-boilerplate',
    },
    {
      full_name: 're-fort/TV-kko',
      description: 'SearchPage TV programs by the casts',
      owner: { avatar_url: 'https://avatars2.githubusercontent.com/u/3705391?v=4' },
      html_url: 'https://github.com/re-fort/TV-kko',
    },
  ]

  describe('searchRepo()', function () {
    it('renders repos when succeed', function () {
      const wrapper = mount(SearchRepoPage, { localVue, store })
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

    it('renders 1 repo when setting "perPage" to 1', function () {
      const wrapper = mount(SearchRepoPage, { localVue, store, data: { perPage: 1 }})
      let stub = sinon.stub(Xhr, 'getWithoutToken').callsFake(() => { wrapper.vm.success({ data: { items: repos } }) })
      wrapper.find('.button').trigger('click')
      stub.restore()
      assert(wrapper.findAll('.media').length === 1)
    })

    it('renders a meesage when failed', function () {
      const wrapper = mount(SearchRepoPage, { localVue, store })
      let stub = sinon.stub(Xhr, 'getWithoutToken').callsFake(() => { wrapper.vm.error({ response: { status: 403 } }) })
      assert(wrapper.findAll('b-message').length === 0)
      wrapper.find('.button').trigger('click')
      stub.restore()
      assert(wrapper.findAll('b-message').length === 1)
    })
  })
})
