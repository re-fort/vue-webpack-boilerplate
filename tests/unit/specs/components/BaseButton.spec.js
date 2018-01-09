import { mount } from 'vue-test-utils'
import assert from 'assert'

import BaseButton from 'src/components/BaseButton'

describe('BaseButton', function () {

  it('emits "onClick" event when clicking', function () {
    const wrapper = mount(BaseButton, { propsData: { value: 'test' } })
    wrapper.find('.button').trigger('click')
    assert(wrapper.emitted().onClick.length === 1)
    assert(wrapper.emitted().onClick[0][0] === 'test')
  })
})
