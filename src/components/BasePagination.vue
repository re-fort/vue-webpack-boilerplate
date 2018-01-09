<template lang="pug">
  b-pagination(
  v-if="items.length",
  :total="items.length",
  :current="page",
  order="is-centered",
  :per-page="perPage",
  @change="showPage",
  )
</template>

<script>
  export default {
    name: 'BasePagination',
    props: {
      page: {
        type: Number,
        required: true
      },
      perPage: {
        type: Number,
        required: true
      },
      items: {
        type: Array,
        required: true
      }
    },
    methods: {
      showPage(index) {
        this.$emit('page', index)
      },
    },
  }
</script>

<style lang="sass">
  .pagination
    padding-top: 30px
</style>
