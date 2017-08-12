<template lang="pug">
  section.section
    .columns
      .column.is-3.is-offset-2(v-for="button in buttons")
        router-link.button.selection(:to="button.url")
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
          text: 'Search Users',
          icon: 'fa-user',
          url: '/search/user',
        },
        {
          text: 'Search Repos',
          icon: 'fa-book',
          url: '/search/repo',
        }
      ]
    }
  },
}
</script>
