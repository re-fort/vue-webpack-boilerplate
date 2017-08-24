// Mixin for search
import { Xhr } from 'lib/axios'

export default {
  methods: {
    searchStart() {
      this.message = ''
      this.items = []
      this.isLoading = true
    },
    search(url, options = {}) {
      this.searchStart()
      if (this.$store.state.Auth.token) {
        Xhr.getWithToken(url, options, this.$store.state.Auth.token, this.success, this.error)
      } else {
        Xhr.getWithoutToken(url, options, this.success, this.error)
      }
    },
    success(response) {
      this.items = response.data.items
      this.page = 1
      this.searchEnd()
    },
    error(error) {
      switch(error.response.status) {
        case 401:
          this.message = 'Required (re)authentication'
          break
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
