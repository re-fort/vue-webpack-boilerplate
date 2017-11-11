// Mixin for search
import { Xhr } from 'api'

export default {
  methods: {
    requestStart() {
      this.message = ''
      this.items = []
      this.isLoading = true
    },
    async search(url, options = {}) {
      try {
        this.requestStart()
        const res = this.$store.state.Auth.token ?
          await Xhr.getWithToken(url, options, this.$store.state.Auth.token) : await Xhr.getWithoutToken(url, options)
        this.success(res)
      } catch(e) {
        this.error(e)
      } finally {
        this.requestEnd()
      }
    },
    success(response) {
      this.items = response.data.items
      this.page = 1
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
    },
    requestEnd() {
      this.isLoading = false
    },
  },
}
