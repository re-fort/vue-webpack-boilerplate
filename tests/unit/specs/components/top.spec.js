import { mount } from 'vue-test-utils'
import assert from 'assert'
import sinon from 'sinon'

import Top from 'src/components/Top'

describe('Top', function () {
  const $router = { push: () => { return sinon.stub() } }

  it('renders button(s)', function () {
    const wrapper = mount(Top)
    const buttons = wrapper.vm.buttons
    const wrapperArray = wrapper.findAll('.button')
    for (let [index, element] of wrapperArray.wrappers.entries()) {
      assert(element.text() === buttons[index].text)
    }
  })

  describe('push()', function () {
    it('adds "is-loading" class on clicked button', function () {
      const wrapper = mount(Top, { mocks: { $router } })
      assert(wrapper.findAll('.is-loading').length === 0)
      wrapper.findAll('.button').at(0).trigger('click')
      assert(wrapper.findAll('.is-loading').length === 1)
      assert(wrapper.findAll('.button').at(0).hasClass('is-loading'))
    })
  })
})
