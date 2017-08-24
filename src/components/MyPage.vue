<template lang="pug">
  section.section
    .columns
      .column.is-4.is-offset-4
        .tabs.is-centered.is-toggle
          ul
            li(:class="{ 'is-active' : activeTab === 'followers' }")
              a(@click="fetchFollowers")
                span.icon.is-small
                  i.fa.fa-users
                span followers
            li(:class="{ 'is-active' : activeTab === 'following' }")
              a(@click="fetchFollowing")
                span.icon.is-small
                  i.fa.fa-users
                span following
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
      query: '',
      message: '',
      items: [],
      dispItemSize: 5,
      isLoading: false,
      activeTab: 'followers',
    }
  },
  mounted() {
    this.fetchFollowers()
  },
  methods: {
    fetchFollowers() {
      if (this.isLoading) return
      this.activeTab = 'followers'
      this.search('/user/followers')
    },
    fetchFollowing() {
      if (this.isLoading) return
      this.activeTab = 'following'
      this.search('/user/following')
    },
    success(response) {
      this.items = response.data
      this.page = 1
      this.searchEnd()
    },
  },
}
</script>
