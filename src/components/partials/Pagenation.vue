<template lang="jade">
  .columns(v-show="pageCount")
    .column.is-6.is-offset-3
      nav.pagination
        a.button(:class="isStartPage ? 'is-disabled' : ''" @click="showPrev") &#60;&#60; Prev
        a.button(:class="isEndPage ? 'is-disabled' : ''" @click="showNext") Next &#62;&#62;
        ul
          li(v-for="i in pageCount")
            a.button(:class="i == page ? 'is-primary' : ''" @click="showPage(i)") {{ i + 1 }}
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: true,
      twoWay: true
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
      return this.page == 0
    },
    isEndPage: function(){
      return (this.page + 1) * this.dispItemSize >= this.items.length
    },
    pageCount: function() {
      return Math.ceil(this.items.length / this.dispItemSize)
    }
  },
  methods: {
    showPrev: function() {
      this.page--
    },
    showNext: function() {
      this.page++
    },
    showPage: function(index) {
      this.page = index
    }
  }
}
</script>
