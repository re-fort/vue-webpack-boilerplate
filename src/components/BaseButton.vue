<template lang="pug">
  a(
  class="button",
  :class="classes",
  :disabled="disabled",
  @click="onClick",
  )
    slot
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop }from 'vue-property-decorator'

  @Component
  export default class BaseButton extends Vue {
    @Prop({ default: () => [] })
    classes: Array<string>
    @Prop({ default: false })
    disabled: Boolean
    @Prop({ default: '' })
    value: [String, Number, Boolean, Object, Array<any>]

    onClick() {
      this.$emit('onClick', this.value)
    }
  }
</script>

<style lang="sass" scoped>
  .selection
    width: 100%
</style>
