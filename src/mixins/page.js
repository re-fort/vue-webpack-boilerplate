// Mixin for pagination
export default {
  data() {
    return {
      page: 1,
    }
  },
  computed: {
    itemsInPage() {
      const startPage = (this.page - 1) * this.perPage
      return this.items.slice(startPage, startPage + this.perPage)
    },
  },
  methods: {
    setPage(page) {
      this.page = page
    },
  },
}
