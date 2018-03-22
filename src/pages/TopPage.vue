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

<script lang="ts">
  import Vue from 'vue'
  import { Component }from 'vue-property-decorator'
  import { ILinkButton } from 'src/interfaces/components'
  import BaseButton from 'src/components/BaseButton'

  @Component({
    components: {
      BaseButton,
    },
  })

  export default class TopPage extends Vue {
    buttons: Array<ILinkButton> = [
      {
        text: 'Search',
        icon: 'search',
        url: '/search',
      },
      {
        text: 'My Page',
        icon: 'user',
        url: '/user',
      },
    ]
    active: string = ''
    isLoading: boolean = false

    push(button: ILinkButton) {
      this.active = button.icon
      this.isLoading = true
      this.$router.push(button.url)
    }
  }
</script>
