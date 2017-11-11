<template lang="pug">
  section.section
    .columns
      .column.is-4.is-offset-4
        .tabs.is-centered.is-toggle
          ul
            li(v-for="button in buttons", :class="{ 'is-active' : activeTab === button.name }")
              a.button(:class="{ 'is-loading is-primary': isLoading && activeTab === button.name }", @click="fetch(button)")
                span.icon.is-small
                  i.fa.fa-users
                span {{ button.name }}
    template(v-if="message")
      .columns
        .column.is-6.is-offset-3
          .message.is-danger
            .message-body {{ message }}
    .columns(v-for="user in dispItems")
      .column.is-6.is-offset-3
        .media
          figure.media-left
            p.image.is-32x32
              img(:src="user.avatar_url")
          .media-content
            .content
              a(:href="user.html_url" target="_blank") {{ user.login }}
    pagination(:page="page", :disp-item-size="dispItemSize", :items="items", @page="setPage")
</template>

<script>
import { URL } from 'api'
import mixinSearch from 'mixins/search'
import mixinPage from 'mixins/page'
import pagination from 'components/partials/Pagination'

export default {
  name: 'MyPage',
  components: {
    pagination
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
        }
      ],
      message: '',
      items: [],
      dispItemSize: 5,
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
