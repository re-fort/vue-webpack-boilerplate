<template lang="pug">
  section.section
    .columns
      .column.is-4.is-offset-4.field.has-addons
        p.control.is-expanded
          input.input(v-model="query" type="text" placeholder="Find a user" @keyup.enter="searchUser")
        p.control
          a.button.is-primary(:class="isLoading ? 'is-loading' : ''" @click="searchUser") Search
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
  name: 'User',
  components: {
    pagination
  },
  mixins: [mixinSearch, mixinPage],
  data () {
    return {
      query: '',
      message: '',
      items: [],
      dispItemSize: 8,
      isLoading: false
    }
  },
  methods: {
    searchUser: function() {
      if (this.isLoading) return
      this.search('users', this.searchOptions())
    },
    searchOptions: function() {
      return {
        params: {
          q: this.query
        }
      }
    }
  }
}
</script>
