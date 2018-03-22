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

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop }from 'vue-property-decorator'

  @Component
  export default class BasePagination extends Vue {
    @Prop({ required: true })
    page: Number
    @Prop({ required: true })
    perPage: Number
    @Prop({ required: true })
    items: Array<any>

    showPage(index: number) {
      this.$emit('page', index)
    }
  }
</script>

<style lang="sass">
  .pagination
    padding-top: 30px
</style>
