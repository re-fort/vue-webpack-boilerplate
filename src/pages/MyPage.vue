<template lang="pug">
  section.section
    .columns
      .column.is-4.is-offset-4
        .tabs.is-centered.is-toggle
          ul
            li(v-for="button in buttons", :class="{ 'is-active' : activeTab === button.name }")
              base-button(
              :classes="['selection', { 'is-loading is-primary': isLoading && activeTab === button.name }]",
              :value="button",
              @onClick="fetch",
              )
                span.icon.is-small
                  i.fa.fa-users
                span {{ button.name }}
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
    name: 'MyPage',
    components: {
      BaseButton,
      BasePagination,
    },
    mixins: [ mixinSearch, mixinPage ],
    data() {
      return {
        buttons: [
          {
            name: 'followers',
          },
          {
            name: 'following',
          },
        ],
        errorMessage: '',
        items: [],
        perPage: 5,
        isLoading: false,
        activeTab: 'followers',
      }
    },
    mounted() {
      if (!this.$route.query.tab) return this.fetchFollowers()
      this.$route.query.tab === 'followers' ? this.fetchFollowers() : this.fetchFollowing()
    },
    methods: {
      fetch(button) {
        if (this.isLoading) return
        button.name === 'followers' ? this.fetchFollowers() : this.fetchFollowing()
      },
      fetchFollowers() {
        this.activeTab = 'followers'
        this.search(URL.FETCH_FOLLOWERS)
        this.$router.push({ query: { tab: 'followers' } })
      },
      fetchFollowing() {
        this.activeTab = 'following'
        this.search(URL.FETCH_FOLLOWING)
        this.$router.push({ query: { tab: 'following' } })
      },
      success(response) {
        this.items = response.data
        this.page = 1
      },
    },
  }
</script>

<style lang="sass" scoped>
  .image
    img
      border-radius: 15px
</style>
