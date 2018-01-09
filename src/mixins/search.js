// Mixin for search
import { mapState } from 'vuex'
import { Xhr } from 'api'

export default {
  computed: {
    ...mapState('Auth', ['token']),
  },
  methods: {
    requestStart() {
      this.errorMessage = ''
      this.items = []
      this.isLoading = true
    },
    async search(url, options = {}) {
      try {
        this.requestStart()
        const res = this.token ?
          await Xhr.getWithToken(url, options, this.token) : await Xhr.getWithoutToken(url, options)
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
          this.errorMessage = 'Required (re)authentication'
          break
        case 403:
          this.errorMessage = 'API rate limit exceeded'
          break
        default:
          this.errorMessage = error.response.data.errorMessage
      }
    },
    requestEnd() {
      this.isLoading = false
    },
  },
}
