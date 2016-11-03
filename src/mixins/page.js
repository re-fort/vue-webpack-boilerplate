// Mixin for pagination
export default {
  data () {
    return {
      page: 1
    }
  },
  computed: {
    dispItems: function() {
      let startPage = (this.page - 1) * this.dispItemSize
      return this.items.slice(startPage, startPage + this.dispItemSize)
    }
  },
  methods: {
    setPage: function(page) {
      this.page = page
    }
  }
}