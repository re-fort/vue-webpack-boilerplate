<template lang="pug">
  .columns(v-show="pageCount")
    .column.is-6.is-offset-3
      nav.pagination.is-centered
        a.button.pagination-previous(:class="isStartPage ? 'is-disabled' : ''" @click="showPrev") &#60;&#60; Prev
        a.button.pagination-next(:class="isEndPage ? 'is-disabled' : ''" @click="showNext") Next &#62;&#62;
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
    isStartPage: function(){
      return this.page === 1
    },
    isEndPage: function(){
      return this.page * this.dispItemSize >= this.items.length
    },
    pageCount: function() {
      return Math.ceil(this.items.length / this.dispItemSize)
    }
  },
  methods: {
    showPrev: function() {
      this.$emit('page', this.page - 1)
    },
    showNext: function() {
      this.$emit('page', this.page + 1)
    },
    showPage: function(index) {
      this.$emit('page', index)
    }
  }
}
</script>
