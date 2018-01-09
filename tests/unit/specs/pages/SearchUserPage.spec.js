import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import assert from 'assert'
import sinon from 'sinon'

import { Xhr } from 'api/index'
import SearchUserPage from 'src/pages/SearchUserPage'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SearchUserPage', function () {
  const store = new Vuex.Store({
    modules: {
      Auth: {
        namespaced: true,
        state: { token: '' },
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

  describe('searchUser()', function () {
    it('renders users when succeed', function () {
      const wrapper = mount(SearchUserPage, { localVue, store })
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

    it('renders 1 user when setting "perPage" to 1', function () {
      const wrapper = mount(SearchUserPage, { localVue, store , data: { perPage: 1 }})
      let stub = sinon.stub(Xhr, 'getWithoutToken').callsFake(() => { wrapper.vm.success({ data: { items: users } }) })
      wrapper.find('.button').trigger('click')
      stub.restore()
      assert(wrapper.findAll('.media').length === 1)
    })

    it('renders a meesage when failed', function () {
      const wrapper = mount(SearchUserPage, { localVue, store })
      let stub = sinon.stub(Xhr, 'getWithoutToken').callsFake(() => { wrapper.vm.error({ response: { status: 401 } }) })
      assert(wrapper.findAll('b-message').length === 0)
      wrapper.find('.button').trigger('click')
      stub.restore()
      assert(wrapper.findAll('b-message').length === 1)
    })
  })
})
