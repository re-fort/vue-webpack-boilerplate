import { mount } from 'vue-test-utils'
import assert from 'assert'

import Pagination from 'src/components/partials/Pagination'

describe('Pagination', function () {

  it('renders "Prev" button with enabled when it is not first page', function () {
    const wrapper = mount(Pagination, { propsData: { page: 2, dispItemSize: 10, items: Array.from('p'.repeat(20)) } })
    assert(!wrapper.find('.pagination-previous').hasAttribute('disabled', 'disabled'))
  })

  it('renders "Prev" button with disabled when it is first page', function () {
    const wrapper = mount(Pagination, { propsData: { page: 1, dispItemSize: 10, items: Array.from('p'.repeat(20)) } })
    assert(wrapper.find('.pagination-previous').hasAttribute('disabled', 'disabled'))
  })

  it('renders "Next" button with enabled when it is not last page', function () {
    const wrapper = mount(Pagination, { propsData: { page: 1, dispItemSize: 10, items: Array.from('p'.repeat(20)) } })
    assert(!wrapper.find('.pagination-next').hasAttribute('disabled', 'disabled'))
  })

  it('renders "Next" button with disabled when it is last page', function () {
    const wrapper = mount(Pagination, { propsData: { page: 2, dispItemSize: 10, items: Array.from('p'.repeat(20)) } })
    assert(wrapper.find('.pagination-next').hasAttribute('disabled', 'disabled'))
  })

  it('renders page list', function () {
    const wrapper = mount(Pagination, { propsData: { page: 1, dispItemSize: 5, items: Array.from('p'.repeat(20)) } })
    assert(wrapper.findAll('li').length === 4)
  })

  it('adds "is-primary" class at current page', function () {
    const wrapper = mount(Pagination, { propsData: { page: 3, dispItemSize: 5, items: Array.from('p'.repeat(20)) } })
    assert(wrapper.findAll('li a').at(2).hasClass('is-primary'))
  })

  describe('isFirstPage()', function () {
    it('returns true/false whether it is first page', function () {
      const wrapper = mount(Pagination, { propsData: { page: 1, dispItemSize: 10, items: Array.from('p'.repeat(10)) } })
      assert(wrapper.vm.isFirstPage)
      wrapper.vm.page = 2
      assert(!wrapper.vm.isFirstPage)
    })
  })

  describe('isLastPage()', function () {
    it('returns true/false whether it is last page', function () {
      const wrapper = mount(Pagination, { propsData: { page: 1, dispItemSize: 10, items: Array.from('p'.repeat(10)) } })
      assert(wrapper.vm.isLastPage)
      wrapper.vm.items = Array.from('p'.repeat(20))
      assert(!wrapper.vm.isLastPage)
    })
  })

  describe('pageCount()', function () {
    it('returns count of page', function () {
      const wrapper = mount(Pagination, { propsData: { page: 1, dispItemSize: 10, items: Array.from('p'.repeat(10)) } })
      assert(wrapper.vm.pageCount === 1)
      wrapper.vm.items = Array.from('p'.repeat(20))
      assert(wrapper.vm.pageCount === 2)
      wrapper.vm.dispItemSize = 5
      assert(wrapper.vm.pageCount === 4)
    })
  })
})
