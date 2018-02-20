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

<script>
  import { URL } from 'api/index'
  import BaseButton from 'components/BaseButton'
  import BasePagination from 'components/BasePagination'
  import mixinSearch from 'mixins/search'
  import mixinPage from 'mixins/page'

  export default {
    name: 'SearchRepoPage',
    components: {
      BaseButton,
      BasePagination,
    },
    mixins: [ mixinSearch, mixinPage ],
    data() {
      return {
        query: '',
        errorMessage: '',
        items: [],
        perPage: 5,
        isLoading: false,
      }
    },
    methods: {
      searchRepo() {
        if (this.isLoading) return
        this.search(URL.FETCH_REPOSITORIES, this.searchOptions())
      },
      searchOptions() {
        return {
          params: {
            q: `${this.query} in:name`,
          },
        }
      },
    },
  }
</script>

<style lang="sass">
  .description
    font-size: 16px

  .image
    img
      border-radius: 15px
</style>
