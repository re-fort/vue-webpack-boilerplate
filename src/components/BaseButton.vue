<template lang="pug">
  a(
  class="button",
  :class="classes",
  :disabled="disabled",
  @click="onClick",
  )
    slot
</template>

<script>
  export default {
    name: 'BaseButton',
    props: {
      classes: {
        type: Array,
        default: () => [],
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      value: {
        type: [String, Number, Boolean, Object, Array],
        default: '',
      },
    },
    methods: {
      onClick() {
        this.$emit('onClick', this.value)
      },
    },
  }
</script>

<style lang="sass" scoped>
  .selection
    width: 100%
</style>
