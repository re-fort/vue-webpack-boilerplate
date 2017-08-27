<template lang="pug">
  section.section
    .columns
      .column.is-3.is-offset-2(v-for="button in buttons")
        a.button.selection(:class="{ 'is-loading': isLoading && active === button.name }", @click="push(button)")
          span.icon
            i.fa(v-bind:class="button.icon")
          span {{ button.text }}
</template>

<script>
export default {
  name: 'Top',
  data() {
    return {
      buttons: [
        {
          name: 'user',
          text: 'Search Users',
          icon: 'fa-user',
          url: '/search/user',
        },
        {
          name: 'repo',
          text: 'Search Repos',
          icon: 'fa-book',
          url: '/search/repo',
        }
      ],
      active: '',
      isLoading: false,
    }
  },
  methods: {
    push(button) {
      this.active = button.name
      this.isLoading = true
      this.$router.push(button.url)
    },
  },
}
</script>
