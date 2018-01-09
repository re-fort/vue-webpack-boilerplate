<template lang="pug">
  section.section
    .columns
      .column.is-4.is-offset-4
        b-field(position="is-centered")
          b-input(
          v-model="query",
          placeholder="Find a user...",
          expanded=true,
          type="search",
          icon="search",
          @keyup.native.enter="searchUser",
          )
          p.control
            base-button(
            :classes="['button', 'is-primary', { 'is-loading': isLoading }]",
            @onClick="searchUser",
            ) Search
    template(v-if="errorMessage")
      .columns
        .column.is-4.is-offset-4
          b-message(title="Error", type="is-danger", :closable="false") {{ errorMessage }}
    .columns(v-for="user in itemsInPage")
      .column.is-6.is-offset-3
        .media
          figure.media-left
            p.image.is-32x32
              img(:src="user.avatar_url")
          .media-content
            .content
              a(:href="user.html_url" target="_blank") {{ user.login }}
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
    name: 'SearchUserPage',
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
        perPage: 8,
        isLoading: false,
      }
    },
    methods: {
      searchUser() {
        if (this.isLoading) return
        this.search(URL.FETCH_USERS, this.searchOptions())
      },
      searchOptions() {
        return {
          params: {
            q: this.query
          }
        }
      },
    },
  }
</script>

<style lang="sass" scoped>
  .image
    img
      border-radius: 15px
</style>
