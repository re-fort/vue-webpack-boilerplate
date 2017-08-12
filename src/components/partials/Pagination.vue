<template lang="pug">
  .columns(v-show="pageCount")
    .column.is-6.is-offset-3
      nav.pagination.is-centered
        a.button.pagination-previous(:disabled="isStartPage ? true : false" @click="showPrev") &#60;&#60; Prev
        a.button.pagination-next(:disabled="isEndPage ? true : false", @click="showNext") Next &#62;&#62;
        ul.pagination-list
          li(v-for="i in pageCount")
            a.button.pagination-link(:class="i === page ? 'is-primary' : ''" @click="showPage(i)") {{ i }}
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Number,
      required: true
    },
    dispItemSize: {
      type: Number,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    isStartPage() {
      return this.page === 1
    },
    isEndPage() {
      return this.page * this.dispItemSize >= this.items.length
    },
    pageCount() {
      return Math.ceil(this.items.length / this.dispItemSize)
    },
  },
  methods: {
    showPrev() {
      if (this.isStartPage) return
      this.$emit('page', this.page - 1)
    },
    showNext() {
      if (this.isEndPage) return
      this.$emit('page', this.page + 1)
    },
    showPage(index) {
      this.$emit('page', index)
    },
  },
}
</script>
