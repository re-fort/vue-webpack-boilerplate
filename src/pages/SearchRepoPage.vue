<template lang="pug">
  section.section
    .columns
      .column.is-4.is-offset-4
        b-field(position="is-centered")
          b-input(
          v-model="query",
          placeholder="Find a repo...",
          expanded=true,
          type="search",
          icon="search",
          @keyup.native.enter="searchRepo",
          )
          p.control
            base-button(
            :classes="['button', 'is-primary', { 'is-loading': isLoading }]",
            @onClick="searchRepo",
            ) Search
    template(v-if="errorMessage")
      .columns
        .column.is-4.is-offset-4
          b-message(title="Error", type="is-danger", :closable="false") {{ errorMessage }}
    .columns(v-for="repo in itemsInPage")
      .column.is-6.is-offset-3
        .media
          figure.media-left
            p.image.is-32x32
              img(:src="repo.owner.avatar_url")
          .media-content
            .content
              a(:href="repo.html_url" target="_blank") {{ repo.full_name }}
              p.description {{ repo.description }}
              span.tag(v-if="repo.language")  {{ repo.language }}
    .columns
      .column.is-6.is-offset-3
        base-pagination(:page="page", :perPage="perPage", :items="items", @page="setPage")
</template>

<script lang="ts">
  import { mixins }from 'vue-class-component'
  import { Component }from 'vue-property-decorator'
  import { URL } from 'src/api'
  import BaseButton from 'src/components/BaseButton'
  import BasePagination from 'src/components/BasePagination'
  import mixinSearch from 'src/mixins/search'
  import mixinPage from 'src/mixins/page'

  @Component({
    components: {
      BaseButton,
      BasePagination,
    },
  })

  export default class SearchRepoPage extends mixins(mixinSearch, mixinPage) {
    query: string = ''
    errorMessage: string = ''
    items: Array<any> = []
    perPage: number = 5
    isLoading: boolean = false

    searchRepo() {
      if (this.isLoading) return
      this.search(URL.FETCH_REPOSITORIES, this.searchOptions())
    }
    searchOptions() {
      return {
        params: {
          q: `${this.query} in:name`,
        },
      }
    }
  }
</script>

<style lang="sass">
  .description
    font-size: 16px

  .image
    img
      border-radius: 15px
</style>
