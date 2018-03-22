// Mixin for pagination
import Vue from 'vue'
import { Component }from 'vue-property-decorator'

@Component
export default class PaginationMixin extends Vue {
  page: number = 1
  perPage: number = 1
  items: Array<any> = []

  get itemsInPage() {
    const startPage = (this.page - 1) * this.perPage
    return this.items.slice(startPage, startPage + this.perPage)
  }
  setPage(page: number) {
    this.page = page
  }
}
