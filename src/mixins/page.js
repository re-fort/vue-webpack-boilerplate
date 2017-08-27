// Mixin for pagination
export default {
  data() {
    return {
      page: 1,
    }
  },
  computed: {
    dispItems() {
      let startPage = (this.page - 1) * this.dispItemSize
      return this.items.slice(startPage, startPage + this.dispItemSize)
    },
  },
  methods: {
    setPage(page) {
      this.page = page
    },
  },
}
