import { mount } from 'avoriaz'
import assert from 'assert'
import sinon from 'sinon'

import Search from 'src/components/Search'

describe('Search', function () {
  const $router = { push: () => { return sinon.stub() } }

  it('renders button(s)', function () {
    const wrapper = mount(Search)
    const buttons = wrapper.data().buttons
    const elements = wrapper.find('.button')
    for (let [index, element] of elements.entries()) {
      assert(element.text() === buttons[index].text)
    }
  })

  describe('push()', function () {
    it('adds "is-loading" class on clicked button', function () {
      const wrapper = mount(Search, { globals: { $router } })
      assert(wrapper.find('.is-loading').length === 0)
      wrapper.find('.button')[0].trigger('click')
      assert(wrapper.find('.is-loading').length === 1)
      assert(wrapper.find('.button')[0].hasClass('is-loading'))
    })
  })
})
