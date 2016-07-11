// Mixin for pagination
import Settings from 'settings'
export default {
  computed: {
    dipsItems: function() {
      let startPage = this.page * this.dispItemSize
      return this.items.slice(startPage, startPage + this.dispItemSize)
    }
  },
  methods: {
    searchStart: function() {
      this.message = ''
      this.items = []
      this.isLoading = true
    },
    search: function(url) {
      this.searchStart()
      this.$http.get(Settings.Api.root + url).then(this.success, this.error)
    },
    success: function(response) {
      this.items = response.data.items
      this.page = 0
      this.searchEnd()
    },
    error: function(response) {
      switch(response.status) {
        case 403:
          this.message = 'API rate limit exceeded'
          break
        default:
          this.message = response.statusText
      }
      this.searchEnd()
    },
    searchEnd: function() {
      this.isLoading = false
    }
  }
}