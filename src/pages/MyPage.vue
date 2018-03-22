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

<script lang="ts">
  import { mixins }from 'vue-class-component'
  import { Component }from 'vue-property-decorator'
  import { AxiosResponse } from 'axios'
  import { URL } from 'src/api'
  import { ITabButton } from 'src/interfaces/components'
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

  export default class MyPage extends mixins(mixinSearch, mixinPage) {
    buttons: Array<ITabButton> = [
      {
        name: 'followers',
      },
      {
        name: 'following',
      },
    ]
    errorMessage: string = ''
    items: Array<any> = []
    perPage: number = 5
    isLoading: boolean = false
    activeTab: string = 'followers'

    mounted() {
      if (!this.$route.query.tab) return this.fetchFollowers()
      this.$route.query.tab === 'followers' ? this.fetchFollowers() : this.fetchFollowing()
    }

    fetch(button: ITabButton) {
      if (this.isLoading) return
      button.name === 'followers' ? this.fetchFollowers() : this.fetchFollowing()
    }

    fetchFollowers() {
      this.activeTab = 'followers'
      this.search(URL.FETCH_FOLLOWERS)
      this.$router.push({ query: { tab: 'followers' } })
    }

    fetchFollowing() {
      this.activeTab = 'following'
      this.search(URL.FETCH_FOLLOWING)
      this.$router.push({ query: { tab: 'following' } })
    }

    success(response: AxiosResponse) {
      this.items = response.data
      this.page = 1
    }
  }
</script>

<style lang="sass" scoped>
  .image
    img
      border-radius: 15px
</style>
