// Mixin for search
import {Xhr} from 'base/axios'
export default {
  methods: {
    searchStart() {
      this.message = ''
      this.items = []
      this.isLoading = true
    },
    search(url, options = {}) {
      this.searchStart()
      Xhr.get(url, options, this.success, this.error)
    },
    success(response) {
      this.items = response.data.items
      this.page = 1
      this.searchEnd()
    },
    error(error) {
      switch(error.response.status) {
        case 403:
          this.message = 'API rate limit exceeded'
          break
        default:
          this.message = error.response.data.message
      }
      this.searchEnd()
    },
    searchEnd() {
      this.isLoading = false
    },
  },
}
