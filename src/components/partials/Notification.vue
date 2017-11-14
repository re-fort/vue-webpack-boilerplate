<template>
  <transition
    mode="in-out"
    appear
    :appear-active-class="enterClass"
    :enter-active-class="enterClass"
    :leave-active-class="leaveClass"
    @after-leave="afterLeave"
  >
    <div :class="['notification', 'animated', type ? `is-${type}` : '']" v-if="show">
      <button class="delete" @click="close()" v-if="showCloseButton"></button>
      <div class="title is-5" v-if="title">{{ title }}</div>
      <div v-if="html" v-html="message"></div>
      <div v-else>{{ message }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  // this component is based on vue-bulma/notification
  props: {
    type: {
      type: String,
      default: 'info'
    },
    title: String,
    message: String,
    direction: {
      type: String,
      default: 'Right'
    },
    duration: {
      type: Number,
      default: 5000
    },
    container: {
      type: String,
      default: '.notifications'
    },
    html: {
      type: Boolean,
      default: false,
    },
    showCloseButton: {
      type: Boolean,
      default: true,
    }
  },
  data () {
    return {
      $_parent_: null,
      show: true
    }
  },
  created () {
    let $parent
    let parent = document.querySelector(this.container)
    if (!parent) {
      // Lazy creating `div.notifications` container.
      const className = this.container.replace('.', '')
      const Notifications = Vue.extend({
        name: 'Notifications',
        render (h) {
          return h('div', {
            'class': className,
          })
        }
      })
      $parent = new Notifications().$mount()
      document.body.appendChild($parent.$el)
    } else {
      $parent = parent.__vue__
    }
    // Hacked.
    this.$_parent_ = $parent
  },
  mounted() {
    if (this.$_parent_) {
      this.$_parent_.$el.appendChild(this.$el)
      this.$parent = this.$_parent_
      delete this.$_parent_
    }
    if (this.duration > 0) {
      this.timer = setTimeout(() => this.close(), this.duration)
    }
  },
  destroyed() {
    this.$el.remove()
  },
  computed: {
    enterClass() {
      return `fadeIn${this.direction}`
    },
    leaveClass() {
      return `fadeOut${this.direction}`
    },
  },
  methods: {
    close() {
      this.$emit('close')
      clearTimeout(this.timer)
      this.show = false
    },
    afterLeave() {
      this.$destroy()
    }
  }
}
</script>

<style lang="sass">
.notifications
  position: fixed
  top: 50px
  right: 10px
  z-index: 9999
  pointer-events: none

  .notification
    margin: 20px

.notification
  position: relative
  min-width: 240px
  backface-visibility: hidden
  transform: translate3d(0, 0, 0)
  pointer-events: all
</style>
