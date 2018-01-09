import { mount, createLocalVue } from 'vue-test-utils'
import assert from 'assert'
import sinon from 'sinon'

import TopPage from 'src/pages/TopPage'

const localVue = createLocalVue()

describe('TopPage', function () {
  const $router = { push: () => sinon.stub() }

  it('renders button(s)', function () {
    const wrapper = mount(TopPage, { localVue })
    const buttons = wrapper.vm.buttons
    const wrapperArray = wrapper.findAll('.button')
    for (let [index, element] of wrapperArray.wrappers.entries()) {
      assert(element.text() === buttons[index].text)
    }
  })

  describe('push()', function () {
    it('adds "is-loading" class on clicked button', function () {
      const wrapper = mount(TopPage, { localVue, mocks: { $router } })
      assert(wrapper.findAll('.is-loading').length === 0)
      wrapper.findAll('.button').at(0).trigger('click')
      assert(wrapper.findAll('.is-loading').length === 1)
      assert(wrapper.findAll('.button').at(0).classes().includes('is-loading'))
    })
  })
})
