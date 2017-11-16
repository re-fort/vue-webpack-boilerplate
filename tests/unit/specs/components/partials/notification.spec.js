import { mount } from 'vue-test-utils'
import assert from 'assert'

import Notification from 'src/components/partials/Notification'

describe('Notification', function () {

  it('renders notification', function () {
    const wrapper = mount(Notification, { propsData: { title: 'title', message: 'message' } })
    assert(wrapper.hasClass('notification'))
  })

  it('closes notification after duration time', function (done) {
    let ms = 1
    const wrapper = mount(Notification, { propsData: { title: 'title', message: 'message', duration: ms } })
    setTimeout(() => {
      assert(wrapper.emitted().close)
      done()
    }, ms)
  })

  it('closes notification when clicking delete button', function () {
    const wrapper = mount(Notification, { propsData: { title: 'title', message: 'message', duration: 0 } })
    wrapper.find('button').trigger('click')
    assert(wrapper.emitted().close)
  })
})
