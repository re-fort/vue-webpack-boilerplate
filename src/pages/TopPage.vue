<template lang="pug">
  section.section
    .columns
      .column.is-3.is-offset-2(v-for="button in buttons")
        base-button(
        :classes="['selection', { 'is-loading': isLoading && active === button.icon }]",
        :value="button",
        @onClick="push",
        )
          b-icon(:icon="button.icon", size="is-small")
          span {{ button.text }}
</template>

<script>
  import BaseButton from 'components/BaseButton'

  export default {
    name: 'TopPage',
    components: {
      BaseButton,
    },
    data() {
      return {
        buttons: [
          {
            text: 'Search',
            icon: 'search',
            url: '/search',
          },
          {
            text: 'My Page',
            icon: 'user',
            url: '/user',
          }
        ],
        active: '',
        isLoading: false,
      }
    },
    methods: {
      push(button) {
        this.active = button.icon
        this.isLoading = true
        this.$router.push(button.url)
      },
    },
  }
</script>
